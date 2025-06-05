<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccesoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $acceso_array = parent::toArray($request);
        $seguimiento_array = $this->seguimiento;
        $socio_array = $this->socio;

        unset($acceso_array['socio_id']);

        return array_merge($acceso_array, [
            'seguimiento' => $seguimiento_array,
            'socio' => $socio_array,
        ]);
    }
}
