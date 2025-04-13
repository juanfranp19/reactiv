<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EjercicioSeguimiento extends Model
{
    protected $table = 'ejercicios_seguimientos';

    public $timestamps = false;

    protected $fillable = [
        'seguimiento_id',
        'ejercicio_id',
    ];
}
