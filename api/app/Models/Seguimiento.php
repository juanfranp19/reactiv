<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Seguimiento extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'socio_id',
        'rutina_id',
        'observaciones',
        'fecha',
    ];

    public function calentamientos(): BelongsToMany
    {
        return $this->belongsToMany(Calentamiento::class, 'calentamientos_seguimientos');
    }

    public function ejercicios(): BelongsToMany
    {
        return $this->belongsToMany(Ejercicio::class, 'ejercicios_seguimientos');
    }
}
