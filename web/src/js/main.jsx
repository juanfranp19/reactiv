import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.min.css';

// css
import '@css/style.css';

// App
import App from '@js/App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
