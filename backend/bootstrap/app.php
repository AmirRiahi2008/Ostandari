<?php

use App\Http\Middleware\EnsureActiveUser;
use App\Http\Middleware\NormalizeIdentity;
use App\Http\Middleware\RequirePermission;
use App\Http\Middleware\RequireStaff;
use App\Support\Api;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(api: __DIR__.'/../routes/api.php', commands: __DIR__.'/../routes/console.php', health: '/up')
    ->withCommands([\App\Console\Commands\PrepareLocalAdmin::class])
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias(['active' => EnsureActiveUser::class, 'permission' => RequirePermission::class, 'staff' => RequireStaff::class]);
        $middleware->api(append: [NormalizeIdentity::class]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(fn (Request $request) => true);
        $exceptions->render(function (ValidationException $e) {
            return Api::error('اطلاعات واردشده معتبر نیست.', 422, $e->errors());
        });
        $exceptions->render(function (AuthenticationException $e) {
            return Api::error('برای ادامه وارد حساب کاربری شوید.', 401);
        });
        $exceptions->render(function (Throwable $e) {
            if ($e instanceof HttpExceptionInterface) {
                return Api::error($e->getMessage() ?: match ($e->getStatusCode()) {
                    404 => 'موردی پیدا نشد.', 403 => 'دسترسی مجاز نیست.',
                    429 => 'تعداد درخواست‌ها بیش از حد مجاز است.', default => 'درخواست قابل انجام نیست.',
                }, $e->getStatusCode(), [], $e->getHeaders());
            }
            if ($e instanceof QueryException && in_array((string) $e->getCode(), ['23000', '23505', '23503'])) {
                return Api::error('اطلاعات تکراری است یا رکورد وابسته وجود دارد.', 409);
            }
            if ($e instanceof ModelNotFoundException) {
                return Api::error('موردی پیدا نشد.', 404);
            }
            if (! config('app.debug')) {
                return Api::error('خطای داخلی سرور.', 500);
            }

            return null;
        });
    })->create();
