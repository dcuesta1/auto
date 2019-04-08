<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Mail\WebGuestContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function __invoke(Request $request)
    {
        $validation = $request->validate([
            'email' => 'bail|required||email',
            'name' => 'required',
            'subject' => 'required',
            'message' => 'required'
        ]);

        $form = new ContactFormModel();
        $form->email = $request->email;
        $form->name = $request->name;
        $form->subject = $request->subject;
        $form->message = $request->message;

        $to = config('app.website_admin_email');
        Mail::to($to)->send(new WebGuestContact($form));

        if (Mail::failures()) {
            return response("Oops. Something went wrong. We couldn't send your email.", 200)
                  ->header('Content-Type', 'text/plain');
        }

        return response('OK', 200)
                  ->header('Content-Type', 'text/plain');
    }
}
