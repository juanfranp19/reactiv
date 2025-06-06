<script setup>

import ButtonRespuesta from '@components/ButtonRespuesta.vue';

const WEB_URL = import.meta.env.VITE_WEB_URL;

</script>

<template>
    <div class="row">
        <div class="card-respuesta-flex">

            <div class="card-respuesta">
                <div class="row">

                    <div class="col-12 titulo michroma-regular">
                        <!-- contenido que se encuentra dentro de la etiqueta -->
                        <slot></slot>
                    </div>

                    <!-- botón para volver al menú -->
                    <div class="col-12">
                        <RouterLink to="/">
                            <ButtonRespuesta titulo="Volver al Menú" />
                        </RouterLink>
                    </div>

                    <!-- botón para volver al dashboard -->
                    <div class="col-12">
                        <a :href="WEB_URL" target="_self">
                            <ButtonRespuesta titulo="Volver al Dashboard" />
                        </a>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.card-respuesta-flex {
    margin-top: 50px;
    padding: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-respuesta {
    width: 450px;
    height: 350px;
    border: none;
    border-radius: 10px;

    text-align: center;
}

.card-respuesta .titulo {
    font-size: 30px;
    padding: 50px 10px;
    font-weight: bold;
}

.card-respuesta button {
    margin: 15px 0;
}

/* estilos a partir de sm */
@media screen and (min-width: 576px) {

    .card-respuesta {
        background-color: var(--verde);
        box-shadow: 0px 0px 10px 1px var(--oscuro);
    }

    .card-respuesta .titulo {
        font-weight: normal;
    }
}
</style>
