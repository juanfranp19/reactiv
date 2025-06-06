<template>
    <RouterLink to="/">

        <button class="button-back">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-rewind" viewBox="0 0 16 16">
                <path d="M9.196 8 15 4.633v6.734zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696z" />
                <path d="M1.196 8 7 4.633v6.734zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696z" />
            </svg>
            
        </button>

    </RouterLink>
</template>

<style scoped>
/* https://uiverse.io/elijahgummer/sweet-rabbit-5 */
.button-back {
    font: inherit;
    background-color: transparent;
    border: 0;
    color: var(--oscuro);
    border-radius: 0.5em;
    font-size: 1.35rem;
    padding: 0.375em 1em;
    font-weight: 600;
    /* text-shadow: 0 0.0625em 0 #fff;
    box-shadow: inset 0 0.0625em 0 0 #f4f4f4, 0 0.0625em 0 0 #efefef,
      0 0.125em 0 0 #ececec, 0 0.25em 0 0 #e0e0e0, 0 0.3125em 0 0 #dedede,
      0 0.375em 0 0 #dcdcdc, 0 0.425em 0 0 #cacaca, 0 0.425em 0.5em 0 #cecece; */
    transition: 0.15s ease;
    cursor: pointer;
}

.button-back:hover {
    translate: 0 0.125em;
}

.button-back:active {
    translate: 0 0.325em;
}
</style>
