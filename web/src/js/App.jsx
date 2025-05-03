import { Routes, Route } from 'react-router-dom';

import CrearSocio from '@pages/CrearSocio';
import Error from '@pages/Error';
import Home from '@pages/Home';
import Login from '@pages/Login';

import TokenProvider from '@providers/TokenProvider';
import ProtectedRoutes from '@routes/ProtectedRoutes';

const App = () => {

    return (
        <div className='container-fluid'>
            <TokenProvider>

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/crear' element={<CrearSocio />} />
                    
                    <Route element={<ProtectedRoutes />}>
                        <Route path='/error' element={<Error />} />
                    </Route>
                </Routes>

            </TokenProvider>
        </div>
    );
}

export default App;
