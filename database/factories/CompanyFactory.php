<?php

use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(App\Company::class, function (Faker $faker) {
    $subscriptionExpiration = Carbon::now()->add(30, 'day');

    return [
        'name' => $faker->company,
        'phone' => $faker->phoneNumber,
        'email' => $faker->email,
        'website' => $faker->domainName,
        'ein' => $faker->randomNumber(7),
        'subscription_type' => 1,
        'subscription_expiration' => $subscriptionExpiration->toDateTimeString(),
        'invoice_fee_rate' => 2.00,
        'invoice_tax_rate' => 6.50,
        'invoice_notes' => "Please pay within 7 days.",
        'invoice_thankyou_message' => "Thank you for your business!",
    ];
});
