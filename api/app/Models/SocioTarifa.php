<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocioTarifa extends Model
{
    use HasFactory;

    protected $table = 'socios_tarifas';

    public $timestamps = false;

    protected $fillable = [
        'socio_id',
        'tarifa_id',
        'fecha_inicio',
        'fecha_fin',
    ];
}
