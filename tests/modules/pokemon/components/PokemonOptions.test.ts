import { mount } from '@vue/test-utils';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';

const options = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' },
];

describe('<PokemonOptions />', () => {
  test('should render buttons with correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options: options,
        blockSelection: false,
        correctAnswer: 1,
      },
    });

    const buttons = wrapper.findAll('button');
    //espera que sea la misma cantidad de botones que de opciones
    expect(buttons.length).toBe(options.length);

    //recorre los botones con forEach saca los el objeto y el indice y compara el boton de la iteracion con la opcion evaluada en ese indice
    buttons.forEach((button, index) => {
      //evaluar que nadie le quita una clase importante para  nuestra aplicacion
      expect(button.attributes('class')).toBe(
        'capitalize disabled:shadow-none disabled:bg-gray-100',
      );
      expect(button.text()).toBe(options[index].name);
    });
  });

  test('should emint selectedOption when a button is clicked', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options: options,
        blockSelection: false,
        correctAnswer: 1,
      },
    });

    const [b1, b2, b3] = wrapper.findAll('button');
    await b1.trigger('click');
    await b2.trigger('click');
    await b3.trigger('click');

    expect(wrapper.emitted().selectedOption).toBeTruthy();
    expect(wrapper.emitted().selectedOption[0]).toEqual([1]);
    expect(wrapper.emitted().selectedOption[1]).toEqual([2]);
    expect(wrapper.emitted().selectedOption[2]).toEqual([3]);

  });
});
