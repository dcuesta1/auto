<?php

namespace App\Http\Controllers\Api\Customers;

use App\Customer;
use App\Http\Controllers\Controller;
use Auth;

class GetCustomersController extends Controller
{
    public function __invoke($id = null)
    {
        $currentUser = Auth::user();
        $id = $id && $currentUser->isDeveloper() ? $id : $currentUser->company_id;


        $customers = Customer::with('vehicles')
            ->where('company_id', $id)
            ->take(100)
            ->orderBy('first_name')->get();

        return $customers;
    }
}
