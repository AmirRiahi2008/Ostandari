<?php

namespace App\Services;

use App\Models\Gallery;
use App\Models\Organization;
use App\Models\User;

class Access
{
    public static function organizations(User $user): array
    {
        return $user->organization_id ? Organization::subtreeIds($user->organization_id) : [];
    }

    public static function scope($query, User $user, bool $tenant = true, string $column = 'organization_id')
    {
        if ($tenant && $user->access_scope !== 'all') {
            $query->whereIn($column, self::organizations($user));
        }

        return $query;
    }

    public static function organization(User $user, mixed $id): void
    {
        if ($user->access_scope !== 'all') {
            abort_unless(in_array((int) $id, self::organizations($user), true), 403, 'سازمان خارج از محدوده دسترسی است.');
        }
    }

    public static function gallery(User $user, int $id): void
    {
        self::organization($user, Gallery::findOrFail($id)->organization_id);
    }
}
