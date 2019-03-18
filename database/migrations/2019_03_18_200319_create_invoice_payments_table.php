<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_payments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('invoice_id');
            $table->bigInteger('user_id'); // "employee" that processed the payment.
            $table->float('net');
            $table->float('fees');
            $table->float('merchant_fees')->default(0);
            $table->tinyInteger('type');
            $table->integer('card')->nullable(); // last for digits
            $table->string('reference', 100); // the payment reference number from Square
            $table->boolean('is_request')->default(false);
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
        Schema::dropIfExists('invoice_payments');
    }
}
