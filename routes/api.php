<?php

/*
 *  Unprotected Routes
 */
Route::post('/authenticate', 'Api\Auth\LoginController');
Route::post('/signout', 'Api\Auth\LogoutController');

// Users
Route::get('/users/{userIds?}', 'Api\Users\GetUsersController');
Route::post('/users', 'Api\Users\StoreUsersController');

// "Company" subgroup

// Customers
Route::get('/company/{id}/customers', 'Api\Customers\GetCompanyCustomersController');
