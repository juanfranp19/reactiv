<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CalentamientoRutina extends Model
{
    protected $table = 'calentamientos_rutinas';

    public $timestamps = false;

    protected $fillable = [
        'rutina_id',
        'calentamiento_id',
        'tiempo',
    ];
}
