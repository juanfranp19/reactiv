<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoSocio extends Model
{
    use HasFactory;

    protected $table = 'productos_socios';

    public $timestamps = false;

    protected $fillable = [
        'socio_id',
        'producto_id',
        'fecha_compra',
        'cantidad',
    ];
}
