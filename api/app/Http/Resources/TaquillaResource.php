<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaquillaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $taquilla_array = parent::toArray($request);
        $socio_array = $this->socio;

        unset($taquilla_array['socio_id']);

        return array_merge($taquilla_array, [
            'socio' => $socio_array,
        ]);
    }
}
