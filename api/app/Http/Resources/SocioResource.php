<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SocioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $socio_array = parent::toArray($request);
        $accesos_array = $this->accesos;
        $taquilla_array = $this->taquilla;
        $user_array = $this->user;

        unset($socio_array['user_id']);

        return array_merge($socio_array, [
            'accesos' => $accesos_array,
            'taquilla' => $taquilla_array,
            'user' => $user_array,
        ]);
    }
}
