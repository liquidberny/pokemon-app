import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import { mount } from '@vue/test-utils';


describe('<PokemonPicture/>', () => {
  test('should render the hidden image when showPokemon props is false', async () => {
		const pokemonId = 1;
    const wrapper = mount(PokemonPicture, {
			props: {
				pokemonId: pokemonId,
				showPokemon: false
			}
    });
		const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`

		const image = wrapper.find('img');
		console.log(image.attributes);

		const attributes = image.attributes();
		// expect(image.attributes('src')).toBe(imageSource);

		expect(attributes).toEqual(
			expect.objectContaining({
				class: "brightness-0 h-[200px]",
				src: imageSource,
			})
		)
  });

  test('should render the image when showPokemon props is true', async () => {
		const pokemonId = 1;
    const wrapper = mount(PokemonPicture, {
			props: {
				pokemonId: pokemonId,
				showPokemon: true
			}
    });
		const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
		console.log(wrapper.html())
		const image = wrapper.find('img');

		
		const attributes = image.attributes();
		// expect(image.attributes('src')).toBe(imageSource);

		expect(attributes).toEqual(
			expect.objectContaining({
				class: "h-[200px] fade-in",
				src: imageSource,
			})
		)
	});
});
