<template>
  <div id="app">
    <Navbar/>
    <div id="register">
      <div id="description">
        <h1>Registro</h1>
        <p>Si ya tienes cuenta</p>
        <router-link to="/login">
          <small>Inicia sesión</small>
        </router-link>
      </div>
      <div id="form">
        <form @submit.prevent="doRegister">
          <label for="name">Nombre</label>
          <input type="text" id="name" v-model="name" placeholder="Elon Musk" autocomplete="off" required>

          <label for="username">Nombre de usuario</label>
          <input type="text" id="username" v-model="username" placeholder="ElonM123" autocomplete="off" required>

          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="elon@musk.io" autocomplete="off" required>

          <label for="password">Contraseña</label>
          <i class="fas" @click="hidePassword = !hidePassword"></i>
          <input type="password" id="password" v-model="password" placeholder="**********" required>

          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </symbol>
            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </symbol>
          </svg>

          <div class="alert alert-danger d-flex align-items-center d-flex justify-content-center" v-if="message && !isAuth" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
              <!-- "Aqui el error" -->
              {{ this.message }}
            </div>
          </div>
          <div class="alert alert-success d-flex align-items-center d-flex justify-content-center" v-if="message && isAuth" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
            <div>
              <!-- "Aqui el exito" -->
              {{ this.message }}
            </div>
          </div>

          <button type="submit">Registro</button>
          <br>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: 'Register',
  components: {
    Navbar
  },
  data () {
    return {
      name: "",
      username: "",
      email: "",
      isAuth: "",
      password: "",
      message: ""
    }
  },
  // cada vez que se recarge la pagina se comprueba si el usario esta logueado
  created() {
    if (localStorage.getItem('token')) {
      // Si hay un token en el LocalStorage, redirige al usuario a la página deseada
      this.$router.push('/homeLogin');
    }
  },
  methods: {
    async doRegister() {
      // Validar campos vacíos
      if (!this.name || !this.username || !this.email || !this.password) {
        this.message = "Por favor, complete todos los campos";
        return;
      }

      // Validar formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.message = "El correo electrónico no tiene un formato válido";
        return;
      }
      
      await this.$store.dispatch('auth/doRegister', {
        email: this.email,
        password: this.password,
        name: this.name,
        username: this.username
      })
      // Actualiza el estado de autenticación y el mensaje de registro con los
      // valores del store
      this.isAuth = this.$store.state.auth.isAuth
      this.message = this.$store.state.auth.message
      if (localStorage.getItem('token')) {
        // Si hay un token en el LocalStorage, redirige al usuario a la página deseada
        this.$router.push('/homeLogin');
      }
      this.$router.push('/Login');

      // Eliminar el token del almacenamiento de sesión al cerrar el navegador
      window.addEventListener('beforeunload', function() {
        sessionStorage.removeItem('token');
      });
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

div#app {
  width: 100%;
  height: 100%;
}

div#app div#register  {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#register  div#description {
  background-color: #ffffff;
  width: 280px;
  padding: 35px;
}

div#app div#register  div#description h1,
div#app div#register  div#description p {
  margin: 0;
}

div#app div#register  div#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

div#app div#register  div#form {
  background-color: #252529;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 400px;
  padding: 35px;
}

div#app div#register  div#form label,
div#app div#register  div#form input {
  outline: none;
  width: 100%;
}

div#app div#register  div#form label {
  color: #95a5a6;
  font-size: 0.8em;
  text-align: left;
}

div#app div#register  div#form input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
  margin-bottom: 20px;
}

div#app div#register  div#form ::placeholder {
  color: #ecf0f1;
  opacity: 1;
}

div#app div#register  div#form button {
  background-color: #ffffff;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#app div#register  div#form button:hover {
  background-color: #eeeeee;
}

@media screen and (max-width: 600px) {
  div#app div#register  {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#app div#register  div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#app div#register  div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  div#app div#register  div#form form {
    margin: 0 auto;
    max-width: 280px;
    width: 100%;
  }
}
</style>
