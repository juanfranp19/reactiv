<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ejercicio extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'imagen',
        'grupo_id',
    ];
}
