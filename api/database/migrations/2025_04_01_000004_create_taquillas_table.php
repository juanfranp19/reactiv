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
        Schema::create('taquillas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('socio_id')->nullable()->unique();
            $table->date('fecha_fianza')->nullable();
            $table->integer('fianza')->nullable();

            $table->foreign('socio_id')->references('id')->on('socios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taquillas');
    }
};
