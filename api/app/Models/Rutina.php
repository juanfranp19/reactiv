<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rutina extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'socio_id',
    ];

    // relaciones Many To Many

    public function calentamientos(): BelongsToMany
    {
        return $this->belongsToMany(Calentamiento::class, 'calentamientos_rutinas')->withPivot('tiempo');
    }

    public function ejercicios(): BelongsToMany
    {
        return $this->belongsToMany(Ejercicio::class, 'ejercicios_rutinas')->withPivot('num_series', 'num_repeticiones');
    }

    // relaciones One To Many

    public function seguimientos(): HasMany
    {
        return $this->hasMany(Seguimiento::class);
    }

    public function socio(): BelongsTo
    {
        return $this->belongsTo(Socio::class);
    }
}
