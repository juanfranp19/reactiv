<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EjercicioRutina extends Model
{
    protected $table = 'ejercicios_rutinas';

    public $timestamps = false;

    protected $fillable = [
        'rutina_id',
        'ejercicio_id',
        'num_series',
        'num_repeticiones',
    ];
}
