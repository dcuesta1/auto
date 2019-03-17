<?php
use App\Mail\WebGuestContact;
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

Route::get('/mail', function() {

    Mail::to(env('ADMIN_EMAIL'))->send(new WebGuestContact);

});
