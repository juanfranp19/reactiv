<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    // relaciones Many To Many

    public function productos(): BelongsToMany
    {
        return $this->belongsToMany(Producto::class, 'productos_socios')->withPivot('fecha_compra', 'cantidad');
    }

    public function tarifas(): BelongsToMany
    {
        return $this->belongsToMany(Tarifa::class, 'socios_tarifas')->withPivot('fecha_inicio', 'fecha_fin');
    }

    // relaciones One To Many

    public function accesos(): HasMany
    {
        return $this->hasMany(Acceso::class);
    }

    public function seguimientos(): HasMany
    {
        return $this->hasMany(Seguimiento::class);
    }

    public function rutinas(): HasMany
    {
        return $this->hasMany(Rutina::class);
    }

    // relaciones One To One

    public function taquilla(): HasOne
    {
        return $this->hasOne(Taquilla::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
