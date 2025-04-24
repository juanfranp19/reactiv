<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Rutina extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'socio_id',
    ];

    public function calentamientos(): BelongsToMany
    {
        return $this->belongsToMany(Calentamiento::class, 'calentamientos_rutinas')->withPivot('tiempo');
    }
}
