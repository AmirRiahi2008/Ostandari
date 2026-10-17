<?php

namespace App\Http\Controllers\Api;

use App\Models\Organization;
use App\Models\Ticket;
use App\Models\TicketEvent;
use App\Models\TicketMessage;
use App\Models\User;
use App\Services\Access;
use App\Services\Audit;
use App\Services\FileAccess;
use App\Services\Notice;
use App\Services\PortalCalendar;
use App\Support\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class TicketController
{
    private const TRANSITIONS = ['pending' => ['review', 'referred', 'rejected', 'closed'], 'review' => ['referred', 'resolved', 'rejected', 'closed'],
        'referred' => ['review', 'resolved', 'rejected', 'closed'], 'resolved' => ['closed', 'review'], 'rejected' => ['review', 'closed'], 'closed' => ['review']];

    private function query(Request $r, bool $admin = false)
    {
        $q = Ticket::query();

        return $admin ? Access::scope($q, $r->user()) : $q->where('user_id', $r->user()->id);
    }

    private function record(Request $r, string $reference, bool $admin = false): Ticket
    {
        return $this->query($r, $admin)->where('reference', $reference)->firstOrFail();
    }

    public function index(Request $r)
    {
        return $this->listing($r);
    }

    public function adminIndex(Request $r)
    {
        return $this->listing($r, true);
    }

    private function listing(Request $r, bool $admin = false)
    {
        $r->validate(['per_page' => 'sometimes|integer|min:1|max:100', 'status' => ['sometimes', Rule::in(array_keys(self::TRANSITIONS))], 'type' => 'sometimes|in:report,governor,contact', 'q' => 'sometimes|string|max:100']);
        $q = $this->query($r, $admin)->with('organization');
        foreach (['status', 'type'] as $f) {
            if ($r->filled($f)) {
                $q->where($f, $r->input($f));
            }
        }
        if ($r->filled('q')) {
            $q->where(fn ($q) => $q->where('reference', 'like', '%'.$r->input('q').'%')->orWhere('subject', 'like', '%'.$r->input('q').'%'));
        }

        return Api::page($q->latest('id')->paginate((int) $r->input('per_page', 20)));
    }

    public function show(Request $r, string $reference)
    {
        return $this->detail($r, $reference);
    }

    public function adminShow(Request $r, string $reference)
    {
        return $this->detail($r, $reference, true);
    }

    private function detail(Request $r, string $reference, bool $admin = false)
    {
        $ticket = $this->record($r, $reference, $admin);
        $ticket->load(['media', 'organization', 'messages' => fn ($q) => $q->when(! $admin, fn ($q) => $q->where('is_internal', false))->with(['media', 'author'])->orderBy('id'),
            'events' => fn ($q) => $q->orderBy('id')]);
        if (! $admin) {
            $ticket->events->each(fn ($event) => $event->makeHidden(['user_id', 'note']));
        }

        return Api::ok($ticket);
    }

    public function store(Request $r)
    {
        $d = $r->validate(['type' => 'required|in:report,governor', 'category' => ['nullable', Rule::in(config('portal.report_categories'))],
            'subject' => 'required|string|max:255', 'body' => 'required|string|min:10|max:20000', 'county_id' => ['nullable', Rule::exists('counties', 'id')->where('is_active', true)->whereNull('deleted_at')],
            'address' => 'nullable|string|max:2000', 'urgency' => 'sometimes|in:low,medium,high,urgent', 'media_ids' => 'sometimes|array|max:5', 'media_ids.*' => 'integer|distinct']);
        if ($d['type'] === 'report') {
            $r->validate(['category' => 'required', 'county_id' => 'required']);
        }
        $org = $d['type'] === 'report' && ! empty($d['county_id']) ? Organization::active()->where('county_id', $d['county_id'])->where('type', 'county')->first() : Organization::active()->where('type', 'governorate')->first();
        $ticket = DB::transaction(function () use ($r, $d, $org) {
            $ticket = Ticket::create(Arr::except($d, ['media_ids']) + ['reference' => (string) Str::ulid(), 'user_id' => $r->user()->id, 'organization_id' => $org?->id,
                'due_at' => PortalCalendar::deadline((int) config($d['type'] === 'report' ? 'portal.sla.report_days' : 'portal.sla.message_days'))]);
            FileAccess::attach($ticket, $d['media_ids'] ?? [], $r->user());
            TicketEvent::create(['ticket_id' => $ticket->id, 'user_id' => $r->user()->id, 'to_status' => 'pending']);
            Notice::send($r->user()->id, 'درخواست شما ثبت شد.', ['reference' => $ticket->reference]);

            return $ticket;
        });

        return Api::ok($ticket->refresh(), 'درخواست ثبت شد.', 201);
    }

    public function contact(Request $r)
    {
        $d = $r->validate(['name' => 'required|string|max:120', 'email' => 'required|email|max:255', 'phone' => 'nullable|string|max:40', 'subject' => 'required|string|max:255', 'body' => 'required|string|min:10|max:10000', 'website' => 'prohibited', 'county_slug' => 'sometimes|string|max:100']);
        $county = null;
        if (! empty($d['county_slug'])) {
            $county = \App\Models\County::active()->whereIn('slug', \App\Support\CountySlugs::variants($d['county_slug']))->first();
            abort_unless($county, 422, 'شهرستان انتخاب‌شده معتبر نیست.');
        }
        unset($d['county_slug']);
        $organization = $county
            ? Organization::active()->where('type', 'county')->where('county_id', $county->id)->first()
            : Organization::active()->where('type', 'governorate')->first();
        abort_unless($organization, 422, 'واحد دریافت‌کنندهٔ پیام هنوز فعال نشده است.');
        $ticket = Ticket::create($d + ['type' => 'contact', 'reference' => (string) Str::ulid(), 'organization_id' => $organization->id, 'county_id' => $county?->id, 'due_at' => PortalCalendar::deadline((int) config('portal.sla.message_days'))]);

        return Api::ok(['reference' => $ticket->reference], 'پیام ثبت شد.', 201);
    }

    public function reply(Request $r, string $reference)
    {
        return $this->message($r, $reference);
    }

    public function adminReply(Request $r, string $reference)
    {
        return $this->message($r, $reference, true);
    }

    private function message(Request $r, string $reference, bool $admin = false)
    {
        $ticket = $this->record($r, $reference, $admin);
        abort_if($ticket->status === 'closed', 409, 'درخواست بسته شده است.');
        $d = $r->validate(['body' => 'required|string|max:20000', 'is_internal' => 'sometimes|boolean', 'media_ids' => 'sometimes|array|max:5', 'media_ids.*' => 'integer|distinct']);
        $message = DB::transaction(function () use ($d, $r, $admin, $ticket) {
            $message = TicketMessage::create(['ticket_id' => $ticket->id, 'user_id' => $r->user()->id, 'body' => $d['body'], 'is_internal' => $admin && ($d['is_internal'] ?? false)]);
            FileAccess::attach($message, $d['media_ids'] ?? [], $r->user());
            $ticket->touch();
            if ($admin && ! $message->is_internal) {
                Notice::send($ticket->user_id, 'به درخواست شما پاسخ داده شد.', ['reference' => $ticket->reference]);
            }

            return $message;
        });
        Audit::record('ticket.replied', $ticket);

        return Api::ok($message->load('media', 'author'), 'پیام ثبت شد.', 201);
    }

    public function update(Request $r, string $reference)
    {
        $ticket = $this->record($r, $reference, true);
        $d = $r->validate(['status' => ['sometimes', Rule::in(array_keys(self::TRANSITIONS))], 'organization_id' => ['sometimes', 'required', Rule::exists('organizations', 'id')->where('is_active', true)->whereNull('deleted_at')],
            'assigned_to' => ['sometimes', 'nullable', Rule::exists('users', 'id')->where('is_active', true)], 'note' => 'nullable|string|max:4000', 'urgency' => 'sometimes|in:low,medium,high,urgent']);
        if (isset($d['organization_id'])) {
            Access::organization($r->user(), $d['organization_id']);
        }
        if (! empty($d['assigned_to'])) {
            $assignee = User::findOrFail($d['assigned_to']);
            abort_unless($assignee->isStaff() && $assignee->hasPermission('tickets.manage') && ($assignee->access_scope === 'all' || in_array((int) ($d['organization_id'] ?? $ticket->organization_id), Access::organizations($assignee), true)), 422, 'کاربر انتخاب‌شده دسترسی رسیدگی به این درخواست را ندارد.');
        }
        if (isset($d['organization_id']) && $d['organization_id'] != $ticket->organization_id && ! array_key_exists('assigned_to', $d)) {
            $d['assigned_to'] = null;
        }
        DB::transaction(function () use ($r, $ticket, $d) {
            $locked = Ticket::lockForUpdate()->findOrFail($ticket->id);
            $old = $locked->status;
            if (isset($d['status']) && $d['status'] !== $old) {
                abort_unless(in_array($d['status'], self::TRANSITIONS[$old] ?? [], true), 422, 'تغییر وضعیت در این مرحله مجاز نیست.');
            }
            $locked->fill(Arr::except($d, ['note']));
            if (isset($d['status'])) {
                $locked->resolved_at = in_array($d['status'], ['resolved', 'closed'], true) ? now() : null;
            }
            $locked->save();
            TicketEvent::create(['ticket_id' => $locked->id, 'user_id' => $r->user()->id, 'from_status' => $old, 'to_status' => $locked->status, 'note' => $d['note'] ?? null]);
            if ($locked->status !== $old) {
                Notice::send($locked->user_id,'وضعیت درخواست تغییر کرد.',['reference' => $locked->reference, 'status' => $locked->status]);
            }
            Audit::record('ticket.updated',$locked,$d);
        });

        return Api::ok($ticket->refresh());
    }
}
