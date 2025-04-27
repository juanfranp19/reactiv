<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Entrenador extends Model
{
    use HasFactory;

    protected $table = 'entrenadores';

    protected $fillable = [
        'nombre',
        'apellidos',
        'email',
        'telefono',
        'user_id',
    ];

    // relaciones One To One

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
