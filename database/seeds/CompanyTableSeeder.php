<?php

use App\Company;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class CompanyTableSeeder extends Seeder
{
	public function __construct(Faker $faker)
    {
        $this->faker = $faker;
    }

    public function run()
	{
        factory(Company::class)->create();

    }
}
