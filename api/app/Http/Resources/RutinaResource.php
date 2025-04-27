<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RutinaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $rutina_array = parent::toArray($request);
        $seguimientos_array = $this->seguimientos;
        $socio_array = $this->socio;

        unset($rutina_array['socio_id']);

        return array_merge($rutina_array, [
            'seguimientos' => $seguimientos_array,
            'socio' => $socio_array,
        ]);
    }
}
