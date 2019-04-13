<?php

$factory->define(App\InvoicePayment::class, function () {
    return [
        'amount' => 0.00,
        'card' => null,
        'type' => App\InvoicePayment::CASH,
        'reference' => null,
        'is_request' => false
    ];
});

$factory->state(App\InvoicePayment::class, 'card', function () {
    return [
        'card' => 2525,
        'type' => App\InvoicePayment::CARD_SWIPED,
    ];
});
