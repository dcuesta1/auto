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
   $company = App\Company::find(1);

   echo $company->owner()->name;
});
