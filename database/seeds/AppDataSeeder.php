<?php

use App\AuthToken;
use App\User;
use Illuminate\Database\Seeder;

class AppDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class)
            ->states('developer')
            ->create()
            ->each(function ($user) {
                $user
                    ->authTokens()
                    ->save(factory(AuthToken::class)->states('developer')->make());
            });

        factory(User::class)
            ->states('owner')
            ->create()
            ->each(function ($user) {
                $user
                    ->authTokens()
                    ->save(factory(AuthToken::class)->states('owner')->make());
            });
        #TODO: bug; two owner tokens are being made, but one is for the developer user.

        factory(User::class, 3)
            ->states('employee')
            ->create()
            ->each(function ($user) {
                $user
                    ->authTokens()
                    ->save(factory(App\AuthToken::class)->make());
            });

    }
}
