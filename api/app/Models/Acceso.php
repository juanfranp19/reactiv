<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acceso extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'hora_entrada',
        'hora_salida',
        'socio_id',
    ];
}
