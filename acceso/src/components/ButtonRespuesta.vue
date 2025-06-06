<script setup>

defineProps({
    titulo: String,
});

</script>

<template>
    <button class="button-respuesta">{{ titulo }}</button>
</template>

<style scoped>
/* https://uiverse.io/cssbuttons-io/friendly-dragon-76 */
.button-respuesta {
    position: relative;
    font-size: 17px;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1em 2.5em;
    display: inline-block;
    cursor: pointer;
    border-radius: 6em;
    transition: all 0.2s;
    border: none;
    font-family: inherit;
    font-weight: 500;
    color: black;
    background-color: white;
}

.button-respuesta:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.button-respuesta:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.button-respuesta::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.4s;
}

.button-respuesta::after {
    background-color: #fff;
}

.button-respuesta:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
}
</style>
