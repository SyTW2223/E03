import { shallowMount, createLocalVue } from '@vue/test-utils';
import Register from '../..//views/Register.vue';
import Navbar from '../..//components/Navbar.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('Register', () => {
  let wrapper;
  let router;
  let store;
  let mockDispatch;

  beforeEach(() => {
    router = new VueRouter();
    mockDispatch = jest.fn();

    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          state: {
            isAuth: false,
            message: '',
          },
          actions: {
            doRegister: mockDispatch,
          },
        },
      },
    });

    wrapper = shallowMount(Register, {
      localVue,
      router,
      store,
      components: {
        Navbar,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renderiza el componente', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('muestra el componente Navbar', () => {
    const navbar = wrapper.findComponent(Navbar);
    expect(navbar.exists()).toBe(true);
  });

  it('se inicializa con propiedades de datos vacías', () => {
    expect(wrapper.vm.name).toBe('');
    expect(wrapper.vm.username).toBe('');
    expect(wrapper.vm.email).toBe('');
    expect(wrapper.vm.isAuth).toBe('');
    expect(wrapper.vm.password).toBe('');
    expect(wrapper.vm.message).toBe('');
  });

  it('muestra un mensaje de error cuando el correo electrónico no es válido al enviar el formulario', async () => {
    wrapper.setData({ email: 'invalid-email' });
    await wrapper.vm.$nextTick();

    const form = wrapper.find('form');
    await form.trigger('submit');

    const errorMessage = wrapper.find('.alert-danger');

    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Por favor, complete todos los campos');
  });

});
