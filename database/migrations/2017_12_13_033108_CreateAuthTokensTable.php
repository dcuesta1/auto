<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuthTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    Schema::create('auth_tokens', function (Blueprint $table) {
		    $table->bigIncrements('id');
		    $table->bigInteger('user_id');
		    $table->string('value', 130);
		    $table->string('device', 64);
		    $table->timestamps();
		    // $table->softDeletes();
	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auth_tokens');
    }
}
