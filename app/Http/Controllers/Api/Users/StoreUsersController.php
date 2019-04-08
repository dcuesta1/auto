<?php

namespace App\Http\Controllers\Api\Users;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StoreUsersController extends Controller
{
    // Should 

    public function __invoke(Request $request)
    {
        
        $this->validate($request, [
		    'name' => 'required|max:191',
		    'username' => 'required|max:30|unique:users',
		    'email' => 'required|unique:users|email',
			'role' => 'nullable|integer'
	    ]);

	    #TODO: Send password reset email
	    $user = new User($request->all());
	    $user->password = str_random();
	    $user->save();

        return $user;

        return [
            'data' => $users
        ];
    }
}
