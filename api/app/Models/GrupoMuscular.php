<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GrupoMuscular extends Model
{
    protected $table = 'grupos_musculares';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
    ];

    // relaciones One To Many

    public function ejercicios(): HasMany
    {
        return $this->hasMany(Ejercicio::class, 'grupo_id');
    }
}
