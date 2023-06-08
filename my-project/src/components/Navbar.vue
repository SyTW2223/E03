<template>
  <nav class="navbar bg-body-tertiary custom-color">
    <div class="container-fluid">
      <router-link class="navbar-brand text-white" to="/">
        <img src="../assets/chameleon (3).png" alt="Logo" style="width: auto; height: 40px;" class="d-inline-block align-text-top">
        MobTycoon
      </router-link>
      <!-- <form class="d-flex" role="botton">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <router-link to="/login" class="btn btn-login " type="button">Login</router-link>
          <router-link to="/register" class="btn btn-register " type="button">Registro</router-link>
        </div>
      </form> -->
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  computed: {
    isMobile() {
      return window.innerWidth <= 768;
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
  },
};

</script>

<style>
.navbar {
  margin-top: 0;
}
.btn-login {
  background-color: #ff000000;
  color: #ffffff;
  border-color: #50ad48;
}
.btn-register {
  background-color: #50ad48;
  color: #ffffff;
}
.custom-color {
  background-color: #252529; /* Reemplaza #ff0000 con tu color personalizado en formato hexadecimal */
}
</style>
