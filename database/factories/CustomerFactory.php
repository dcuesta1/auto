<?php

use Faker\Generator as Faker;

$factory->define(Backend\Customer::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'phone' => $faker->phoneNumber,
        'email' => $faker->freeEmail,
        'address' => $faker->streetAddress,
        'city' => $faker->city,
        'state' => $faker->stateAbbr
    ];
});

$factory->afterCreating(Backend\Customer::class, function ($customer) {
    $customer->vehicles()->save(factory(Backend\Vehicle::class)->make());
});
