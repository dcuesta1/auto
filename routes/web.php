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
})->name('home');

Route::get('/services', function() {
    return view('www.services');
});

Route::get('/services/{service}', function( $service ) {
    $serviceFile = base_path()."/resources/views/www/content/services/{$service}/index.php";

    if ( !file_exists($serviceFile) ) {
        abort(404);
    }

    return view('www.servicesGroup', require $serviceFile);
});

Route::get('/services/{service}/{childService}', function( $service, $childService) {
    $serviceFile = base_path()."/resources/views/www/content/services/{$service}/{$childService}.php";

    if ( !file_exists($serviceFile) ) {
        abort(404);
    }

    return view('www.service', require $serviceFile);
});

Route::post('/newsletter/subscribe', 'Web\SubscribeNewsletterController');
Route::post('/contact', 'Web\ContactController');

Route::get('test', function(Request $request) {
   dd($request);
});
