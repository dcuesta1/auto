<?php

use Faker\Generator as Faker;

$factory->define(\App\Invoice::class, function (Faker $faker, $args) {

    return [
        'number' => App\Invoice::generateNumber($args['customer_id'], $args['user_id']),
        'status' => \App\Invoice::ESTIMATE
    ];
});

$factory->state(App\Invoice::class, 'cancelled', function (Faker $faker) {
    return [
        'status' => \App\Invoice::CANCELLED
    ];
});

$factory->state(App\Invoice::class, 'closed', function (Faker $faker) {
    return [
        'status' => \App\Invoice::CLOSED
    ];
});

$factory->state(App\Invoice::class, 'pending', function (Faker $faker) {
    return [
        'status' => \App\Invoice::PENDING_PAYMENT
    ];
});
