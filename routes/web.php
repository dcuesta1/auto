<?php

use App\Mail\WebGuestContact;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Company Website Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function() {
    return view('www.index');
});

Route::post('/newsletter/subscribe', 'Web\SubscribeNewsletterController');
Route::post('/contact', 'Web\ContactController');

Route::get('test', function(Request $request) {
   dd($request);
});
