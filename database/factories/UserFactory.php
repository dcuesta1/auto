<?php

use Faker\Generator as Faker;

$factory->define(App\User::class, function (Faker $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'username' => $faker->userName,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->phoneNumber,
        'password' => $password ?: $password = tokenAuth()->encrypt('password'),
        'type' => App\User::EMPLOYEE,
        'company_id' => 0
    ];
});

$factory->state(App\User::class, 'developer', [
    'name' => 'Daniel Cuesta',
    'username' => 'dcuesta',
    'email' => 'cuestadaniel31@gmail.com',
    'password' => tokenAuth()->encrypt('password'),
    'type' => App\User::DEVELOPER,
]);

$factory->state(App\User::class, 'owner', [
    'name' => 'Gary Beatty',
    'username' => 'gbeatty',
    'email' => 'gary@beattysautorepair.com',
    'password' => tokenAuth()->encrypt('password'),
    'type' => App\User::OWNER,
    'company_id' => function() {
        return factory(App\Company::class)->create([
            'email' => 'gary@beattysautorepair.com'
        ])->id;
    }
]);

$factory->state(App\User::class, 'employee', [
    'company_id' => 1
]);

$factory->afterCreatingState(App\User::class, 'owner', function ($user, $faker) {
    $roles = $user->company->employeeRoles;

    foreach( $roles as $role ) {
        if($role->name == App\Role::OWNER) {
            $user->role()->save($role);
        }
    }
});

// $factory->afterCreatingState(App\User::class, 'employee', function ($user, $faker) {
   
// });
