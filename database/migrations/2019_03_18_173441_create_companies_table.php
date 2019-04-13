<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('phone');
            $table->string('email');
            $table->string('website')->nullable();
            $table->string('ein')->nullable();
            $table->integer('subscription_type')->default(0);
            $table->timestamp('subscription_expiration')->nullable()->default(null);
            $table->string('invoice_notes', 500)->default('Please pay within 10 days.');
            $table->string('invoice_thankyou_message')->default('Thank you for your business!');
            $table->string('sq_merchant_id')->nullable();
            $table->string('sq_subscription_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
