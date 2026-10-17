<?php

namespace App\Models;

class Organization extends PortalModel
{
    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function county()
    {
        return $this->belongsTo(County::class);
    }

    public static function subtreeIds(int $id): array
    {
        $all = static::query()->get(['id', 'parent_id']);
        $ids = [$id];
        for ($depth = 0; $depth < 32; $depth++) {
            $new = $all->whereIn('parent_id', $ids)->pluck('id')->diff($ids)->all();
            if (! $new) {
                break;
            }
            $ids = array_merge($ids, $new);
        }

        return $ids;
    }
}
