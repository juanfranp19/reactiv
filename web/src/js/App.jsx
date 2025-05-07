import { Routes, Route } from 'react-router-dom';

import CrearSocio from '@pages/CrearSocio';
import Error from '@pages/Error';
import Home from '@pages/Home';
import Login from '@pages/Login';

import PermissionProvider from '@providers/PermissionProvider';
import TokenProvider from '@providers/TokenProvider';

import EntrenadorRoutes from '@routes/EntrenadorRoutes';
import ProtectedRoutes from '@routes/ProtectedRoutes';

const App = () => {

    return (
        <div className='container-fluid'>
            <TokenProvider>
            <PermissionProvider>
                <Routes>
                    
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    
                    <Route element={<ProtectedRoutes />}>

                        <Route path='/error' element={<Error />} />

                        <Route element={<EntrenadorRoutes />}>
                            <Route path='/crear' element={<CrearSocio />} />
                        </Route>


                    </Route>

                </Routes>
            </PermissionProvider>
            </TokenProvider>
        </div>
    );
}

export default App;
