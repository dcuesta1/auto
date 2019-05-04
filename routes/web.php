<?php

use App\Mail\WebGuestContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


/*
|--------------------------------------------------------------------------
| TEST Routes
|--------------------------------------------------------------------------
*/

Route::get('/pusher', function() {
    $pusher = new Pusher\Pusher("5dcd40f6ff274f899e99", "fc3efef754d31488360b", "771720", array('cluster' => 'us2'));
    $pusher->trigger('autoshop-app', 'my-event', array('message' => 'hello world'));
});

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

Route::get('/sitemap', function() {
    return view('www.sitemap');
});

Route::post('/newsletter/subscribe', 'Web\SubscribeNewsletterController');
Route::post('/contact', 'Web\ContactController');
Route::post('/track', function(Request $request) {
    $now = Carbon::now()->toDateTimeString();
    $name = $request->input('item');

    DB::table('website_counter')->insert([
        'name' => $name,
        'created_at' => $now
    ]);
});
