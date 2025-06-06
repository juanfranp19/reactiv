<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import ButtonAccederSalir from '@components/ButtonAccederSalir.vue';

import usePostAcceso from '@hooks/usePostAcceso';
import usePutAcceso from '@hooks/usePutAcceso';

defineProps({
    tipo: String,
});

const router = useRouter();

const { crearAcceso, cargando: cargandoCrearAcceso } = usePostAcceso();
const { actualizarAcceso, cargando: cargandoActualizarAcceso } = usePutAcceso();

const cod_acceso = ref('');

function obtenerFechaHoraActual() {

    const ahora = new Date();

    // fecha y hora actual por partes
    const dia = ahora.getDate();
    const mes = ahora.getMonth() + 1;
    const anio = ahora.getFullYear();
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();

    // formato YYYY-MM-DD HH:MM:SS
    const fechaHoraActual = `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

    console.log(ahora);
    console.log(fechaHoraActual);

    return fechaHoraActual;
}

// función que crea el acceso
async function acceder() {

    // pasa a objeto JSON la fecha y hora actual desde la función 
    // y el cod_acceso definido en el input
    const datos = JSON.stringify({
        hora_entrada: obtenerFechaHoraActual(),
        cod_acceso: cod_acceso.value
    });

    // función crear acceso del hook
    const respuesta = await crearAcceso(datos);

    console.log(datos);

    if (respuesta) {

        // vacía el input si se ha creado el acceso
        cod_acceso.value = '';
        // redirige a la ruta con el mensaje
        router.push('/has-accedido');
    }
}

// función que actualiza el acceso
async function salir() {
    
    // pasa a objeto JSON la fecha y hora actual desde la función 
    // y el cod_acceso definido en el input
    const datos = JSON.stringify({
        hora_salida: obtenerFechaHoraActual(),
        cod_acceso: cod_acceso.value
    });

    // función actualizar acceso del hook
    const respuesta = await actualizarAcceso(datos);

    console.log(datos);

    if (respuesta) {

        // vacía el input si se ha actualizado el acceso
        cod_acceso.value = '';
        // redirige a la ruta con el mensaje
        router.push('/has-salido');
    }
}
</script>

<template>
    <form class="col-12 form-acceso">
        <div class="row">

            <!-- input -->
            <div class="col-12 campo">
                <input 
                    id="cod_acceso"
                    class="col-12 form-control form-control-lg"
                    v-model="cod_acceso"
                    type="text"
                    placeholder="Código de acceso">
            </div>

            <!-- botón -->
            <div class="col-12 boton">
                <ButtonAccederSalir
                    v-if="tipo === 'acceso'" 
                    titulo="Acceder"
                    type="button"
                    @click="acceder"
                    :disabled="!cod_acceso.trim()"
                />

                <!--
                    :disabled="!cod_acceso.trim()"
                    deshabilita el botón si el input está vacío
                -->

                <ButtonAccederSalir 
                    v-if="tipo === 'salida'"
                    titulo="Salir"
                    type="button"
                    @click="salir"
                    :disabled="!cod_acceso.trim()"
                />
            </div>

        </div>
    </form>
</template>

<style scoped>
.form-acceso .campo {
    padding: 20px 20px 50px 20px;
}

.form-acceso .boton {

    /* para que se vaya al centro */
    display: flex;
    justify-content: center;
}
</style>
