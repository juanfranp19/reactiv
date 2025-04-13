<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
