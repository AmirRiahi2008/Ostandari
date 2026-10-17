<?php

namespace App\Services;

use App\Models\Content;
use App\Models\DynamicForm;
use App\Models\Poll;
use App\Models\PollOption;
use App\Models\PollVote;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ResourcePayload
{
    public function validate(string $resource, array $input, User $actor, ?Model $model = null): array
    {
        $def = ResourceRegistry::get($resource);
        $creating = ! $model;
        $class = $def['model'];
        $sample = $model ?? new $class;
        foreach ($def['scope'] ?? [] as $key => $value) {
            if (isset($input[$key]) && $input[$key] !== $value) {
                throw ValidationException::withMessages([$key => 'نوع منبع قابل تغییر نیست.']);
            }
            $input[$key] = $value;
        }
        $rules = $def['rules'];
        if ($creating && isset($rules['locale'])) {
            $input['locale'] ??= 'fa';
        }
        if ($creating && isset($rules['slug']) && empty($input['slug'])) {
            $base = trim(preg_replace('/[^\pL\pN]+/u', '-', mb_strtolower($input['title'] ?? $input['name'] ?? 'item')), '-') ?: Str::lower(Str::ulid());
            $input['slug'] = mb_substr($base, 0, 180);
            $i = 1;
            while ($this->uniqueQuery($sample, $input)->where('slug', $input['slug'])->exists()) {
                $input['slug'] = mb_substr($base, 0, 170).'-'.(++$i);
            }
        }
        if (isset($rules['slug'])) {
            $unique = Rule::unique($sample->getTable(), 'slug')->ignore($model?->id);
            foreach (['locale', 'type'] as $column) {
                if (array_key_exists($column, $rules)) {
                    $unique->where($column, $input[$column] ?? $model?->$column ?? 'fa');
                }
            }
            $rules['slug'] = ['required', 'string', 'max:255', 'regex:/^[\pL\pN_-]+$/u', $unique];
        }
        if ($resource === 'menus') {
            $rules['key'][] = Rule::unique('menus', 'key')->where('locale', $input['locale'] ?? $model?->locale ?? 'fa')->ignore($model?->id);
        }
        if (! $creating) {
            foreach ($rules as $key => &$rule) {
                if (! str_contains($key, '.')) {
                    $rule = array_map(fn ($r) => $r === 'required' ? 'sometimes' : $r, $rule);
                }
            }
        }
        unset($rule);
        $data = Validator::make($input, $rules)->validate();
        $data = array_merge($data, $def['scope'] ?? []);
        if (($def['tenant'] ?? false)) {
            if ($creating && ! isset($data['organization_id']) && $actor->organization_id) {
                $data['organization_id'] = $actor->organization_id;
            }
            Access::organization($actor, $data['organization_id'] ?? $model?->organization_id);
        }
        if ($resource === 'organizations') {
            if (isset($data['parent_id'])) {
                Access::organization($actor, $data['parent_id']);
            }
            abort_if($creating && $actor->access_scope !== 'all' && empty($data['parent_id']), 403, 'سازمان باید زیرمجموعه سازمان شما باشد.');
        }
        if ($resource === 'gallery-items') {
            Access::gallery($actor, (int) ($data['gallery_id'] ?? $model?->gallery_id));
        }
        $effective = array_merge($model?->getAttributes() ?? [], $data);
        foreach (['starts_at' => 'ends_at', 'published_at' => 'expires_at', 'opens_at' => 'closes_at', 'term_start' => 'term_end'] as $start => $end) {
            if (! empty($effective[$start]) && ! empty($effective[$end]) && strtotime($effective[$end]) <= strtotime($effective[$start])) {
                throw ValidationException::withMessages([$end => 'زمان پایان باید بعد از زمان شروع باشد.']);
            }
        }
        if (isset($rules['parent_id']) && ! empty($effective['parent_id'])) {
            $parent = $class::findOrFail($effective['parent_id']);
            $seen = $model ? [$model->id] : [];
            for ($i = 0; $parent && $i < 32; $i++) {
                if (in_array($parent->id, $seen, true)) {
                    throw ValidationException::withMessages(['parent_id' => 'ایجاد چرخه در ساختار مجاز نیست.']);
                }
                $seen[] = $parent->id;
                $parent = $parent->parent_id ? $class::find($parent->parent_id) : null;
            }
            if ($parent) {
                throw ValidationException::withMessages(['parent_id' => 'عمق ساختار بیش از حد مجاز است.']);
            }
            $parent = $class::findOrFail($effective['parent_id']);
            if ($def['tenant'] ?? false) {
                Access::organization($actor, $parent->organization_id);
            }
            foreach (['menu_id', 'type', 'locale'] as $key) {
                if (isset($effective[$key]) && $effective[$key] !== $parent->$key) {
                    throw ValidationException::withMessages(['parent_id' => 'والد باید در همان گروه، زبان و نوع باشد.']);
                }
            }
        }
        if ($sample instanceof Content) {
            if ($creating) {
                $data['author_id'] = $actor->id;
            }
            if (($effective['status'] ?? 'draft') === 'published' && empty($effective['published_at'])) {
                $data['published_at'] = now();
            }
        }
        if ($resource === 'galleries' && ($effective['status'] ?? 'draft') === 'published' && empty($effective['published_at'])) {
            $data['published_at'] = now();
        }
        if ($sample instanceof Poll && ($effective['status'] ?? 'draft') === 'active' && (! $model || $model->options()->count() < 2)) {
            throw ValidationException::withMessages(['status' => 'نظرسنجی ابتدا به صورت پیش‌نویس با حداقل دو گزینه ساخته شود.']);
        }
        if ($sample instanceof PollOption && $model && $model->votes()->exists()) {
            foreach (['title', 'poll_id'] as $field) {
                if (isset($data[$field]) && (string) $data[$field] !== (string) $model->$field) {
                    abort(409, 'گزینه دارای رأی قابل تغییر نیست.');
                }
            }
        }
        if ($sample instanceof Poll && $model && $model->votes()->exists()) {
            foreach (['question', 'locale'] as $field) {
                if (isset($data[$field]) && $data[$field] !== $model->$field) {
                    abort(409, 'متن نظرسنجی دارای رأی قابل تغییر نیست.');
                }
            }
        }
        if ($sample instanceof PollOption) {
            $pollId = (int) ($data['poll_id'] ?? $model?->poll_id);
            if (PollVote::where('poll_id', $pollId)->exists() && (! $model || isset($data['title']) && $data['title'] !== $model->title || isset($data['poll_id']) && $data['poll_id'] != $model->poll_id)) {
                abort(409, 'گزینه‌های نظرسنجی دارای رأی قابل تغییر نیستند.');
            }
        }
        if ($sample instanceof DynamicForm && isset($data['fields'])) {
            app(FormEngine::class)->validateSchema($data['fields']);
        }
        foreach (['body', 'description', 'answer', 'bio'] as $field) {
            if (isset($data[$field]) && is_string($data[$field])) {
                $data[$field] = Html::clean($data[$field]);
            }
        }
        if (isset($data['metadata']) && strlen(json_encode($data['metadata'])) > 16000) {
            throw ValidationException::withMessages(['metadata' => 'فراداده بیش از حد مجاز است.']);
        }

        return $data;
    }

    private function uniqueQuery(Model $model, array $input)
    {
        $q = $model->newQueryWithoutScopes();
        foreach (['type', 'locale'] as $key) {
            if (isset($input[$key])) {
                $q->where($key,$input[$key]);
            }
        }

        return $q;
    }
}
