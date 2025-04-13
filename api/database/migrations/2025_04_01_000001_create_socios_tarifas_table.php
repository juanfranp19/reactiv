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
        Schema::create('socios_tarifas', function (Blueprint $table) {
            $table->unsignedBigInteger('socio_id')->unique();
            $table->unsignedBigInteger('tarifa_id');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');

            $table->foreign('socio_id')->references('id')->on('socios')->onDelete('cascade');
            $table->foreign('tarifa_id')->references('id')->on('tarifas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('socios_tarifas');
    }
};
