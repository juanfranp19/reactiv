<script setup>

import LogoReactiv from '@components/LogoReactiv.vue';

</script>

<template>
    <header class="row">
        <div class="col-12 top-bar">
            <LogoReactiv />
        </div>
    </header>
</template>

<!-- sin scoped porque se tocan estilos de otros componentes -->
<style>
.top-bar {
    background-color: var(--rojo);
    height: 100px;

    display: flex;
    justify-content: center; 
    align-items: center; 
}

.top-bar .logo-reactiv {
    width: 100px;
    padding: 10px;
}
</style>
