<?php

use Faker\Generator as Faker;

$factory->define(Backend\AuthToken::class, function (Faker $faker) {
    return [
        'device' => $faker->uuid,
        'value' => tokenAuth()->hash()
    ];
});

$factory->state(Backend\AuthToken::class, 'developer', [
    'value' => '09652dd658c893862eb687af55b9716e304650a53957f8d2a6dcdb616a6542df36ad9a86889be77ac4f405da8fd567f31c6c5acf6d091697546dd1b7a0521957',
]);

$factory->state(Backend\AuthToken::class, 'owner', [
    'value' => 'wloeidd658c893862eb687af55b9716e304650a53957f8d2a6dcdb616a6542df36ad9a86889be77ac4f405da8fd567f31c6c5acf6d091697546dd1b7a0521957',
]);
