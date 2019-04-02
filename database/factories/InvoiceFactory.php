<?php

use Faker\Generator as Faker;

$factory->define(\Backend\Invoice::class, function (Faker $faker, $args) {

    return [
        'number' => Backend\Invoice::generateNumber($args['customer_id'], $args['user_id']),
        'status' => \Backend\Invoice::ESTIMATE
    ];
});

$factory->state(Backend\Invoice::class, 'cancelled', function (Faker $faker) {
    return [
        'status' => \Backend\Invoice::CANCELLED
    ];
});

$factory->state(Backend\Invoice::class, 'closed', function (Faker $faker) {
    return [
        'status' => \Backend\Invoice::CLOSED
    ];
});

$factory->state(Backend\Invoice::class, 'pending', function (Faker $faker) {
    return [
        'status' => \Backend\Invoice::PENDING_PAYMENT
    ];
});

$factory->afterCreating(Backend\Invoice::class, function ($invoice) {
    $invoice->items()->save(factory(Backend\Item::class)->make());
    $invoice->items()->save(factory(Backend\Item::class)->states('labor')->make());

    $invoice->invoicePayments()->save(factory(Backend\InvoicePayment::class)->make([
        'user_id' => 2
    ]));
});
