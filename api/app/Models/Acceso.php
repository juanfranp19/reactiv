<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
