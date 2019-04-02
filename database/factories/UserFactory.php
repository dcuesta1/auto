<?php

use Faker\Generator as Faker;

$factory->define(Backend\User::class, function (Faker $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'username' => $faker->userName,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->phoneNumber,
        'password' => $password ?: $password = tokenAuth()->encrypt('password'),
        'type' => Backend\User::EMPLOYEE,
        'company_id' => 0
    ];
});

$factory->state(Backend\User::class, 'developer', [
    'name' => 'Daniel Cuesta',
    'username' => 'dcuesta',
    'email' => 'cuestadaniel31@gmail.com',
    'password' => tokenAuth()->encrypt('password'),
    'type' => Backend\User::DEVELOPER,
]);

$factory->state(Backend\User::class, 'owner', [
    'name' => 'Gary Beatty',
    'username' => 'gbeatty',
    'email' => 'gary@beattysautorepair.com',
    'password' => tokenAuth()->encrypt('password'),
    'type' => Backend\User::OWNER,
    'company_id' => function() {
        return factory(Backend\Company::class)->create([
            'email' => 'gary@beattysautorepair.com'
        ])->id;
    }
]);

$factory->state(Backend\User::class, 'employee', [
    'company_id' => 1
]);

$factory->afterCreatingState(Backend\User::class, 'owner', function ($user) {
    $roles = $user->company->employeeRoles;

    foreach( $roles as $role ) {
        if($role->name == Backend\Role::OWNER) {
            $user->role()->save($role);
        }
    }
});

// $factory->afterCreatingState(Backend\User::class, 'employee', function ($user, $faker) {
   
// });
