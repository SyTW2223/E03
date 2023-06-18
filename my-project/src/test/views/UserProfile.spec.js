import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Navbar from '../../components/Navbar.vue';
import Publication from '../../components/Publication.vue';
import UserProfile from '../../views/UserProfile.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('UserProfile', () => {
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
            isAuth: true,
            message: '',
            findUser: null,
          },
          actions: {
            doGetUser: mockDispatch,
            sendPublication: mockDispatch,
          },
          getters: {
            findUser: () => ({
              username: 'usuario',
              followers: [],
              follows: [],
            }),
          },
        },
      },
    });

    wrapper = shallowMount(UserProfile, {
      localVue,
      router,
      store,
      components: {
        Navbar,
        Publication,
      },
      data() {
        return {
          newpublicationContent: '',
          showAlert: false,
          showEmptyAlert: false,
          userInfo: {
            username: 'usuario',
            followers: [],
            follows: [],
          },
        };
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renderiza el componente correctamente', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('muestra el componente Navbar', () => {
    const navbar = wrapper.findComponent(Navbar);
    expect(navbar.exists()).toBe(true);
  });

  it('se inicializa con los campos newpublicationContent, showAlert, showEmptyAlert y userInfo correctamente', () => {
    expect(wrapper.vm.newpublicationContent).toBe('');
    expect(wrapper.vm.showAlert).toBe(false);
    expect(wrapper.vm.showEmptyAlert).toBe(false);
    expect(wrapper.vm.userInfo).toEqual({
      username: 'usuario',
      followers: [],
      follows: [],
    });
  });

  it('muestra la información del usuario correctamente', () => {
    const username = wrapper.find('.card-title');
    const followers = wrapper.find('.card-text:nth-child(2)');
    const follows = wrapper.find('.card-text:nth-child(3)');

    expect(username.exists()).toBe(true);
    expect(username.text()).toBe('@usuario');
    expect(followers.exists()).toBe(true);
    expect(followers.text()).toBe('Seguidores 0');
    expect(follows.exists()).toBe(true);
    expect(follows.text()).toBe('Siguiendo 0');
  });

  it('envía una publicación correctamente', async () => {
    const mockSendPublication = jest.spyOn(wrapper.vm, 'createpublication');

    const form = wrapper.find('form');
    await form.trigger('submit');

    expect(mockSendPublication).toHaveBeenCalled();
  });
});
