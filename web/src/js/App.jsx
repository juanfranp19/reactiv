import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import NavBar from '@components/common/Navbar/Navbar';

import Dashboard from '@pages/Dashboard';
import EntrenadorEntrenadorCrear from '@pages/EntrenadorEntrenadorCrear';
import EntrenadorEntrenadores from '@pages/EntrenadorEntrenadores';
import EntrenadorSocioCrear from '@pages/EntrenadorSocioCrear';
import EntrenadorSocioDetalles from '@pages/EntrenadorSocioDetalles';
import EntrenadorSocios from '@pages/EntrenadorSocios';
import Error from '@pages/Error';
import Home from '@pages/Home';
import Login from '@pages/Login';
import SocioAccesos from '@pages/SocioAccesos';
import SocioCodigoAcceso from '@pages/SocioCodigoAcceso';
import SocioProductos from '@pages/SocioProductos';
import SocioRutinaAddCalentamiento from '@pages/SocioRutinaAddCalentamiento';
import SocioRutinaAddEjercicio from '@pages/SocioRutinaAddEjercicio';
import SocioRutinaCrear from '@pages/SocioRutinaCrear';
import SocioRutinaDetalles from '@pages/SocioRutinaDetalles';
import SocioRutinas from '@pages/SocioRutinas';
import SocioSeguimiento from '@pages/SocioSeguimiento';
import SocioSeguimientoCrear from '@pages/SocioSeguimientoCrear';
import SocioSeguimientoDetalles from '@pages/SocioSeguimientoDetalles';
import SocioTaquilla from '@pages/SocioTaquilla';
import SocioTarifa from '@pages/SocioTarifa';

import PermissionProvider from '@providers/PermissionProvider';
import TokenProvider from '@providers/TokenProvider';

import EntrenadorRoutes from '@routes/EntrenadorRoutes';
import ProtectedRoutes from '@routes/ProtectedRoutes';
import SocioRoutes from '@routes/SocioRoutes';

const App = () => {

    const location = useLocation();

    // rutas que no incluyen navbar arriba del todo de la página
    const noNavbar = ['/', '/login'];
    // true si la ruta se encuentra en el array
    const esconderNavbar = noNavbar.includes(location.pathname);

    return (
        <div className='container-fluid'>
            <TokenProvider>
            <PermissionProvider>

                {
                    //si está en una ruta que sí permite Navbar, lo muestra
                    !esconderNavbar && <NavBar />
                }

                <Routes>
                    {/* rutas que tiene acceso cualquier persona */}
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />

                    <Route element={<ProtectedRoutes />}>
                        {/* rutas que tienen acceso usuarios autenticados */}
                        <Route path='/error' element={<Error />} />
                        <Route path='/dashboard' element={<Dashboard />} />

                        <Route element={<EntrenadorRoutes />}>
                        {/* rutas que tienen acceso solo los admins */}
                        <Route path='/dashboard/entrenadores/crear' element={<EntrenadorEntrenadorCrear />} />

                        </Route>
                        <Route element={<EntrenadorRoutes />}>
                            {/* rutas que tienen acceso solo los entrenadores */}
                            <Route path='/dashboard/entrenadores' element={<EntrenadorEntrenadores />} />
                            <Route path='/dashboard/socios' element={<EntrenadorSocios />} />
                            <Route path='/dashboard/socios/crear' element={<EntrenadorSocioCrear />} />
                            <Route path='/dashboard/socios/detalles/:socioId' element={<EntrenadorSocioDetalles />} />

                        </Route>
                        <Route element={<SocioRoutes />}>
                            {/* rutas que tienen acceso solo los socios */}

                            <Route path='/dashboard/tus-accesos' element={<SocioAccesos />} />

                            <Route path='/dashboard/codigo-acceso' element={<SocioCodigoAcceso />} />

                            <Route path='/dashboard/tus-productos' element={<SocioProductos />} />

                            <Route path='/dashboard/tus-rutinas' element={<SocioRutinas />} />
                            <Route path='/dashboard/tus-rutinas/crear' element={<SocioRutinaCrear />} />
                            <Route path='/dashboard/tus-rutinas/rutina/:rutaIdRutina' element={<SocioRutinaDetalles />} />
                            <Route path='/dashboard/tus-rutinas/rutina/:rutaIdRutina/add-calentamiento' element={<SocioRutinaAddCalentamiento />} />
                            <Route path='/dashboard/tus-rutinas/rutina/:rutaIdRutina/add-ejercicio' element={<SocioRutinaAddEjercicio />} />
                            
                            <Route path='/dashboard/seguimiento' element={<SocioSeguimiento />} />
                            <Route path='/dashboard/seguimiento/crear' element={<SocioSeguimientoCrear />} />
                            <Route path='/dashboard/seguimiento/:rutaIdSeguimiento' element={<SocioSeguimientoDetalles />} />
                            <Route path='/dashboard/seguimiento/:rutaIdSeguimiento/rutina/:rutaIdRutina' element={<SocioRutinaDetalles />} />

                            <Route path='/dashboard/tu-taquilla' element={<SocioTaquilla />} />

                            <Route path='/dashboard/tu-tarifa' element={<SocioTarifa />} />
                        </Route>
                    </Route>

                    <Route path='/*' element={<Navigate to='/dashboard' />} />
                </Routes>
                    
            </PermissionProvider>
            </TokenProvider>
        </div>
    );
}

export default App;
