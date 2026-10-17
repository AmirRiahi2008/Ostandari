<?php

return ['stateful' => [], 'guard' => [], 'expiration' => (int) env('AUTH_TOKEN_MINUTES', 1440), 'token_prefix' => '', 'middleware' => []];
