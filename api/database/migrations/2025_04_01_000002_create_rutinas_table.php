<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rutinas', function (Blueprint $table) {
            $table->unsignedBigInteger('ejercicio_id');
            $table->unsignedBigInteger('socio_id');
            $table->integer('num_series');
            $table->integer('num_repeticiones');
            $table->timestamps();

            $table->unique(['ejercicio_id', 'socio_id'], 'UNQ_ejercicio_socio');

            $table->foreign('ejercicio_id')->references('id')->on('ejercicios');
            $table->foreign('socio_id')->references('id')->on('socios');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rutinas');
    }
};
