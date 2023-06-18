import { shallowMount } from '@vue/test-utils';
import Home from '../../views/Home.vue';

describe('Home', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.setItem('token', 'sampleToken'); // Simular token en el almacenamiento local
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' })); // Simular usuario en el almacenamiento local

    wrapper = shallowMount(Home, {
      mocks: {
        $router: {
          push: jest.fn(),
        },
        $store: {
          state: {
            auth: {
              user: {
                username: 'testuser',
              },
            },
          },
          commit: jest.fn(),
        },
      },
    });
  });

  afterEach(() => {
    localStorage.clear(); // Limpiar el almacenamiento local después de cada prueba
    wrapper.destroy();
  });

  it('redirige a la página de inicio de sesión con el nombre de usuario correcto si hay un token en el almacenamiento local', () => {
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/homeLogin/testuser');
  });

  it('redirige a la página de inicio de sesión al hacer clic en el botón "Iniciar sesión"', () => {
    const loginButton = wrapper.find('.custom-button-login');
    loginButton.trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/login');
  });

  it('redirige a la página de registro al hacer clic en el botón "Registrarse"', () => {
    const registerButton = wrapper.find('.custom-button-register');
    registerButton.trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/register');
  });
});
