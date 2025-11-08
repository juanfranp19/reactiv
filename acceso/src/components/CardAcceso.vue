<script setup>

import ButtonBack from '@components/ButtonBack.vue';
import FormAcceso from '@components/FormAcceso.vue';

defineProps({
    tipo: String, // acceso, salida
});

</script>

<template>
    <div class="row">
        <div class="acceso-card-flex">

            <div class="row acceso-card">
                
                <div class="col-12 titulo-card audiowide-regular" v-if="tipo === 'acceso'">
                    Acceder
                </div>

                <div class="col-12 titulo-card audiowide-regular" v-if="tipo === 'salida'">
                    Salir
                </div>

                <ButtonBack />
                <FormAcceso :tipo="tipo" />
            </div>

        </div>
    </div>
</template>

<style scoped>
.acceso-card-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.acceso-card {
    text-align: center;
    border-radius: 10px;
    max-width: 500px;
    padding-top: 90px;
    opacity: 0.75;
}

.titulo-card {
    font-size: 50px;
}

@media screen and (min-width: 576px) {

    .acceso-card {
        margin: 20px;
        padding: 20px 30px 50px 50px;
        background-color: var(--azul);
    }
}
</style>
