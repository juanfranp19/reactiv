<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taquilla extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'socio_id',
        'fecha_fianza',
    ];

}
