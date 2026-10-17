<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function () {
            $roles = [
                'super_admin' => ['مدیر اصلی', ['*']],
                'administrator' => ['مدیر سامانه', config('portal.permissions')],
                'editor' => ['روابط عمومی', ['dashboard.view', 'content.manage', 'categories.manage', 'navigation.manage', 'media.manage', 'members.manage', 'comments.manage']],
                'operator' => ['کارشناس پاسخ‌گویی', ['dashboard.view', 'tickets.manage', 'forms.manage']],
                'citizen' => ['شهروند', []],
            ];
            foreach ($roles as $key => [$label,$permissions]) {
                Role::firstOrCreate(['name' => $key], ['label' => $label, 'permissions' => $permissions, 'is_system' => true]);
            }
            $root = Organization::firstOrCreate(['slug' => 'mazandaran'], ['name' => 'استانداری مازندران', 'type' => 'governorate', 'is_active' => true]);
            $password = env('ADMIN_PASSWORD');
            if (! User::where('email', env('ADMIN_EMAIL', 'admin@ostandari.test'))->exists()) {
                if (! $password || strlen($password) < 12) {
                    throw new \RuntimeException('Set ADMIN_PASSWORD (at least 12 characters), or run composer setup first.');
                }
                User::create(['name' => 'مدیر سامانه', 'email' => env('ADMIN_EMAIL', 'admin@ostandari.test'), 'username' => 'admin', 'password' => $password,
                    'role_id' => Role::where('name', 'super_admin')->value('id'), 'organization_id' => $root->id, 'person_type' => 'staff', 'access_scope' => 'all', 'is_active' => true]);
            }
        });
        $this->call(CountySeeder::class);
        $this->command?->info('Base roles and administrator ready. Run php artisan db:seed --class=DemoSeeder for optional sample content.');
    }
}
