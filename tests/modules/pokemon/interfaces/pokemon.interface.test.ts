import type { Pokemon } from '@/modules/pokemon/interfaces';

describe('should', () => {
  const pokemon: Pokemon = { id: 1, name: 'bulbasaur' };

  test('should have an ID property of type number', () => {
    expect(pokemon.id).toEqual(expect.any(Number));
  });

	test('should have a name property of type String', () => {
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
