<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user_array = parent::toArray($request);
        $socio_array = $this->socio;
        $entrenador_array = $this->entrenador;

        return array_merge($user_array, [
            'socio' => $socio_array,
            'entrenador' => $entrenador_array,
        ]);
    }
}
