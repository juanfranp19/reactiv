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
        $seguimientos_array = $this->seguimientos;
        $rutinas_array = $this->rutinas;
        $productos_array = $this->productos;
        $tarifas_array = $this->tarifas;

        unset($socio_array['user_id']);

        return array_merge($socio_array, [
            'productos' => $productos_array,
            'tarifas' => $tarifas_array,
            'accesos' => $accesos_array,
            'taquilla' => $taquilla_array,
            'user' => $user_array,
            'seguimientos' => $seguimientos_array,
            'rutinas' => $rutinas_array,
        ]);
    }
}
