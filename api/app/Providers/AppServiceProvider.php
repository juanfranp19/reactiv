<?php

namespace App\Providers;

use App\Models\Socio;
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

        Socio::observe(SocioObserver::class);
    }
}
