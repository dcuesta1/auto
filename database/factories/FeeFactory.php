<?php

use App\Fee;

$factory->define(Fee::class, function () {
    return [
        'name' => 'shop supply fee',
        'amount' => 7.25,
        'is_flat_amount' => true,
        'is_tax' => false
    ];
});

$factory->state(Fee::class, 'tax', [
    'name' => 'tax',
    'amount' => 6.50,
    'is_flat_amount' => false,
    'is_tax' => true
]);
