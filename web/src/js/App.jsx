import { Routes, Route } from 'react-router-dom';

import Home from '@pages/Home';
import Login from '@pages/Login';
import Error from '@pages/Error';
import ProtectedRoutes from './routes/ProtectedRoutes';

const App = () => {

    return (
        <div className='container-fluid'>

            

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route 
                    path='/error' 
                    element={
                        <ProtectedRoutes>
                            <Error />
                        </ProtectedRoutes>
                    } 
                />
            </Routes>

        </div>
    );
}

export default App;
