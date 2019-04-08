<?php

use Database\Faker\ItemFaker;
use Faker\Generator as Faker;

$factory->define(App\Item::class, function (Faker $faker) {
    return [
        'reference' => $faker->ean13,
        'name' => ItemFaker::part(),
        'price' => $faker->numberBetween($min = 200, $max = 500),
        'description' => $faker->text($maxNbChars = 190),
        'provider' => $faker->company,
        'is_labor' => false
    ];
});

$factory->state(App\Item::class, 'labor', function (Faker $faker) {
    return [
        'name' => App\Item::LABOR,
        'reference' => '',
        'provider' => '',
        'is_labor' => true
    ];
});
