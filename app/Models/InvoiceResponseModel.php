<?php

namespace App\Models;


class InvoiceResponseModel {
    public  $id,
            $status,
            $subtotal,
            $total,
            $customerName,
            $customerEmail,
            $lastPaymentDate,
            $due_date;

    function constructor($model) {
        foreach ( $model as $k => $v ) {
            $this->$k = $v;
            $this->customerName = $model->customer->name;
            $this->customerEmail = $model->customer->email;
        }
    }
}
