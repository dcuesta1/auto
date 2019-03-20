<?php

namespace Database\Faker;

use Arr;

class ItemFaker
{
    private static $_parts = [
        'radiator', 'rocker', 'spoiler', 'rims','tire pressure gauge',
        'vacuum gauge', 'voltmeter', 'tachometer', 'speedometer', 'oil pressure gauge',
        'battery', 'ignition switch', 'power window switch', 'switch cover', 'door switch'
    ];

    public static function part()
    {
        return Arr::random(self::$_parts);
    }
}