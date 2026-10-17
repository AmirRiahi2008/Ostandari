<?php

// Cross-platform setup for an existing MySQL database, without Node or Docker.
chdir(dirname(__DIR__));
if (version_compare(PHP_VERSION, '8.5.0', '<')) {
    fwrite(STDERR, 'PHP 8.5 or later is required. Current version: '.PHP_VERSION."\n");
    exit(1);
}
if (! is_file('vendor/autoload.php')) {
    fwrite(STDERR, "Run composer install first.\n");
    exit(1);
}
foreach (['pdo', 'pdo_mysql', 'mbstring', 'openssl', 'fileinfo', 'xml', 'ctype'] as $extension) {
    if (! extension_loaded($extension)) {
        fwrite(STDERR, "Missing PHP extension: {$extension}\n");
        exit(1);
    }
}
if (! is_file('.env')) {
    copy('.env.example', '.env');
}
$env = file_get_contents('.env');
$get = fn ($key, $fallback = '') => preg_match('/^'.preg_quote($key, '/').'=(.*)$/m', $env, $match) ? trim($match[1], " \t\r\n\"'") : $fallback;
if ($get('DB_CONNECTION', 'mysql') !== 'mysql') {
    fwrite(STDERR, "Set DB_CONNECTION=mysql and your MySQL credentials in .env.\n");
    exit(1);
}
$local = in_array($get('APP_ENV', 'local'), ['local', 'testing'], true);
$password = $get('ADMIN_PASSWORD');
if (! $password && $local) {
    $password = bin2hex(random_bytes(12)).'Aa9!';
    $env = preg_replace('/^ADMIN_PASSWORD=.*$/m', 'ADMIN_PASSWORD='.$password, $env);
    file_put_contents('.env', $env);
}
if (! $password || strlen($password) < 12) {
    fwrite(STDERR, "Set a strong ADMIN_PASSWORD in .env (12+ characters).\n");
    exit(1);
}
foreach (['bootstrap/cache', 'storage/framework/cache/data', 'storage/framework/sessions', 'storage/framework/views', 'storage/logs', 'storage/app/public', 'storage/app/private'] as $dir) {
    if (! is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}
// Use an argument array: credentials never appear in command-line arguments.
$run = function (array $args) {
    $process = proc_open([PHP_BINARY, 'artisan', ...$args], [0 => STDIN, 1 => STDOUT, 2 => STDERR], $pipes);
    if (! is_resource($process) || proc_close($process) !== 0) {
        exit(1);
    }
};
$run(['config:clear']);
if (! $get('APP_KEY')) {
    $run(['key:generate', '--force']);
}
$run(['migrate', '--force']);
$run(['db:seed', '--force']);
if (! file_exists('public/storage')) {
    $run(['storage:link']);
}
if ($local) {
    $run(['portal:local-admin']);
    $password = 'admin';
}
echo "\nReady. API: http://127.0.0.1:8000/api/v1\nLogin: ".($local ? 'admin' : $get('ADMIN_EMAIL', 'admin@ostandari.test'))."\nPassword: {$password}\n";
echo "Start: php artisan serve\nOptional sample data: php artisan db:seed --class=DemoSeeder\n";
