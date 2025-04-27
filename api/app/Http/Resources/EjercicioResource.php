<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EjercicioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $ejercicio_array = parent::toArray($request);
        $grupoMuscular_array = $this->grupoMuscular;

        unset($ejercicio_array['grupo_id']);

        return array_merge($ejercicio_array, [
            'grupo_muscular' => $grupoMuscular_array,
        ]);
    }
}
