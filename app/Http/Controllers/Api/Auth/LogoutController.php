<?php

namespace App\Http\Controllers\Api\Auth;

use App\AuthToken;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LogoutController extends Controller
{
    public function __invoke(Request $request, Response $response) {
        $token = AuthToken::where('value', $request->input('token'))->delete();
        return ['ok'];
    }
}
