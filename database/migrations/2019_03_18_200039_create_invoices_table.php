<?php

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
            $table->bigInteger('company_id');
            // "Employee that created the estimate" user_id
            $table->bigInteger('user_id');   
            $table->bigInteger('customer_id'); 
            // One invoice per car service.
            $table->bigInteger('vehicle_id');   
            $table->string('number', 20);
            // The total ammount discounted
            $table->float('discount')->default(0.00);
            //$table->float('subtotal');
            //$table->float('total');
            $table->tinyInteger('status')->default(2);
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
