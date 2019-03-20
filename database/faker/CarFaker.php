<?php

namespace Database\Faker;

use Arr;

class CarFaker 
{
    private static $_makeModels = [
        'Ford' => [
            'Focus',
            'Fiesta',
            'Mustang'
        ],
        'Chevrolet' => [
            'Cruze',
            'Spark',
            'Impala'
        ]
    ];

    private static $_vins = [
        '1GNCS13WXT2237074',
        '3FADP4EJ9CM135118',
        '1FMHK7F87BGA30217',
        '2FMDK39C77BB64327',
        '1G1ZA5EU9BF204592',
        '5Y2SP67049Z422679',
        '1FTSW31F3YEE40515',
        '1N4AL3AP0FC204691',
        '5NPDH4AE0DH251122',
        '2HKRM4H3XCH618368',
        '5NPEC4AC2DH556610',
        '1FT8W3BT7DEA68010',
        '5FNRL38289B028424'
    ];

    public static function vin()
    {
        return Arr::random(self::$_vins);
    }

    public static function make()
    {
        return 'Ford';
    }

    public static function model()
    {
        return Arr::random(self::$_makeModels['Ford']);
    }
}