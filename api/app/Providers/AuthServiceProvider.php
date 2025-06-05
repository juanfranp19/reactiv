<?php

namespace App\Providers;

use App\Models\Acceso;
use App\Models\Calentamiento;
use App\Models\CalentamientoRutina;
use App\Models\CalentamientoSeguimiento;
use App\Models\Ejercicio;
use App\Models\EjercicioRutina;
use App\Models\EjercicioSeguimiento;
use App\Models\Entrenador;
use App\Models\GrupoMuscular;
use App\Models\Producto;
use App\Models\ProductoSocio;
use App\Models\Rutina;
use App\Models\Seguimiento;
use App\Models\Socio;
use App\Models\SocioTarifa;
use App\Models\Taquilla;
use App\Models\Tarifa;
use App\Models\User;
use App\Policies\AccesoPolicy;
use App\Policies\CalentamientoPolicy;
use App\Policies\CalentamientoRutinaPolicy;
use App\Policies\CalentamientoSeguimientoPolicy;
use App\Policies\EjercicioPolicy;
use App\Policies\EjercicioRutinaPolicy;
use App\Policies\EjercicioSeguimientoPolicy;
use App\Policies\EntrenadorPolicy;
use App\Policies\GrupoMuscularPolicy;
use App\Policies\ProductoPolicy;
use App\Policies\ProductoSocioPolicy;
use App\Policies\RutinaPolicy;
use App\Policies\SeguimientoPolicy;
use App\Policies\SocioPolicy;
use App\Policies\SocioTarifaPolicy;
use App\Policies\TaquillaPolicy;
use App\Policies\TarifaPolicy;
use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
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

        Gate::define('isSocio', function (User $user) {

            // devuelve true si el id de $user se encuentra entre los user_id de socios
            return Socio::where('user_id', $user->id)->exists();
        });

        Gate::define('isEntrenador', function (User $user) {

            // devuelve true si el id de $user se encuentra entre los user_id de entrenadores
            return Entrenador::where('user_id', $user->id)->exists();
        });

        Gate::define('isAdmin', function (User $user) {

            // devuelve true si el id de $user se encuentra entre los user_id de entrenadores
            // y además es admin
            return Entrenador::where('user_id', $user->id)
                ->where('admin', 1)
                ->exists();
        });

        // policies

        Gate::policy(Acceso::class, AccesoPolicy::class);
        Gate::policy(Calentamiento::class, CalentamientoPolicy::class);
        Gate::policy(CalentamientoRutina::class, CalentamientoRutinaPolicy::class);
        Gate::policy(CalentamientoSeguimiento::class, CalentamientoSeguimientoPolicy::class);
        Gate::policy(Ejercicio::class, EjercicioPolicy::class);
        Gate::policy(EjercicioRutina::class, EjercicioRutinaPolicy::class);
        Gate::policy(EjercicioSeguimiento::class, EjercicioSeguimientoPolicy::class);
        Gate::policy(Entrenador::class, EntrenadorPolicy::class);
        Gate::policy(GrupoMuscular::class, GrupoMuscularPolicy::class);
        Gate::policy(Producto::class, ProductoPolicy::class);
        Gate::policy(ProductoSocio::class, ProductoSocioPolicy::class);
        Gate::policy(Rutina::class, RutinaPolicy::class);
        Gate::policy(Seguimiento::class, SeguimientoPolicy::class);
        Gate::policy(Socio::class, SocioPolicy::class);
        Gate::policy(SocioTarifa::class, SocioTarifaPolicy::class);
        Gate::policy(Taquilla::class, TaquillaPolicy::class);
        Gate::policy(Tarifa::class, TarifaPolicy::class);
        Gate::policy(User::class, UserPolicy::class);
    }
}
