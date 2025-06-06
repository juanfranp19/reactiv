<?php

namespace App\Providers;

use App\Models\Acceso;
use App\Models\Rutina;
use App\Models\Seguimiento;
use App\Models\Socio;
use App\Observers\AccesoObserver;
use App\Observers\RutinaObserver;
use App\Observers\SeguimientoObserver;
use App\Observers\SocioObserver;
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
        Rutina::observe(RutinaObserver::class);
        Seguimiento::observe(SeguimientoObserver::class);
        Socio::observe(SocioObserver::class);
    }
}
