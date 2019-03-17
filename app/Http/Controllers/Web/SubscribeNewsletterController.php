<?php

namespace App\Http\Controllers\Web;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SubscribeNewsletterController extends Controller
{
    /**
     * Subscribes user to our newsletter by simply adding their email to our database.
     *
     * @return View
     */
    public function __invoke(Request $request)
    {
        $email = $request->input('email'); 

        $validation = $request->validate([
            'email' => 'bail|required|unique:subscribers|email'
        ]);

        DB::table('subscribers')
            ->insert([
                'email' => mb_strtolower($email, 'UTF-8') 
            ]);

        return redirect('/')->with('success', 'You have been subscribed!');
    }
}