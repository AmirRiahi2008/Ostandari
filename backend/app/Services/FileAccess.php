<?php

namespace App\Services;

use App\Models\DynamicForm;
use App\Models\FormSubmission;
use App\Models\Media;
use App\Models\Ticket;
use App\Models\TicketMessage;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class FileAccess
{
    public static function attach($model, array $ids, User $user, string $visibility = 'private'): void
    {
        $files = Media::whereIn('id', $ids)->lockForUpdate()->get();
        abort_unless($files->count() === count(array_unique($ids)), 422, 'فایل معتبر نیست.');
        foreach ($files as $file) {
            abort_unless($file->visibility === $visibility, 422, 'سطح دسترسی فایل صحیح نیست.');
            abort_unless($file->user_id === $user->id || $user->hasPermission('media.manage') && $user->access_scope === 'all', 403, 'فایل متعلق به این حساب نیست.');
        }
        $model->media()->sync($files->pluck('id')->all());
    }

    public static function mayRead(Media $file, User $user): bool
    {
        if ($file->user_id === $user->id || $user->hasPermission('media.manage') && $user->access_scope === 'all') {
            return true;
        }
        if ($user->hasPermission('tickets.manage')) {
            $orgs = Access::organizations($user);
            $ticketIds = Ticket::query()->when($user->access_scope !== 'all', fn ($q) => $q->whereIn('organization_id', $orgs))->pluck('id');
            if (DB::table('mediables')->where('media_id', $file->id)->where(function ($q) use ($ticketIds) {
                $q->where(fn ($q) => $q->where('mediable_type', Ticket::class)->whereIn('mediable_id', $ticketIds))
                    ->orWhere(fn ($q) => $q->where('mediable_type', TicketMessage::class)->whereIn('mediable_id', TicketMessage::whereIn('ticket_id', $ticketIds)->select('id')));
            })->exists()) {
                return true;
            }
        }
        if ($user->hasPermission('forms.manage')) {
            $forms = Access::scope(DynamicForm::query(), $user)->pluck('id');
            if (DB::table('mediables')->where('media_id', $file->id)->where('mediable_type', FormSubmission::class)
                ->whereIn('mediable_id', FormSubmission::whereIn('dynamic_form_id', $forms)->select('id'))->exists()) {
                return true;
            }
        }

        // Ticket owners can download staff replies, but never internal notes.
        return DB::table('mediables')->where('media_id', $file->id)->where('mediable_type', TicketMessage::class)
            ->whereIn('mediable_id', TicketMessage::where('is_internal', false)->whereIn('ticket_id', Ticket::where('user_id', $user->id)->select('id'))->select('id'))->exists();
    }
}
