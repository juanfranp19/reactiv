<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calentamiento extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'imagen',
    ];
}
