import { createRouter, createWebHistory } from 'vue-router';

import AccederView from '@views/AccederView.vue';
import HasAccedidoView from '@views/HasAccedidoView.vue';
import HasSalidoView from '@views/HasSalidoView.vue';
import HomeView from '@views/HomeView.vue';
import SalirView from '@views/SalirView.vue';

const routes = [
    // vistas
    { path: '/', component: HomeView },
    { path: '/acceder', component: AccederView },
    { path: '/salir', component: SalirView },

    { path: '/has-accedido', component: HasAccedidoView },
    { path: '/has-salido', component: HasSalidoView },

    // redirige a Home si la ruta no está definida
    { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
