<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Exceptions\{BadInputException, UnauthorizedAccessException};
use Auth;
use App\AuthToken;
use Cookie;
use Illuminate\Http\Request;

class LoginController extends Controller
{   
    public function __invoke(Request $request)
    {
        $credentials = ['email' => $request->email, 'password' => $request->password];
        if (!Auth::attempt($credentials)) {
            throw new UnauthorizedAccessException('INVALID CREDENTIALS');
        }

        $token = new AuthToken();
        $token->value = tokenAuth()->hash();
        $token->device = $request->input('device', tokenAuth()->hash(12));

        $user = Auth::user();
        $user->authTokens()->save($token);

        return response($user)
            ->header('token', $token->value);
    }
}
