<template>
    <footer className="row">
        <div className="col-12 licencia">

            <!-- licencia generada en https://creativecommons.org/chooser/ -->
            <a href="https://github.com/juanfranp19/reactiv">Reactiv</a> © 2025 by <a href="https://github.com/juanfranp19">Juan Francisco Pagán</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" /><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" /><img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" />

        </div>
    </footer>
</template>

<style scoped>
footer {
    background-color: rgb(97, 97, 97);

    width: 100%;
    height: 100px;

    /* para que se posiciona abajo del todo */
    position: absolute;
    bottom: 0;

    .licencia {
        text-align: center;
        margin-bottom: 10px;

        /* para que se posiciona abajo del todo */
        position: absolute;
        bottom: 0;
    }

    &, a {
        color: aliceblue;
        text-decoration: underline;

        a:hover {
            color: rgb(255, 138, 138);
        }
    }

    /* estilos definidos por el generador de la licencia */
    img {
        max-width: 1em;
        max-height: 1em;
        margin-left: .2em;
    }
}
</style>
