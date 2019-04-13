<?php

namespace App\Http\Controllers\Api\Customers;

use App\Customer;
use App\Exceptions\UnauthorizedAccessException;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use stdClass;

class DeleteCustomersController extends Controller
{
    public function __invoke(Request $request, $companyId, $ids)
    {
        // Note: For this route, its easier to check authorization using the customer id.
        if (!$request->user()->isDeveloper() && $request->user()->company_id == $companyId) {
            throw new UnauthorizedAccessException();
        }

        if (Str::contains($ids, ',')) {
            $ids = array_map('intval', explode(',', $ids));
        }

        $softDelete = [];
        foreach ($ids as $id) {

            try {
                // If customer has invoices, only soft delete, otherwise permantly delete.
                $invoices = Customer::findOrFail($id)->invoices;

                if ($invoices) {
                    $softDelete[] = $id;
                }

            } catch (ModelNotFoundException $e) {
                Customer::find($id)->forceDelete();
            }

        }

        Customer::destroy($ids);

        $res = new stdClass();
        $res->status = 204;
        $res->message = "Success";

        return response($res, 204);
    }

}
