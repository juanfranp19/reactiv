<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CalentamientoSeguimiento extends Model
{
    protected $table = 'calentamientos_seguimientos';

    public $timestamps = false;

    protected $fillable = [
        'seguimiento_id',
        'calentamiento_id',
    ];
}
