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
            $table->unsignedBigInteger('entrenamiento_id')->unique();
            $table->unsignedBigInteger('socio_id');
            $table->integer('num_series');
            $table->integer('num_repeticiones');
            $table->timestamps();

            $table->foreign('entrenamiento_id')->references('id')->on('entrenamientos');
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
