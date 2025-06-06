<template>
    <div class="card-menu">
        <div class="card-menu2">
            <!-- contenido que se encuentra dentro de <CardMenu> -->
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
/* https://uiverse.io/Tiagoadag/cuddly-catfish-6 */
.card-menu {
    width: 190px;
    height: 254px;
    background-image: linear-gradient(163deg, var(--verde) 0%, var(--azul) 100%);
    border-radius: 20px;
    transition: all .3s;
}

.card-menu2 {
    width: 190px;
    height: 254px;
    background-color: var(--oscuro);
    /* border-radius: 10px; */
    transition: all .2s;

    /* estilos para slot */
    color: var(--verde);
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-menu2:hover {
    transform: scale(0.98);
    border-radius: 20px;
}

.card-menu:hover {
    box-shadow: 0px 0px 30px 1px var(--verdeOscuro);
}
</style>
