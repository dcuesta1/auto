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

$factory->afterCreating(App\Company::class, function ($company) {
    $ownerRole = new App\Role();
    $ownerRole->name = 'owner';
    $ownerRole->description = 'Owner of account.';
    $ownerRole->permissions = [
        'take_all_payments',
        'create_employees',
        'manage_roles',
        'view_all_employees',
        'view_all_invoices',
        'view_all_payments',
    ];
    $company->employeeRoles()->save($ownerRole);

    $customers = factory(App\Customer::class, 120)->make()->each(function( $customer ) use ($company) {
        $customer = $company->customers()->save($customer);
        $car = $customer->vehicles()->save(factory(App\Vehicle::class)->make());

        factory(App\Invoice::class)->create([
            'vehicle_id' => $car->id,
            'user_id' => 2,
            'customer_id' => $customer->id
        ]);
    });
});
