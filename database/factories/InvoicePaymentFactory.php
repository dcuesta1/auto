<?php

use Faker\Generator as Faker;

$factory->define(App\InvoicePayment::class, function (Faker $faker) {
    $taxRate = 6.50;

    $net = $faker->numberBetween($min = 200, $max = 450);
    $taxes = ($taxRate/100)*$net;

    return [
        'net' => $net,
        'gross' => $net + $taxes,
        'fees' => 0.00,
        'merchant_fees' => 0.00,
        'taxes' => $taxes,
        'card' => null,
        'type' => App\InvoicePayment::CASH,
        'reference' => null,
        'is_request' => false
    ];
});
