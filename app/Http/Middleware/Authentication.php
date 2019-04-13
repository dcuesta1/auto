<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Authentication
{
    public function handle(Request $request, Closure $next)
    {
        tokenAuth()->attempt($request->header('Authorization'));
        $response = $next($request);
        if (tokenAuth()->refreshed()) {
            return $response->header('token', tokenAuth()->refreshed());
        }
        return $response;
    }
}
