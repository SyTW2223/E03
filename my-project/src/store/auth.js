// Importamos los módulos necesarios
import axios from 'axios' // para enviar solicitudes HTTP
import Vuex from 'vuex' // para manejar el estado de la aplicación
import Vue from 'vue'
import router from '../router/index'


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
    findUser: "",
    // username: "",
    usernames: [],
    tweets: "",
    isAuth: localStorage.getItem('token') ? true : false
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
    // setUsername(state, username) {
    //   state.username = username // actualizamos la contraseña
    // },
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
    setMessage(state, message) {
      state.message = message // actualizamos el mensaje del servidor
    },
    setTweets(state, tweets) {
      state.tweets = tweets
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
        const response = await axios.post('http://10.6.128.209:8080/api/login', {
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
        const response = await axios.post('http://10.6.128.209:8080/api/register', {
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
        localStorage.setItem('token', response.data.data.token);
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
    async sendTweet ({commit, state}, message) {
      if (state.isAuth) {
        try {
          const response = await axios.post('http://10.6.128.209:8080/api/tweet', {
            username: state.user.username,
            message: message
          })
          console.log(response)
        } catch(error) {
          console.log(error)
        }
      }
    },
    async doSearchUser({commit, state}, usernameSearch) {
      console.log(usernameSearch)
      // if (state.isAuth) {
      //   try {
      //     const response = await axios.post('http://10.6.128.209:8080/api/searchUser', {
      //       username: usernameSearch
      //     })
      //     response.data.username.forEach(element => {
      //       console.log(element)
      //     });
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
      if (state.isAuth) {
        try {
          const response = await axios.post('http://10.6.128.209:8080/api/searchUser', {
            username: usernameSearch
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
          const response = await axios.get(`http://10.6.128.209:8080/api/getUser/${username}`);
          const user = response.data.user;

          commit('setFindUser', user); // Actualiza el estado con el usuario obtenido
          // console.log('Find user:', state.findUser);

          // localStorage.setItem('findUser', JSON.stringify(user));

        } catch (error) {
          commit('setMessage', JSON.parse(error.response.request.responseText).error)
          // imprimimos el mensaje de error en la consola
          console.log(JSON.parse(error.response.request.responseText).error)
          // console.log(error);
        }
      }
    },
  }
}
