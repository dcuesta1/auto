<?php

namespace App\Http\Controllers\Api\Users;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GetUsersController extends Controller
{
      /*
    |--------------------------------------------------------------------------
    | Get Users Controller
    |--------------------------------------------------------------------------
    |
    | This controller is incharge of retrieving users, it may retrieve a single
    | user when a single id entered, or more than one when multiple comas separated
    | ids or all users if no ids are passed.
    |
    */

    public function __invoke(Request $request, $ids = '')
    {
        #TODO: add superuser guard
        if ($ids) {
            $ids = array_map('intval', explode(',', $ids));
            $users = User::orderBy('name')->find($ids);
        } else {
            $users = User::orderBy('name')->get();
        }

        return $users;
    }
}
