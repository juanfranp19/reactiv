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
        Schema::create('ejercicios_seguimientos', function (Blueprint $table) {
            $table->unsignedBigInteger('seguimiento_id');
            $table->unsignedBigInteger('ejercicio_id');

            //$table->unique(['seguimiento_id', 'ejercicio_id'], 'UNQ_seguimientoId_ejercicioId');

            $table->foreign('seguimiento_id')->references('id')->on('seguimientos')->onDelete('cascade');
            $table->foreign('ejercicio_id')->references('id')->on('ejercicios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ejercicios_seguimientos');
    }
};
