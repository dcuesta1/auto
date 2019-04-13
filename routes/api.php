<?php

/*
 *  Unprotected Routes
 */
Route::post('/authenticate', 'Api\Auth\LoginController');
Route::post('/signout', 'Api\Auth\LogoutController');

Route::group(['middleware' => ['auth.api']], function () {

    // Users
    Route::get('/users/{userIds?}', 'Api\Users\GetUsersController');
    Route::post('/users', 'Api\Users\StoreUsersController');

    // Profile

    // "Company" subgroup

    // Customers
    Route::get('/company/{id?}/customers', 'Api\Customers\GetCustomersController');
    Route::post('/company/{id?}/customers', 'Api\Customers\StoreCustomerController');
    Route::patch('/company/customers/{id}', 'Api\Customers\UpdateCustomerController');
    Route::delete('/company/{companyId}/customers/{$ids}', 'Api\Customers\DeleteCustomersController');

    // Invoices
    Route::get('/company/{id?}/invoices', 'Api\Invoices\GetInvoicesController');
    Route::post('/company/{id?}/invoices/', 'Api\Invoices\StoreInvoiceController');
    Route::patch('/company/invoices/{id}', 'Api\Invoices\UpdateInvoiceController');
    Route::delete('/company/{companyId}/invoices/{ids}', 'Api\Invoices\DeleteInvoicesController');
});
