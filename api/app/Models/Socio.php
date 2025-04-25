<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Socio extends Model
{
    use HasFactory;

    protected $fillable = [
        'dni',
        'nombre',
        'apellidos',
        'email',
        'telefono',
        'fecha_nac',
        'user_id',
    ];

    public function productos(): BelongsToMany
    {
        return $this->belongsToMany(Producto::class, 'productos_socios')->withPivot('fecha_compra', 'cantidad');
    }

    public function tarifas(): BelongsToMany
    {
        return $this->belongsToMany(Tarifa::class, 'socios_tarifas')->withPivot('fecha_inicio', 'fecha_fin');
    }
}
