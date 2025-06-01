<?php

namespace App\Providers;

use App\Models\Entrenador;
use App\Models\Rutina;
use App\Models\Seguimiento;
use App\Models\Socio;
use App\Models\User;
use App\Observers\RutinaObserver;
use App\Observers\SeguimientoObserver;
use App\Observers\SocioObserver;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // gates

        Gate::define('isEntrenador', function (User $user) {

            // devuelve true si el id de $user se encuentra entre los user_id de entrenadores
            return Entrenador::where('user_id', $user->id)->exists();
        });

        Gate::define('isSocio', function (User $user) {

            // devuelve true si el id de $user se encuentra entre los user_id de socios
            return Socio::where('user_id', $user->id)->exists();
        });

        // observadores

        Rutina::observe(RutinaObserver::class);
        Seguimiento::observe(SeguimientoObserver::class);
        Socio::observe(SocioObserver::class);
    }
}
