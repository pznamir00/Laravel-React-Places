<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('place_id')->nullable();
            $table->decimal('lat', 10, 8);
            $table->decimal('lon', 10, 8);
            $table->timestamps();
        });

        Schema::table('locations', function(Blueprint $table){
            $table->foreign('place_id')
                  ->references('id')
                  ->on('places')
                  ->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('locations');
    }
}
