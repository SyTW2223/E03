import { shallowMount } from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';
import Navbar from '../../components/Navbar.vue';

describe('Navbar', () => {
  it('se renderiza correctamente', () => {
    const wrapper = shallowMount(Navbar, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    // Verificar si el elemento navbar está presente
    expect(wrapper.find('.navbar').exists()).toBe(true);

    // Verificar si el elemento navbar-brand está presente
    expect(wrapper.find('.navbar-brand').exists()).toBe(true);

    // Verificar si el elemento img del logo está presente
    expect(wrapper.find('img').exists()).toBe(true);

    // Verificar si el texto del logo es correcto
    expect(wrapper.find('.navbar-brand').text()).toBe('MobTycoon');
  });
});
