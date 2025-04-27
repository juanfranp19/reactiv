<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ejercicio extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'imagen',
        'grupo_id',
    ];

    // relaciones One To Many

    public function grupoMuscular(): BelongsTo
    {
        return $this->belongsTo(GrupoMuscular::class, 'grupo_id');
    }
}
