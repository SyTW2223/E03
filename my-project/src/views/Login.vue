<template>
  <div id="app">
    <Navbar/>
    <div id="login">

      <div id="description">
        <h1>Login</h1>
        <p>¿No estas registrado?</p>
        <router-link to="/register">
          <small>Registrete</small>
        </router-link>
      </div>
      <div id="form">
        <form @submit.prevent="doLogin">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="email" placeholder="example@outlook.com" autocomplete="off" required>

          <label for="password">Password</label>
          <i class="fas" @click="hidePassword = !hidePassword"></i>
          <input type="password" id="password" v-model="password" placeholder="**********" required>

          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
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
          <button type="button" @click="doLogin">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
name: 'Login',
components: {
  Navbar
},
data () {
  return {
    email: '',
    password: '',
    isAuth: '',
    username: '',
    message: ''
  }
},
// cada vez que se recarge la pagina se comprueba si el usario esta logeado
created() {
  if (localStorage.getItem('token')) {

    const storedUserInfo = localStorage.getItem('user');

    if (storedUserInfo) {
      this.$store.commit('auth/setUser', JSON.parse(storedUserInfo));
    }
    // Si hay un token en el LocalStorage, redirige al usuario a la página deseada
    this.$router.push(`/homeLogin/${this.$store.state.auth.username}`);
  }

},
methods: {
  async doLogin () {
    // Llamamos a la acción 'doLogin' en la tienda, pasando el correo electrónico y la contraseña
    if (!this.email || !this.password) {
      this.message = "Por favor, complete todos los campos";
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.message = "El correo electrónico no tiene un formato válido";
      return;
    }
    
    await this.$store.dispatch('auth/doLogin', {
      email: this.email,
      password: this.password
    })
    // Obtenemos el mensaje del servidor desde el estado de la tienda
    this.isAuth = this.$store.state.auth.isAuth
    this.message = this.$store.state.auth.message

    if (localStorage.getItem('token')) {
      // Si hay un token en el LocalStorage, redirige al usuario a la página deseada
      this.username = this.$store.state.auth.user.username;

      this.$router.push(`/homeLogin/${this.username}`);
    }
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

div#app div#login {
align-items: center;
background-color: #e2e2e5;
display: flex;
justify-content: center;
width: 100%;
height: 100%;
}

div#app div#login div#description {
background-color: #ffffff;
width: 280px;
padding: 35px;
}

div#app div#login div#description h1,
div#app div#login div#description p {
margin: 0;
}

div#app div#login div#description p {
font-size: 0.8em;
color: #95a5a6;
margin-top: 10px;
}

div#app div#login div#form {
background-color: #252529;
border-radius: 5px;
box-shadow: 0px 0px 30px 0px #666;
color: #ecf0f1;
width: 400px;
padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
outline: none;
width: 100%;
}

/* ccs  */
div#app div#login div#form label {
color: #95a5a6;
font-size: 0.8em;
text-align: left;
}

div#app div#login div#form input {
background-color: transparent;
border: none;
color: #ecf0f1;
font-size: 1em;
margin-bottom: 20px;
}

div#app div#login div#form ::placeholder {
color: #ecf0f1;
opacity: 1;
}

div#app div#login div#form button {
background-color: #ffffff;
cursor: pointer;
border: none;
padding: 10px;
transition: background-color 0.2s ease-in-out;
width: 100%;
}

div#app div#login div#form button:hover {
background-color: #eeeeee;
}

@media screen and (max-width: 600px) {
div#app div#login {
  align-items: unset;
  background-color: unset;
  display: unset;
  justify-content: unset;
}

div#app div#login div#description {
  margin: 0 auto;
  max-width: 350px;
  width: 100%;
}

div#app div#login div#form {
  border-radius: unset;
  box-shadow: unset;
  width: 100%;
}

div#app div#login div#form form {
  margin: 0 auto;
  max-width: 280px;
  width: 100%;
}
}
</style>
