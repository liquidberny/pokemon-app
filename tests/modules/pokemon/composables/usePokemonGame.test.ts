import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import MockAdapter from 'axios-mock-adapter'
import { withSetup } from '../../../utils/with-setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { flushPromises } from '@vue/test-utils';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { pokemonListFake } from '../data/fake-pokemon';


const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake,
});

describe('usePokemonGame', () => {
  test('should initialize with the correct default values', async () => {
    const [results, app ] = withSetup(usePokemonGame);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);
    
    await flushPromises();
    
    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonOptions.value.length).toBe(4);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String)
    });

  });
});
