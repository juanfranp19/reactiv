<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GrupoMuscularResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $grupoMuscular_array = parent::toArray($request);
        $ejercicios_array = $this->ejercicios;

        return array_merge($grupoMuscular_array, [
            'ejercicios' => $ejercicios_array,
        ]);
    }
}
