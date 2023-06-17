<template>
  <div class="main-page">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 text-center">
          <img src="../assets/chameleon (3).png" alt="Logo" class="logo">
          <h1 class="app-name">MobTycoon</h1>
          <div class="buttons">
            <button class="custom-button-login" @click="redirectToLogin">Iniciar sesión</button>
            <button class="custom-button-register" @click="redirectToRegister">Registrarse</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // cada vez que se recarge la pagina se comprueba si el usario esta logeado
  created() {
    if (localStorage.getItem('token')) {

      const storedUserInfo = localStorage.getItem('user');

      if (storedUserInfo) {
        this.$store.commit('auth/setUser', JSON.parse(storedUserInfo));
      }
      // Si hay un token en el LocalStorage, redirige al usuario a la página deseada
      this.$router.push(`/homeLogin/${this.$store.state.auth.user.username}`);
    }
  },
  methods: {
    redirectToLogin() {
      this.$router.push('/login');
    },
    redirectToRegister() {
      this.$router.push('/register');
    }
  }
}
</script>

<style>
.main-page {
  background-color: #000000;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 100px;
  height: 100px;
}

.app-name {
  color: #ffffff;
  font-size: 24px;
  margin-top: 16px;
}

.buttons {
  margin-top: 32px;
}

.buttons button {
  margin-right: 10px;
}

.custom-button-login,
.custom-button-register {
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-button-login {
  background-color: #5faa5f;
}

.custom-button-register {
  background-color: #6e6e6e;
}

.custom-button-login:hover {
  background-color: #458f45;
}

.custom-button-register:hover {
  background-color: #5f5f5f;
}
</style>