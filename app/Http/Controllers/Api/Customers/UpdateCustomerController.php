<?php

namespace App\Http\Controllers\Api\Customers;

use App\Customer;
use App\Exceptions\UnauthorizedAccessException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UpdateCustomerController extends Controller
{
    public function __invoke(Request $request, $id)
    {
        $customer = Customer::find($id);

        // Authorization
        if (!$request->user()->isDeveloper() && $customer->company_id !== $request->user()->company_id) {
            throw new UnauthorizedAccessException();
        }

        // Validate those inputs.
        $this->validate($request, [
            'first_name' => 'sometimes|min:3',
            'last_name' => 'sometimes|min:3',
            'email' => 'sometimes|email',
            'state' => 'sometimes|max:2',
        ]);

        // Save
        $customer->update($request->all());
        $customer->save();

        return $customer;
    }
}
