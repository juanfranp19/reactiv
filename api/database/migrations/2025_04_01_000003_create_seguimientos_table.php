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
        Schema::create('seguimientos', function (Blueprint $table) {
            $table->unsignedBigInteger('ejercicio_id');
            $table->unsignedBigInteger('socio_id');
            $table->date('fecha');

            $table->foreign('socio_id')->references('id')->on('socios');
            $table->foreign('ejercicio_id')->references('id')->on('ejercicios');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seguimientos');
    }
};
