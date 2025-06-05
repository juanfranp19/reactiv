<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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

    // relaciones Many To Many

    public function calentamientos(): BelongsToMany
    {
        return $this->belongsToMany(Calentamiento::class, 'calentamientos_seguimientos');
    }

    public function ejercicios(): BelongsToMany
    {
        return $this->belongsToMany(Ejercicio::class, 'ejercicios_seguimientos');
    }

    // relaciones One To Many

    public function rutina(): BelongsTo
    {
        return $this->belongsTo(Rutina::class);
    }

    public function socio(): BelongsTo
    {
        return $this->belongsTo(Socio::class);
    }

    // relaciones One To One

    public function acceso(): BelongsTo
    {
        return $this->belongsTo(Acceso::class);
    }
}
