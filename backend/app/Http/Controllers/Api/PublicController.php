<?php

namespace App\Http\Controllers\Api;

use App\Models\Comment;
use App\Models\Content;
use App\Models\County;
use App\Models\Faq;
use App\Models\Gallery;
use App\Models\Link;
use App\Models\Member;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Organization;
use App\Models\Quote;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Slide;
use App\Services\ResourceRegistry;
use App\Support\Api;
use App\Support\QueryInput;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PublicController
{
    private function locale(Request $r): string
    {
        return $r->validate(['locale' => ['sometimes', Rule::in(config('portal.locales'))]])['locale'] ?? 'fa';
    }

    public function settings()
    {
        return Api::ok(Setting::where('is_public', true)->whereIn('key', config('portal.public_settings'))->pluck('value', 'key'));
    }

    public function home(Request $r, ?string $slug = null)
    {
        $locale = $this->locale($r);
        $org = $slug ? Organization::active()->where('slug', $slug)->firstOrFail() : null;
        $contents = fn () => Content::visible()->where('locale', $locale)->when($org, fn ($q) => $q->whereIn('organization_id', Organization::subtreeIds($org->id)))->with(['cover', 'category', 'author']);

        return Api::ok([
            'organization' => $org, 'settings' => Setting::where('is_public', true)->whereIn('key', config('portal.public_settings'))->pluck('value', 'key'),
            'menus' => $this->menuData($locale), 'slides' => Slide::active()->inWindow()->where('kind', 'slide')->where('locale', $locale)->with('image')->orderBy('priority')->get(),
            'advertisements' => Slide::active()->inWindow()->where('kind', 'advertisement')->where('locale', $locale)->with('image')->orderBy('priority')->get(),
            'news' => $contents()->where('type', 'news')->orderByDesc('is_featured')->orderBy('priority')->latest('published_at')->limit(10)->get(),
            'announcements' => $contents()->where('type', 'announcement')->latest('published_at')->limit(6)->get(),
            'resolutions' => $contents()->where('type', 'resolution')->latest('published_at')->limit(6)->get(),
            'events' => $contents()->where('type', 'event')->latest('published_at')->limit(6)->get(),
            'governor' => Member::active()->where('locale', $locale)->where('kind', 'governor')->where('is_current', true)->with('image')->orderBy('priority')->first(),
            'members' => Member::active()->where('locale', $locale)->when($org, fn ($q) => $q->whereIn('organization_id', Organization::subtreeIds($org->id)))->with('image')->orderBy('priority')->limit(30)->get()->groupBy('kind'),
            'counties' => County::active()->orderBy('priority')->get(),
            'links' => Link::active()->where('locale', $locale)->with('image')->orderBy('priority')->get(),
            'galleries' => Gallery::published()->where('locale', $locale)->with('items')->latest('published_at')->limit(6)->get(),
            'quote' => Quote::active()->inWindow()->where('locale', $locale)->orderBy('priority')->first(),
        ]);
    }

    public function menus(Request $r)
    {
        return Api::ok($this->menuData($this->locale($r), $r->input('key')));
    }

    private function menuData(string $locale, ?string $key = null)
    {
        return Menu::active()->where('locale', $locale)->when($key, fn ($q) => $q->where('key', $key))->get()->map(function ($menu) {
            $items = MenuItem::active()->where('menu_id', $menu->id)->orderBy('priority')->get();
            $visibleContentIds = Content::visible()->whereIn('id', $items->pluck('content_id')->filter())->pluck('id');
            $items = $items->filter(fn ($item) => ! $item->content_id || $visibleContentIds->contains($item->content_id));
            $tree = function ($parent = null, $depth = 0) use (&$tree, $items) {
                return $depth > 20 ? [] : $items->where('parent_id', $parent)->map(fn ($item) => [...$item->toArray(), 'children' => $tree($item->id, $depth + 1)])->values()->all();
            };

            return [...$menu->toArray(), 'items' => $tree()];
        });
    }

    public function contents(Request $r, ?string $type = null)
    {
        $r->validate(['type' => ['sometimes', Rule::in(config('portal.content_types'))], 'q' => 'sometimes|string|max:200', 'per_page' => 'sometimes|integer|min:1|max:100', 'category_id' => 'sometimes|integer', 'organization_id' => 'sometimes|integer', 'tag_id' => 'sometimes|integer']);
        $q = Content::visible()->where('locale', $this->locale($r))->with('cover', 'category', 'author', 'tags');
        $kind = $type ?? $r->input('type');
        if ($kind) {
            $q->where('type', $kind);
        }
        foreach (['category_id', 'organization_id'] as $f) {
            if ($r->filled($f)) {
                $q->where($f, $r->input($f));
            }
        }
        if ($r->filled('tag_id')) {
            $q->whereHas('tags', fn ($q) => $q->where('tags.id', $r->integer('tag_id')));
        }
        if ($r->filled('q')) {
            $q->where(fn ($q) => $q->where('title', 'like', '%'.$r->input('q').'%')->orWhere('body', 'like', '%'.$r->input('q').'%'));
        }

        return Api::page($q->orderBy('priority')->latest('published_at')->paginate((int) $r->input('per_page', 20)));
    }

    public function content(Request $r, int $id)
    {
        return $this->contentResponse(Content::visible()->findOrFail($id));
    }

    public function contentSlug(Request $r, string $type, string $slug)
    {
        return $this->contentResponse(Content::visible()->where('type', $type)->where('locale', $this->locale($r))->where('slug', $slug)->firstOrFail());
    }

    private function contentResponse(Content $content)
    {
        $content->increment('views');

        return Api::ok(['content' => $content->load('cover', 'category', 'author', 'tags', 'media'),
            'related' => Content::visible()->where('type', $content->type)->where('locale', $content->locale)->where('id', '!=', $content->id)->with('cover')->latest('published_at')->limit(4)->get(),
            'comments' => Comment::where('content_id', $content->id)->where('status', 'approved')->with('author')->latest('id')->limit(100)->get(['id', 'user_id', 'body', 'reply', 'created_at'])]);
    }

    private function catalogQuery(Request $r, string $resource)
    {
        abort_unless(in_array($resource, ['categories', 'counties', 'organizations', 'members', 'services', 'links', 'faqs', 'quotes', 'galleries', 'polls', 'forms'], true), 404);
        $def = ResourceRegistry::get($resource);
        $q = $def['model']::query()->with($def['with'] ?? []);
        QueryInput::filters($r, $def);
        if ($resource === 'galleries') {
            $q->published();
        } elseif ($resource === 'polls') {
            $q->whereIn('status', ['active', 'closed'])->where(fn ($q) => $q->whereNull('starts_at')->orWhere('starts_at', '<=', now()));
        } else {
            $q->active();
        }
        if (in_array($resource, ['categories', 'members', 'services', 'links', 'faqs', 'quotes', 'galleries', 'polls', 'forms'], true)) {
            $q->where('locale', $this->locale($r));
        }
        if ($resource === 'quotes') {
            $q->inWindow();
        }
        if ($resource === 'forms') {
            $q->where(fn ($q) => $q->whereNull('opens_at')->orWhere('opens_at', '<=', now()))->where(fn ($q) => $q->whereNull('closes_at')->orWhere('closes_at', '>', now()));
        }
        foreach ($def['filters'] ?? [] as $field) {
            if (! in_array($field, ['status', 'is_active', 'locale'], true) && $r->filled($field)) {
                $q->where($field, $r->input($field));
            }
        }

        return $q;
    }

    public function catalog(Request $r, string $resource)
    {
        $r->validate(['per_page' => 'sometimes|integer|min:1|max:100', 'q' => 'sometimes|string|max:200']);
        $q = $this->catalogQuery($r, $resource);
        $def = ResourceRegistry::get($resource);
        if ($r->filled('q')) {
            $q->where(function ($q) use ($r, $def) {
                foreach ($def['search'] as $f) {
                    $q->orWhere($f, 'like', '%'.$r->input('q').'%');
                }
            });
        }
        if (isset($def['rules']['priority'])) {
            $q->orderBy('priority');
        }

        return Api::page($q->orderByDesc('id')->paginate((int) $r->input('per_page', 30)));
    }

    public function catalogShow(Request $r, int $id, string $resource)
    {
        return Api::ok($this->catalogQuery($r, $resource)->findOrFail($id));
    }

    public function county(Request $r, string $slug)
    {
        $county = County::active()->whereIn('slug', \App\Support\CountySlugs::variants($slug))->firstOrFail();

        return Api::ok(['county' => $county, 'organizations' => Organization::active()->where('county_id', $county->id)->get(),
            'members' => Member::active()->where('county_id', $county->id)->where('locale', $this->locale($r))->with('image')->get()]);
    }

    public function search(Request $r)
    {
        $d = $r->validate(['q' => 'required|string|min:2|max:150']);
        $locale = $this->locale($r);
        $needle = '%'.$d['q'].'%';

        return Api::ok(['contents' => Content::visible()->where('locale', $locale)->where(fn ($q) => $q->where('title', 'like', $needle)->orWhere('body', 'like', $needle))->with('cover')->limit(30)->get(),
            'services' => Service::active()->where('locale', $locale)->where(fn ($q) => $q->where('name', 'like', $needle)->orWhere('description', 'like', $needle))->limit(15)->get(),
            'faqs' => Faq::active()->where('locale', $locale)->where(fn ($q) => $q->where('question', 'like', $needle)->orWhere('answer', 'like', $needle))->limit(15)->get()]);
    }

    public function assistant(Request $r)
    {
        $d = $r->validate(['question' => 'required|string|min:2|max:500']);
        $locale = $this->locale($r);
        $terms = collect(preg_split('/\s+/u', $d['question']))->filter(fn ($term) => mb_strlen($term) >= 3)->take(8);
        if ($terms->isEmpty()) {
            return Api::ok(['engine' => 'local-content', 'answer' => 'لطفاً پرسش دقیق‌تری بنویسید.', 'sources' => []]);
        }
        $faqs = Faq::active()->where('locale', $locale)->where(function ($q) use ($terms) {
            foreach ($terms as $term) {
                $q->orWhere('question', 'like', '%'.$term.'%');
            }
        })->limit(3)->get();
        $contents = Content::visible()->where('locale', $locale)->where(function ($q) use ($terms) {
            foreach ($terms as $term) {
                $q->orWhere('title', 'like', '%'.$term.'%');
            }
        })->limit(5)->get();

        return Api::ok(['engine' => 'local-content', 'answer' => $faqs->isNotEmpty() ? strip_tags($faqs->first()->answer) : ($contents->isNotEmpty() ? strip_tags($contents->first()->excerpt ?: mb_substr(strip_tags($contents->first()->body),0,600)) : 'در محتوای منتشرشده پاسخی پیدا نشد؛ از بخش ارتباط با استاندار استفاده کنید.'),
            'sources' => $faqs->map(fn ($x) => ['type' => 'faq', 'id' => $x->id, 'title' => $x->question])->concat($contents->map(fn ($x) => ['type' => $x->type, 'id' => $x->id, 'title' => $x->title, 'slug' => $x->slug]))->values()]);
    }
}
