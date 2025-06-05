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
            $table->id();
            $table->unsignedBigInteger('socio_id');
            $table->unsignedBigInteger('rutina_id')->nullable();
            $table->unsignedBigInteger('acceso_id')->nullable();
            $table->text('observaciones')->nullable();
            $table->date('fecha');

            $table->unique(['socio_id', 'fecha'], 'UNQ_socioId_fecha');

            $table->foreign('socio_id')->references('id')->on('socios')->onDelete('cascade');
            $table->foreign('rutina_id')->references('id')->on('rutinas')->onDelete('cascade');
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
