<template>
    <section v-if="false" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h2 class="animate-pulse">Cargando Pokémons...</h2>
    </section>
    <section class="flex flex-col justify-center items-center w-screen h-screen">
        <h1>Quien es este Pokémon?</h1>

        <!-- Pokemon Picture -->
        <PokemonPicture/>
        <!-- Pokemon Options -->

    </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';


</script>

