<?php

namespace App\Providers;

use App\Models\Acceso;
use App\Models\Calentamiento;
use App\Models\Ejercicio;
use App\Models\Entrenador;
use App\Models\Producto;
use App\Models\Rutina;
use App\Models\Seguimiento;
use App\Models\Socio;
use App\Models\User;
use App\Observers\AccesoObserver;
use App\Observers\CalentamientoObserver;
use App\Observers\EjercicioObserver;
use App\Observers\EntrenadorObserver;
use App\Observers\ProductoObserver;
use App\Observers\RutinaObserver;
use App\Observers\SeguimientoObserver;
use App\Observers\SocioObserver;
use App\Observers\UserObserver;
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
        // observadores

        Acceso::observe(AccesoObserver::class);
        Calentamiento::observe(CalentamientoObserver::class);
        Ejercicio::observe(EjercicioObserver::class);
        Entrenador::observe(EntrenadorObserver::class);
        Producto::observe(ProductoObserver::class);
        Rutina::observe(RutinaObserver::class);
        Seguimiento::observe(SeguimientoObserver::class);
        Socio::observe(SocioObserver::class);
        User::observe(UserObserver::class);
    }
}
