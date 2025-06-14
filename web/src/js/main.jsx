import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// schedule-x
import '@schedule-x/theme-default/dist/index.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.min.css';

// notyf
import 'notyf/notyf.min.css';

// react-tooltip
import 'react-tooltip/dist/react-tooltip.css';

// css
import '@css/style.css';

// App
import App from '@js/App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
