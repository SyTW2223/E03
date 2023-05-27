// Importamos los módulos necesarios
import axios from 'axios' // para enviar solicitudes HTTP
import Vuex from 'vuex' // para manejar el estado de la aplicación
import Vue from 'vue'


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
    isAuth: false
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
    setUsername(state, username) {
      state.username = username // actualizamos la contraseña
    },
    setIsAuth(state, isAuth) {
      state.isAuth = isAuth // actualizamos la contraseña
    },
    setMessage(state, message) {
      state.message = message // actualizamos el mensaje del servidor
    }
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
        const data = response.data.message // lo quitaria?
        // actualizamos el mensaje del servidor
        commit('setMessage', data)
        // imprimimos la respuesta en la consola
        console.log(data.message)
        // 
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
      } catch (error) {
        // Si la solicitud falla, actualizamos el estado con el mensaje de error y registramos el mensaje en la consola
        // actualizamos el mensaje del servidor
        commit('setMessage', JSON.parse(error.response.request.responseText).error)
        // imprimimos el mensaje de error en la consola
        console.log(JSON.parse(error.response.request.responseText).error)

        commit('setIsAuth', false)
      }
    }
  }
}
