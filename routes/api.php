<?php

/*
 *  Unprotected Routes
 */
Route::post('/authenticate', 'Api\Auth\LoginController');

// Users
Route::get('/users/{userIds?}', 'Api\Users\GetUsersController');
Route::post('/users', 'Api\Users\StoreUsersController');
