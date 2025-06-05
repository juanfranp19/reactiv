<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Acceso extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'hora_entrada',
        'hora_salida',
        'socio_id',
    ];

    // relaciones One To Many

    public function socio(): BelongsTo
    {
        return $this->belongsTo(Socio::class);
    }

    // relaciones One To One

    public function seguimiento(): HasOne
    {
        return $this->hasOne(Seguimiento::class);
    }
}
