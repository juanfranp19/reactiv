<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EntrenadorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $entrenador_array = parent::toArray($request);
        $user_array = $this->user;

        unset($entrenador_array['user_id']);

        return array_merge($entrenador_array, [
            'user' => $user_array,
        ]);
    }
}
