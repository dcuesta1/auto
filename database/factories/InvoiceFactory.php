<?php

use App\Fee;
use App\Invoice;
use Faker\Generator as Faker;

$factory->define(Invoice::class, function (Faker $faker, $args) {

    return [
        'subtotal' => 0.00,
        'total' => 0.00,
        'number' => App\Invoice::generateNumber($args['customer_id'], $args['user_id']),
        'status' => Invoice::CANCELLED
    ];
});

$factory->state(App\Invoice::class, 'pending', function () {
    return [
        'status' => Invoice::PENDING_PAYMENT
    ];
});

$factory->state(App\Invoice::class, 'paid', function () {
    return [
        'status' => Invoice::PAID
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
});

$factory->afterCreatingState(App\Invoice::class, 'paid', function ($invoice) {
    $invoice->invoicePayments()->save(factory(App\InvoicePayment::class)->make([
        'user_id' => 2,
        'amount' => $invoice->total
    ]));
});
