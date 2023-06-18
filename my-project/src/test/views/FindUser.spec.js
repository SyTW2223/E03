import { createLocalVue, shallowMount } from '@vue/test-utils';
import FindUser from '../..//views/FindUser.vue';

// Crea una instancia local de Vue
const localVue = createLocalVue();

describe('FindUser', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(FindUser, {
      localVue,
      mocks: {
        $route: {
          params: {
            userfind: 'exampleUser',
            username: 'loggedInUser',
          },
        },
        $store: {
          state: {
            auth: {
              findUser: {
                username: 'exampleUser',
                follows: [],
                followers: [],
              },
              message: {
                error: null,
                message: 'Mensaje de éxito',
              },
            },
          },
          dispatch: jest.fn(),
          commit: jest.fn(),
        },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renderiza la información del perfil correctamente', () => {
    expect(wrapper.find('.card-title').text()).toBe('@');
    expect(wrapper.find('.card-text.seguidores').text()).toContain('Seguidores 0');
    expect(wrapper.find('.card-text.siguiendo').text()).toContain('Siguiendo 0');
  });

  it('muestra el botón de seguir correctamente', () => {
    const followButton = wrapper.find('button');
    expect(followButton.text()).toBe('Seguir');
    expect(wrapper.vm.checkFollow).toBe(false);
  });

  it('muestra el botón de siguiendo correctamente', async () => {
    wrapper.setData({ checkFollow: true });
    await wrapper.vm.$nextTick();
    const followButton = wrapper.find('button');
    expect(followButton.text()).toBe('Siguiendo');
    expect(wrapper.vm.checkFollow).toBe(true);
  });

  it('sigue a un usuario al hacer clic en el botón', async () => {
    const followButton = wrapper.find('button');
    followButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.checkFollow).toBe(true);
  });

  it('deja de seguir a un usuario al hacer clic en el botón', async () => {
    wrapper.setData({ checkFollow: true });
    await wrapper.vm.$nextTick();
    const followButton = wrapper.find('button');
    followButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.checkFollow).toBe(false);
    
  });

  it('muestra el mensaje de éxito al seguir a un usuario', async () => {
    const followButton = wrapper.find('button');
    followButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.message.message).toBe('Mensaje de éxito');
  });

  it('muestra el mensaje de error al seguir a un usuario', async () => {
    wrapper.setData({
      $store: {
        state: {
          auth: {
            message: {
              error: 'Mensaje de error',
              message: null,
            },
          },
        },
      },
    });
    const followButton = wrapper.find('button');
    followButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.message.error).toBe('Mensaje de error');
  });
});
