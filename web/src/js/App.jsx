import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import NavBar from '@components/common/Navbar/Navbar';

import CrearSocio from '@pages/CrearSocio';
import Dashboard from '@pages/Dashboard';
import Error from '@pages/Error';
import Home from '@pages/Home';
import Login from '@pages/Login';
import SocioRutinaAddCalentamiento from '@pages/SocioRutinaAddCalentamiento';
import SocioRutinaAddEjercicio from '@pages/SocioRutinaAddEjercicio';
import SocioRutinaCrear from '@pages/SocioRutinaCrear';
import SocioRutinaDetalles from '@pages/SocioRutinaDetalles';
import SocioRutinas from '@pages/SocioRutinas';

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
                            {/* rutas que tienen acceso solo los entrenadores */}
                            <Route path='/crear' element={<CrearSocio />} />

                        </Route>
                        <Route element={<SocioRoutes />}>
                            {/* rutas que tienen acceso solo los socios */}
                            <Route path='/dashboard/tus-rutinas' element={<SocioRutinas />} />
                            <Route path='/dashboard/tus-rutinas/crear' element={<SocioRutinaCrear />} />
                            <Route path='/dashboard/tus-rutinas/:rutaIdRutina' element={<SocioRutinaDetalles />} />
                            <Route path='/dashboard/tus-rutinas/:rutaIdRutina/add-calentamiento' element={<SocioRutinaAddCalentamiento />} />
                            <Route path='/dashboard/tus-rutinas/:rutaIdRutina/add-ejercicio' element={<SocioRutinaAddEjercicio />} />
                        </Route>
                    </Route>

                    <Route path='/*' element={<Navigate to='/' />} />
                </Routes>
                    
            </PermissionProvider>
            </TokenProvider>
        </div>
    );
}

export default App;
