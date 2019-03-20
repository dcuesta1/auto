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

    $user = \App\User::find(1);

    Mail::to($user)->send(new WebGuestContact);

});





Route::get('test', function() {
    $ip = $_SERVER['HTTP_USER_AGENT'].$_SERVER['REMOTE_ADDR'];
    return $ip;
});
