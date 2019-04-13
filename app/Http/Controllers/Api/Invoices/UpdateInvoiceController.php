<?php


namespace App\Http\Controllers\Api\Invoices;


use App\Exceptions\UnauthorizedAccessException;
use App\Http\Controllers\Controller;
use App\Invoice;
use Illuminate\Http\Request;

class UpdateInvoiceController extends Controller
{
    public function __invoke(Request $request, $id)
    {
        $invoice = Invoice::find($id);

        // Authorization
        if (!$request->user()->isDeveloper() && $invoice->company_id !== $request->user()->company_id) {
            throw new UnauthorizedAccessException();
        }


        // Save
        $invoice->update($request->all());
        $invoice->save();

        return $invoice;
    }
}
