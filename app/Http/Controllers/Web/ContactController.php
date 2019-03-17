<?php

namespace App\Http\Controllers\Web;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Subscribes user to our newsletter by simply adding their email to our database.
     *
     * @return View
     */
    public function __invoke(Request $request)
    {
        $validation = $request->validate([
            'email' => 'bail|required||email',
            'name' => 'required',
            'subject' => 'required',
            'message' => 'required'
        ]);

        Mail::to(env('ADMIN_EMAIL'))->send('hello world');
    }
}