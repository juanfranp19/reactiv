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
        Schema::create('calentamientos_rutinas', function (Blueprint $table) {
            $table->unsignedBigInteger('rutina_id');
            $table->unsignedBigInteger('calentamineto_id');
            $table->integer('tiempo'); // minutos

            $table->foreign('rutina_id')->references('id')->on('rutinas')->onDelete('cascade');
            $table->foreign('calentamineto_id')->references('id')->on('calentamientos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calentamientos_rutinas');
    }
};
