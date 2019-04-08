<?php

namespace App\Http\Controllers\Api\customers;

use App\Customer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GetCompanyCustomersController extends Controller
{
    public function __invoke(Request $request, $companyId)
    {
        $customers = Customer::with('vehicles')->where('company_id', $companyId)->take(100)->orderBy('first_name')->get();
        return $customers;
    }
}
