<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h2 class="animate-pulse">Cargando Pokémons...</h2>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">Quien es este Pokémon?</h1>
    <button
      v-if="gameStatus !== GameStatus.Playing"
      @click="getNextRound(4)"
      class="bg-blue-100 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
      data-test-id="btn-new-game"
    >
      Jugar de nuevo
    </button>

    <!-- Pokemon Picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!-- Pokemon Options -->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon.id"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  gameStatus,
  isLoading,
  randomPokemon,
  pokemonOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame();
</script>
