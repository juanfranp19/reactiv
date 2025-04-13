<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarifa extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'duracion',
        'precio',
    ];
}
