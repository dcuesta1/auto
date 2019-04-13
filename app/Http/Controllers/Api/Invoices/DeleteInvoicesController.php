<?php


namespace App\Http\Controllers\Api\Invoices;


use App\Exceptions\UnauthorizedAccessException;
use App\Http\Controllers\Controller;
use App\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use stdClass;

class DeleteInvoicesController extends Controller
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

        Invoice::destroy($ids);

        $res = new stdClass();
        $res->status = 204;
        $res->message = "Success";

        return response($res, 204);
    }
}
