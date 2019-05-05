<?php

use App\Fee;
use App\Invoice;
use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(Invoice::class, function (Faker $faker, $args) {
    $dueDate = Carbon::now();
    $dueDate->add(2, 'days');

    return [
        'subtotal' => 0.00,
        'total' => 0.00,
        'amount_paid' => 0.00,
        'due_date' => $dueDate,
        'number' => App\Invoice::generateNumber($args['customer_id'], $args['user_id']),
        'status' => Invoice::CANCELLED
    ];
});

$factory->state(App\Invoice::class, 'pending', function () {
    $dueDate = Carbon::now();
    $dueDate->add(30, 'days');

    return [
        'status' => Invoice::PENDING_PAYMENT,
        'due_date' => $dueDate
    ];
});

$factory->state(App\Invoice::class, 'paid', function () {
    return [
        'status' => Invoice::PAID,
        'due_date' => Carbon::now()
    ];
});

$factory->state(App\Invoice::class, 'estimate', function () {
    return [
        'status' => Invoice::ESTIMATE
    ];
});

$factory->afterCreating(App\Invoice::class, function ($invoice) {
    $fees = Fee::all();
    $taxRateAmount = 0;
    $feeFlatAmount = 0;

    foreach ($fees as $fee) {

        $invoice->fees()->save($fee);

        if ($fee->is_tax) {
            $taxRateAmount += $fee->amount;
        } else {
            $feeFlatAmount += $fee->amount;
        }
    }

    $net = 0;

    $invoice->items()->save(factory(App\Item::class)->make());
    $invoice->items()->save(factory(App\Item::class)->states('labor')->make());

    $items = $invoice->items;

    foreach ($items as $item) {
        $net += $item->price;
    }

    $taxes = ($taxRateAmount / 100) * $net;

    $invoice->subtotal = $net;
    $invoice->total = $taxes + $feeFlatAmount + $net;
    $invoice->save();
});

$factory->afterCreatingState(App\Invoice::class, 'pending', function ($invoice) {
    $invoice->invoicePayments()->save(factory(App\InvoicePayment::class)->states('card')->make([
        'user_id' => 2,
        'amount' => $invoice->total - 100,
    ]));

    $invoice->amount_paid = $invoice->total - 100;
    $invoice->last_payment_date = Carbon::now();

    $invoice->save();
});

$factory->afterCreatingState(App\Invoice::class, 'paid', function ($invoice) {
    $invoice->invoicePayments()->save(factory(App\InvoicePayment::class)->make([
        'user_id' => 2,
        'amount' => $invoice->total
    ]));

    $invoice->amount_paid = $invoice->total;
    $invoice->last_payment_date = Carbon::now();

    $invoice->save();
});
