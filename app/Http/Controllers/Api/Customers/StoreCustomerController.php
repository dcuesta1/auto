<?php

namespace App\Http\Controllers\Api\Customers;

use App\Company;
use App\Customer;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;

// SAMPLE: CONTROLLER-SAMPLE
class StoreCustomerController extends Controller
{
    public function __invoke(Request $request, $id = null)
    {
        // Fetch the correct company, weather is a developer impersonating, or an user.
        $id = $request->user()->isDeveloper() ? $id : $request->user()->company_id;
        $company = Company::find($id);

        // Validate those inputs.
        $this->validate($request, [
            'first_name' => 'required|min:3',
            'last_name' => 'required|min:3',
            'email' => 'required|email',
            'phone' => 'required',
            'address_one' => 'nullable|min:3',
            'state' => 'nullable|max:2',
        ]);

        // Finish the goal of the request.
        $customer = new Customer($request->all());
        $customer = $company->customers()->save($customer);

        return $customer;
    }

}
