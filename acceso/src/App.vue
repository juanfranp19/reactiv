<script setup>
import Footer from '@components/Footer.vue';
import TopBar from '@components/TopBar.vue';
</script>

<template>
    <div class="container-fluid ">

        <TopBar />

        <RouterView />

        <Footer />

    </div>
</template>
