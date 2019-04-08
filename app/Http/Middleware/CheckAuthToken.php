<?php
namespace App\Http\Middleware;
use Closure;

class CheckAuthToken
{
	public function handle($request, Closure $next)
	{
		TokenAuth()->attempt($request->header('Authorization'));
        $response = $next($request);
        
		if(TokenAuth()->refreshed()) {
			return $response->header('token', Authenticator()->refreshed());
		}
		return $response;
	}
}
