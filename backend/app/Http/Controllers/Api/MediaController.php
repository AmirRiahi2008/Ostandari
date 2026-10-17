<?php

namespace App\Http\Controllers\Api;

use App\Models\Media;
use App\Services\Audit;
use App\Services\FileAccess;
use App\Support\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class MediaController
{
    public function index(Request $r)
    {
        $r->validate(['per_page' => 'sometimes|integer|min:1|max:100', 'visibility' => 'sometimes|in:public,private']);
        $q = Media::query();
        if (! $r->user()->hasPermission('media.manage') || $r->user()->access_scope !== 'all') {
            $q->where('user_id', $r->user()->id);
        }
        if ($r->filled('visibility')) {
            $q->where('visibility', $r->input('visibility'));
        }

        return Api::page($q->latest('id')->paginate((int) $r->input('per_page', 20)));
    }

    public function store(Request $r)
    {
        $d = $r->validate(['file' => ['required', 'file', 'max:'.config('portal.upload_max_kb'), 'mimes:jpg,jpeg,png,webp,pdf,docx,xlsx,mp4,mp3,txt'],
            'visibility' => ['required', Rule::in(['public', 'private'])], 'alt' => 'nullable|string|max:255']);
        if ($d['visibility'] === 'public') {
            abort_unless($r->user()->isStaff() && $r->user()->hasPermission('media.manage'), 403);
        }
        $file = $r->file('file');
        $disk = $d['visibility'] === 'public' ? 'public' : 'local';
        // Guess extension from MIME and never use the client's filename as a storage path.
        $extension = $file->guessExtension();
        abort_unless(in_array($extension, ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'docx', 'xlsx', 'mp4', 'mp3', 'txt'], true), 422, 'نوع واقعی فایل مجاز نیست.');
        $filePath = $file->storeAs(now()->format('Y/m'), Str::uuid().'.'.$extension, $disk);
        try {
            $dimensions = str_starts_with($file->getMimeType(), 'image/') ? @getimagesize($file->getRealPath()) : null;
            $media = Media::create(['user_id' => $r->user()->id, 'disk' => $disk, 'path' => $filePath, 'original_name' => mb_substr(basename(str_replace('\\', '/', $file->getClientOriginalName())), 0, 255),
                'mime' => $file->getMimeType(), 'size' => $file->getSize(), 'visibility' => $d['visibility'], 'alt' => $d['alt'] ?? null, 'width' => $dimensions[0] ?? null, 'height' => $dimensions[1] ?? null]);
        } catch (\Throwable $e) {
            Storage::disk($disk)->delete($filePath);
            throw $e;
        }
        Audit::record('media.created', $media);

        return Api::ok($media, 'فایل ذخیره شد.', 201);
    }

    public function download(Request $r, int $id)
    {
        $m = Media::findOrFail($id);
        abort_unless(FileAccess::mayRead($m, $r->user()), 404);
        abort_unless(Storage::disk($m->disk)->exists($m->path), 404);

        return Storage::disk($m->disk)->download($m->path, $m->original_name, ['X-Content-Type-Options' => 'nosniff', 'Cache-Control' => 'private, no-store']);
    }

    public function destroy(Request $r, int $id)
    {
        $m = Media::findOrFail($id);
        abort_unless($m->user_id === $r->user()->id || $r->user()->hasPermission('media.manage') && $r->user()->access_scope === 'all', 404);
        $used = DB::table('mediables')->where('media_id', $id)->exists();
        foreach (['contents' => 'cover_media_id', 'slides' => 'media_id', 'members' => 'media_id', 'links' => 'media_id', 'gallery_items' => 'media_id'] as $table => $fk) {
            $used = $used || DB::table($table)->where($fk, $id)->exists();
        }
        abort_if($used, 409, 'فایل هنوز در محتوا یا مکاتبات استفاده می‌شود.');
        // A tombstone prevents broken references; the file is physically removed only when unreferenced.
        Storage::disk($m->disk)->delete($m->path);
        $m->delete();
        Audit::record('media.deleted',$m);

        return response()->noContent();
    }
}
