import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { mount } from '@vue/test-utils';
import type { Mock } from 'vitest';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const pokemonOptions = [
  {
    name: 'bulbasaur',
    id: 1,
  },
  {
    name: 'ivysaur',
    id: 2,
  },
  {
    name: 'venusaur',
    id: 3,
  },
  {
    name: 'charmander',
    id: 4,
  },
];

describe('<PokemonGame/>', () => {
  test('should initializae with default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: undefined,
      isLoading: true,
      randomPokemon: GameStatus.Playing,
      pokemonOptions: [],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    expect(wrapper.get('h1').text()).toBe('Espere por favor');
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);

    expect(wrapper.get('h2').text()).toBe('Cargando Pokémons...');
    expect(wrapper.get('h2').classes()).toEqual(['animate-pulse']);
  });

  test('should render <PokemonPicture/> and <PokemonOptions />', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: false,
      randomPokemon: pokemonOptions.at(0),
      pokemonOptions: pokemonOptions,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const imageURL =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';
    const pokemons = pokemonOptions.map((p) => p.name);

    expect(wrapper.find('img').attributes('src')).toBe(imageURL);

    const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100');
    expect(buttons).length(4);
    buttons.forEach((button) => {
      expect(pokemons).toContain(button.text());
    });
  });

  test('Should render button for a new game', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Won,
      isLoading: false,
      randomPokemon: pokemonOptions.at(0),
      pokemonOptions: pokemonOptions,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    const button = wrapper.find('[data-test-id="btn-new-game"]');
    expect(button.text()).toBe('Jugar de nuevo');
  });

  test('Should call the getNextRound function when the button is clicked', async () => {
    const spyNextRoundFn = vi.fn();

    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Won,
      isLoading: false,
      randomPokemon: pokemonOptions.at(0),
      pokemonOptions: pokemonOptions,
      checkAnswer: vi.fn(),
      getNextRound: spyNextRoundFn,
    });

    const wrapper = mount(PokemonGame);
    const button = wrapper.find('[data-test-id="btn-new-game"]');
    await button.trigger('click');

    expect(spyNextRoundFn).toHaveBeenCalled();
    expect(spyNextRoundFn).toHaveBeenCalledWith(4);
  });
});
