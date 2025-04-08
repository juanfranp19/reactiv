<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GrupoMuscular extends Model
{
    protected $table = 'grupos_musculares';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
    ];
}
