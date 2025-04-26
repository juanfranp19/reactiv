<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Taquilla extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'socio_id',
        'fecha_fianza',
    ];

    // relaciones One To One

    public function socio(): BelongsTo
    {
        return $this->belongsTo(Socio::class);
    }
}
