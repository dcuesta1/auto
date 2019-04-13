<?php

namespace App\Http\Controllers\Api\Invoices;

use App\Company;
use App\Http\Controllers\Controller;
use Auth;

class GetInvoicesController extends Controller
{
    public function __invoke($id = null)
    {
        $currentUser = Auth::user();

        $id = $id && $currentUser->isDeveloper() ? $id : $currentUser->company_id;
        $invoices = Company::find($id)->completeInvoices;

        return $invoices;
    }
}
