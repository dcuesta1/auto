<?php

use App\Invoice;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id');   // Employee id
            $table->bigInteger('customer_id');
            $table->bigInteger('vehicle_id');
            $table->string('number', 20);
            $table->string('customer_name');
            $table->string('customer_email');
            $table->float('discount')->default(0.00);
            $table->float('subtotal')->default(0.00);
            $table->float('total')->default(0.00);
            $table->float('amount_paid')->default(0.00);
            $table->tinyInteger('status')->default(Invoice::ESTIMATE);
            $table->timestamp('due_date')->nullable();
            $table->timestamp('last_payment_date')->nullable();
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
        Schema::dropIfExists('invoices');
    }
}
