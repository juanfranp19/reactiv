<script setup>

import CardMenu from '@components/CardMenu.vue';

</script>

<template>
    <nav class="row menu">

        <div class="col-12 col-sm-6 menu-item">
            <RouterLink to="/acceder">
                <CardMenu>Acceder</CardMenu>
            </RouterLink>
        </div>

        <div class="col-12 col-sm-6 menu-item">
            <RouterLink to="/salir">
                <CardMenu>Salir</CardMenu>
            </RouterLink>
        </div>

    </nav>
</template>

<style scoped>
.menu-item {
    text-align: center;
    padding: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* estilos a partir de sm */
@media screen and (min-width: 576px) {

    .menu-item {
        padding: 90px;
    }
}

/* estilos a partir de lg */
@media screen and (min-width: 992px) {

    .menu-item {
        padding: 90px;
    }
}
</style>
