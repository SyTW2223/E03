// Importamos los módulos necesarios
import axios from 'axios'; // para enviar solicitudes HTTP
import Vue from 'vue';
import Vuex from 'vuex'; // para manejar el estado de la aplicación
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
    user: "",
    following: "",
    findUser: {},
    // username: "",
    usernames: [],
    publications: {},
    isAuth: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : undefined
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
      state.publications = publications
    },
    resetState(state) {
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

        const data = response.data.message // lo quitaria?

        // commit('setUsername', username)
        // console.log(username)

        commit('setUser', userInfo)

        // actualizamos el mensaje del servidor
        commit('setMessage', data)
        // imprimimos la respuesta en la consola
        // console.log(data)
        commit('setIsAuth', true)

        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(userInfo));

      } catch (error) {
        // Si la solicitud falla, actualizamos el estado con el mensaje de error y registramos el mensaje en la consola
        // actualizamos el mensaje del servidor
        commit('setMessage', JSON.parse(error.response.request.responseText).error)
        // imprimimos el mensaje de error en la consola
        console.log(JSON.parse(error.response.request.responseText).error)

        commit('setIsAuth', false)
      }
    },
    async doRegister({ commit }, credentials) {
      try {
        // Enviamos una solicitud POST a la URL de inicio de sesión utilizando axios
        const response = await axios.post('http://localhost:8080/api/register', {
          // pasamos el correo electrónico almacenado en el estado
          email: credentials.email,
          // pasamos la contraseña almacenada en el estado
          password: credentials.password,

          username: credentials.username,

          name: credentials.name
        })
        // Si la solicitud es exitosa, actualizamos el estado con la respuesta del servidor y registramos la respuesta en la consola
        const data = response.data.message // lo quitaria?
        // actualizamos el mensaje del servidor
        commit('setMessage', data)
        // imprimimos la respuesta en la consola
        console.log(data.message)

        commit('setIsAuth', true)
      } catch (error) {
        // Si la solicitud falla, actualizamos el estado con el mensaje de error y registramos el mensaje en la consola
        // actualizamos el mensaje del servidor
        commit('setMessage', JSON.parse(error.response.request.responseText).error)
        // imprimimos el mensaje de error en la consola
        console.log(JSON.parse(error.response.request.responseText).error)

        commit('setIsAuth', false)
      }
    },
    async doLogout({ commit }) {
      // Restablecer el estado al valor inicial y borrar el token del LocalStorage
      commit('resetState');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/');
    },
    async sendPublication({ commit, state }, message) {
      if (state.isAuth) {
        try {
          const response = await axios.post('http://localhost:8080/api/publication', {
            username: state.user.username,
            message: message
          }, {
            headers: {
              authorization: 'Bearer ' + state.token
            }
          })
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
    },
    async doSearchUser({ commit, state }, usernameSearch) {
      if (state.isAuth) {
        try {
          const response = await axios.get(`http://localhost:8080/api/searchUser/${usernameSearch}`, {
            headers: {
              authorization: 'Bearer ' + state.token
            }
          });
          const usernames = response.data.username;

          commit('setUsernames', usernames); // Actualiza el estado con los usernames obtenidos
          console.log('auth', usernames)
        } catch (error) {
          console.log(error);
        }
      }
    },
    async doGetUser({ commit, state }, username) {
      if (state.isAuth) {
        try {
          const response = await axios.get(`http://localhost:8080/api/getUser/${username}`, {
            headers: {
              authorization: 'Bearer ' + state.token
            }
          });
          const user = response.data.user;
          //console.log(user.name)
          commit('setFindUser', user); // Actualiza el estado con el usuario obtenido
          // console.log('Find user:', state.findUser);

          // localStorage.setItem('findUser', JSON.stringify(user));

        } catch (error) {
          commit('setMessage', JSON.parse(error.response.request.responseText).error)
          // imprimimos el mensaje de error en la consola
          //console.log(JSON.parse(error.response.request.responseText).error)
          // console.log(error);
        }
      }
    },
    async doPublicactions({ commit, state }, username) {
      if (state.isAuth) {
        try {
          const response = await axios.get(`http://localhost:8080/api/getPublications/${username}`, {
            headers: {
              authorization: 'Bearer ' + state.token
            }
          });
          const publicactions = response.data.publications;
          
          commit('setPublications', publicactions);
        } catch (error) {
          commit('setMessage', JSON.parse(error.response.request.responseText).error)
          
        }
      }
    },
    async doFollowing({ commit, state }, { username, finduser }) {
      if (state.isAuth) {
        try {
          console.log(username, finduser)
          const response = await axios.post(`http://localhost:8080/api/following/${username}/${finduser}`, {
            headers: {
              authorization: 'Bearer ' + state.token
            }
          });
          console.log(response)
          commit('setMessage', response)
          
        } catch (error) {
          commit('setMessage', JSON.parse(error.response.request.responseText).error)
          
          console.log(JSON.parse(error.response.request.responseText).error);
        }
      }
    },
    async doCheckFollow({ commit, state }, { username, finduser }) {
      if (state.isAuth) {
        try {
          console.log(username, finduser)
          const response = await axios.post(`http://localhost:8080/api/checkfollowing/${username}/${finduser}`, {
            headers: {
              authorization: 'Bearer ' + state.token
            }
          });
          // console.log(response)
          commit('setMessage', response)
          
        } catch (error) {
          commit('setMessage', JSON.parse(error.response.request.responseText).error)

          console.log(JSON.parse(error.response.request.responseText).error);
        }
      }
    },
    
  }
}
