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
        Schema::create('calentamientos_seguimientos', function (Blueprint $table) {
            $table->unsignedBigInteger('seguimiento_id');
            $table->unsignedBigInteger('calentamineto_id');

            $table->foreign('seguimiento_id')->references('id')->on('seguimientos')->onDelete('cascade');
            $table->foreign('calentamineto_id')->references('id')->on('calentamientos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calentamientos_seguimientos');
    }
};
