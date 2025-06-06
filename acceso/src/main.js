import { createApp } from 'vue';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// notyf
import 'notyf/notyf.min.css';

import router from '@router/router';
import App from './App.vue';
import './style.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
