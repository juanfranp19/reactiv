<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SeguimientoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $seguimiento_array = parent::toArray($request);
        $rutina_array = $this->rutina;
        $socio_array = $this->socio;

        unset($seguimiento_array['rutina_id']);
        unset($seguimiento_array['socio_id']);

        return array_merge($seguimiento_array, [
            'rutina' => $rutina_array,
            'socio' => $socio_array,
        ]);
    }
}
