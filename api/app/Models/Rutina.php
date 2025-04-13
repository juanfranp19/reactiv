<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rutina extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'socio_id',
    ];
}
