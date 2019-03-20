<?php

use Faker\Generator as Faker;
use Database\Faker\CarFaker;

$factory->define(App\Vehicle::class, function (Faker $faker) {
    return [
        'year' => $faker->numberBetween($min = 2000, $max = 2019),
        'make' => CarFaker::make(),
        'model' => CarFaker::model(),
        'vin' => CarFaker::vin()
    ];
});
