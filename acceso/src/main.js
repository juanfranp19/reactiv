import { createApp } from 'vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import router from '@router/router';
import App from './App.vue';
import './style.css';

createApp(App).use(router).mount('#app');
