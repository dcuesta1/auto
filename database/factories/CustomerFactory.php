<?php

use Faker\Generator as Faker;

$factory->define(App\Customer::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'phone' => $faker->phoneNumber,
        'email' => $faker->freeEmail,
        'address' => $faker->streetAddress,
        'city' => $faker->city,
        'state' => $faker->stateAbbr,
        'last_visit' => Carbon\Carbon::now()
    ];
});

$factory->afterCreating(App\Customer::class, function ($customer) {
    $customer->vehicles()->save(factory(App\Vehicle::class)->make());
});
