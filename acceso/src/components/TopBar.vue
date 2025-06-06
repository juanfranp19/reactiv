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

<style scoped>
.top-bar {
    background-color: var(--rojo);
    text-align: center;
    height: 100px;    
}

.top-bar .logo-reactiv {
    width: 100px;
    padding: 10px;
}
</style>
