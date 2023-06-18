import { shallowMount, createLocalVue } from '@vue/test-utils';
import HomeLogin from '../../views/HomeLogin.vue';
import Navbar from '../../components/Navbar.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe('HomeLogin', () => {
  let wrapper;
  let router;
  let store;
  let mockDispatch;

  beforeEach(() => {
    router = new VueRouter();
    mockDispatch = jest.fn();

    store = new Vuex.Store({
      state: {},
    });

    // Registro dinámico del módulo "auth"
    store.registerModule('auth', {
      namespaced: true,
      state: {
        user: {
          username: 'testuser',
        },
      },
      actions: {
        doLogout: mockDispatch,
      },
    });

    wrapper = shallowMount(HomeLogin, {
      localVue,
      router,
      store,
      components: {
        Navbar
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('muestra el nombre de usuario correcto en la barra de navegación', async () => {
    await wrapper.vm.$nextTick();

    const navItem = wrapper.find('.nav-item');
    const username = navItem.find('p');

    expect(username.exists()).toBe(true);
    expect(username.text()).toBe('@testuser');
  });

  it('renderiza el componente Navbar', () => {
    const navbar = wrapper.findComponent(Navbar);
    expect(navbar.exists()).toBe(true);
  });

  it('comienza con la barra lateral inactiva', () => {
    expect(wrapper.vm.sidebarActive).toBe(false);
  });

  it('alterna la barra lateral cuando se llama al método toggleSidebar', () => {
    wrapper.vm.toggleSidebar();
    expect(wrapper.vm.sidebarActive).toBe(true);
  });
});
