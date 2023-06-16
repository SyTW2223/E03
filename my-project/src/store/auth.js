import axios from 'axios'; 
import Vue from 'vue';
import Vuex from 'vuex'; 
import router from '../router/index';

// Usamos Vuex
Vue.use(Vuex)


// Creamos una nueva instancia de Vuex.Store
export default {
  namespaced: true,

  // Definimos el estado inicial de la aplicación
state: {
    message: "", // para almacenar los mensajes del servidor
    email: "", // para almacenar el correo electrónico del usuario
    password: "", // para almacenar la contraseña del usuario
    user: "", // para almacenar la información del usuario actual
    following: "", // para almacenar la información de los usuarios seguidos
    findUser: {}, // para almacenar la información del usuario buscado
    usernames: [], // para almacenar los nombres de usuario
    publications: {}, // para almacenar las publicaciones de un usuario
    allPublications: {}, // para almacenar todas las publicaciones
    isAuth: localStorage.getItem('token') ? true : false, // para indicar si el usuario está autenticado
    token: localStorage.getItem('token') ? localStorage.getItem('token') : undefined, // para almacenar el token de autenticación
  },
  // Definimos las mutaciones que se utilizarán para actualizar el estado
  mutations: {
    setEmail(state, email) {
      state.email = email // actualizamos el correo electrónico
    },
    setPassword(state, password) {
      state.password = password // actualizamos la contraseña
    },
    setName(state, name) {
      state.name = name // actualizamos la contraseña
    },
    setUsernames(state, usernames) {
      state.usernames = usernames // actualizamos la contraseña
    },
    setIsAuth(state, isAuth) {
      state.isAuth = isAuth // actualizamos el estado
    },
    setUser(state, user) {
      state.user = user; // Actualiza el estado con la información del usuario
    },
    setFindUser(state, findUser) {
      state.findUser = findUser; // Actualiza el estado con la información del usuario
    },
    setFollowing(state, following) {
      state.following = following; // Actualiza el estado con la información del usuario
    },
    setMessage(state, message) {
      state.message = message // actualizamos el mensaje del servidor
    },
    setPublications(state, publications) {
      state.publications = publications; // actualizamos las publicaciones de un usuario
    },
    setAllPublications(state, allPublications) {
      state.allPublications = allPublications; // actualizamos todas las publicaciones
    },
    resetState(state) {
      // Restablecer el estado al valor inicial
      state.message = "";
      state.email = "";
      state.password = "";
      state.user = "";
      state.findUser = "";
      state.isAuth = false;
    },
  },
  // Definimos las acciones que se utilizarán para actualizar el estado
  actions: {
    async doLogin({ commit }, credentials) {
      try {
        // Enviamos una solicitud POST a la URL de inicio de sesión utilizando axios
        const response = await axios.post('http://localhost:8080/api/login', {
          // pasamos el correo electrónico almacenado en el estado
          email: credentials.email,
          // pasamos la contraseña almacenada en el estado
          password: credentials.password
        })

        // Si la solicitud es exitosa, actualizamos el estado con la respuesta del servidor y registramos la respuesta en la consola
        const userInfo = response.data.user
        const data = response.data.message

        commit('setUser', userInfo)

        // actualizamos el mensaje del servidor
        commit('setMessage', data)

        // actualizamos el estado de autenticación a true
        commit('setIsAuth', true)

        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(userInfo));

      } catch (error) {
        // Si la solicitud falla, actualizamos el estado con el mensaje de error y registramos el mensaje en la consola
        // actualizamos el mensaje del servidor
        commit('setMessage', JSON.parse(error.response.request.responseText).error)
        // Actualizamos IsAuth
        commit('setIsAuth', false)
      }
    },
    async doLogout({ commit }) {
      // Restablecer el estado al valor inicial y borrar el token del LocalStorage
      localStorage.removeItem('token');
      commit('resetState');
      // localStorage.removeItem('user');
      // Redirigimos al usuario a Home
      router.push('/');
    },
    async doRegister({ commit }, credentials) {
      try {
        // Enviamos una solicitud POST a la URL de inicio de sesión utilizando axios
        const response = await axios.post('http://localhost:8080/api/register', {
          // pasamos el correo electrónico almacenado en el estado
          email: credentials.email,
          // pasamos la contraseña almacenada en el estado
          password: credentials.password,
          // pasamos el nombre almacenado en el estado
          username: credentials.username,
          // Pasamos el nombre
          name: credentials.name
        })
        // Si la solicitud es exitosa, actualizamos el estado con la respuesta del servidor y registramos la respuesta en la consola
        const data = response.data.message 
        // actualizamos el mensaje del servidor
        commit('setMessage', data)
        // Actualizamos IsAuth
        commit('setIsAuth', true)
      } catch (error) {
        // Si la solicitud falla, actualizamos el estado con el mensaje de error y registramos el mensaje en la consola
        // actualizamos el mensaje del servidor
        commit('setMessage', JSON.parse(error.response.request.responseText).error)
        // Actualizamos IsAuth
        commit('setIsAuth', false)
      }
    },
    async sendPublication({ commit, state }, message) {
      // Verificar si el usuario está autenticado
      if (state.isAuth) {
        console.log(state.findUser)
        try {
          // Enviar una solicitud POST para publicar un mensaje
          const response = await axios.post('http://localhost:8080/api/publication', {
            // Obtener el nombre de usuario del estado
            username: state.findUser.username, 
            // Pasar el mensaje como parámetro
            message: message 
          }, {
            headers: {
              // Agregar el token de autenticación en los encabezados de la solicitud
              authorization: 'Bearer ' + state.token 
            }
          })
          commit('setMessage', response)
        } catch (error) {
          commit('setMessage', error)
        }
      }
    },
    async doSearchUser({ commit, state }, usernameSearch) {
      // Verificar si el usuario está autenticado
      if (state.isAuth) {
        try {
          // Realizar una solicitud GET para buscar usuarios
          const response = await axios.get(`http://localhost:8080/api/searchUser/${usernameSearch}`, {
            headers: {
              // Agregar el token de autenticación en los encabezados de la solicitud
              authorization: 'Bearer ' + state.token
            }
          });
          // Obtener los nombres de usuario de la respuesta
          const usernames = response.data.username;

          // Actualizar el estado con los nombres de usuario obtenidos
          commit('setUsernames', usernames);

          commit('setMessage', response)
        } catch (error) {
          commit('setMessage', error)
        }
      }
    },
    async doGetUser({ commit, state }, username) {
      // Verificar si el usuario está autenticado
      if (state.isAuth) {
        try {
          // Realizar una solicitud GET para obtener información del usuario
          const response = await axios.get(`http://localhost:8080/api/getUser/${username}`, {
            headers: {
              // Agregar el token de autenticación en los encabezados de la solicitud
              authorization: 'Bearer ' + state.token 
            }
          });
          // Obtener el usuario de la respuesta
          const user = response.data.user; 

          // Actualizar el estado con el usuario obtenido
          commit('setFindUser', user);
        } catch (error) {
          // Actualizar el estado con el mensaje de error obtenido de la respuesta
          commit('setMessage', JSON.parse(error.response.request.responseText).error); 
        }
      }
    },
    // Realiza una solicitud asincrónica para obtener las publicaciones de un usuario
    async doPublications({ commit, state }, username) {
      if (state.isAuth) {
        try {
          // Realiza una solicitud GET para obtener las publicaciones del usuario
          const response = await axios.get(`http://localhost:8080/api/getPublications/${username}`, {
            headers: {
              authorization: 'Bearer ' + state.token
            }
          });

          // Obtiene las publicaciones de la respuesta
          const publications = response.data.publications;

          // Actualiza el estado con las publicaciones obtenidas
          commit('setPublications', publications);
        } catch (error) {
          // Captura y maneja cualquier error de la solicitud
          commit('setMessage', JSON.parse(error.response.request.responseText).error);
        }
      }
    },
    // Realiza una solicitud asincrónica para eliminar una publicación
    async doDeletePub({ commit, state }, publicationId) {
      if (state.isAuth) {
        try {
          // Realiza una solicitud DELETE para eliminar la publicación
          const response = await axios.delete(`http://localhost:8080/api/deletePub/${publicationId}`, {
            headers: {
              authorization: 'Bearer ' + state.token
            },
            data: {
              username: state.findUser.username
            }
          });

          // Obtiene el mensaje de respuesta
          const message = response.data.message;

          // Actualiza el estado con el mensaje de respuesta
          commit('setMessage', message);
        } catch (error) {
          // Captura y maneja cualquier error de la solicitud
          commit('setMessage', JSON.parse(error.response.request.responseText).error);
        }
      }
    },
    // Realiza una solicitud asincrónica para obtener todas las publicaciones de un usuario
    async doAllPublicactions({ commit, state }, username) {
      if (state.isAuth) {
        try {
          // Realiza una solicitud GET para obtener todas las publicaciones del usuario
          const response = await axios.get(`http://localhost:8080/api/getAllPublications/${username}`, {
            headers: {
              authorization: 'Bearer ' + state.token
            }
          });

          // Obtiene las publicaciones de la respuesta
          const publicactions = response.data.publications;

          // Actualiza el estado con las publicaciones obtenidas
          commit('setAllPublications', publicactions);
        } catch (error) {
          // Captura y maneja cualquier error de la solicitud
          commit('setMessage', JSON.parse(error.response.request.responseText).error);
        }
      }
    },

    // Realiza una solicitud asincrónica para seguir a un usuario
    async doFollowing({ commit, state }, { username, finduser }) {
      if (state.isAuth) {
        try {
          // Realiza una solicitud POST para seguir al usuario
          const response = await axios.post(`http://localhost:8080/api/following/${username}/${finduser}`, {
            headers: {
              authorization: 'Bearer ' + state.token
            }
          });

          // Actualiza el estado con la respuesta obtenida
          commit('setMessage', response);
        } catch (error) {
          // Captura y maneja cualquier error de la solicitud
          commit('setMessage', JSON.parse(error.response.request.responseText).error);
        }
      }
    },

    // Realiza una solicitud asincrónica para dejar de seguir a un usuario
    async doUnfollowing({ commit, state }, { username, finduser }) {
      if (state.isAuth) {
        try {
          // Imprime los valores de los parámetros username y finduser en la consola
          console.log(username, finduser);

          // Realiza una solicitud POST para dejar de seguir al usuario
          const response = await axios.post(`http://localhost:8080/api/unfollowing/${username}/${finduser}`, {
            headers: {
              authorization: 'Bearer ' + state.token
            }
          });

          // Actualiza el estado con la respuesta obtenida
          commit('setMessage', response);
        } catch (error) {
          // Captura y maneja cualquier error de la solicitud
          commit('setMessage', JSON.parse(error.response.request.responseText).error);
        }
      }
    },

    // Realiza una solicitud asincrónica para verificar si un usuario está siguiendo a otro usuario
    async doCheckFollow({ commit, state }, { username, finduser }) {
      if (state.isAuth) {
        try {
          // Realiza una solicitud POST para verificar el seguimiento
          const response = await axios.post(`http://localhost:8080/api/checkfollowing/${username}/${finduser}`, {
            headers: {
              authorization: 'Bearer ' + state.token
            }
          });
          // Actualiza el estado con los datos de la respuesta obtenida
          commit('setMessage', response.data);
        } catch (error) {
          // Captura y maneja cualquier error de la solicitud
          commit('setMessage', JSON.parse(error.response.request.responseText));
        }
      }
    }
  }
}
