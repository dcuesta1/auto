<?php

use Backend\{ AuthToken, User};
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class UsersTableSeeder extends Seeder
{
	const DEVELOPER_TOKEN = "09652dd658c893862eb687af55b9716e304650a53957f8d2a6dcdb616a6542df36ad9a86889be77ac4f405da8fd567f31c6c5acf6d091697546dd1b7a0521957";
	const OWNER_TOKEN = "OWNERdd658c893862eb687af55b9716e304650a53957f8d2a6dcdb616a6542df36ad9a86889be77ac4f405da8fd567f31c6c5acf6d091697546dd1b7a0521957";

	public function __construct(Faker $faker)
    {
        $this->faker = $faker;
    }

    public function run()
	{
		factory(User::class)
			->states('developer')
			->create()
			->each(function( $user ) {
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
					->save(factory(Backend\AuthToken::class)->make());
			});
	}
}
