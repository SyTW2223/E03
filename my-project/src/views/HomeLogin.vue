<template>
  <div>
    <Navbar/>
    <div class="container-fluid">
      <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 custom-color-navbar">
              <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                  <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                      <p>@{{this.$store.state.auth.user.username}}</p>
                    </li>
                    <li class="nav-item">
                          <router-link :to="`/userProfile/${this.$store.state.auth.user.username}`" class="nav-link align-middle px-0">
                              <i class="fs-4 bi-person-lines-fill custom-color"></i> <span class="ms-1 d-none d-sm-inline custom-color">Perfil</span>
                          </router-link>
                      </li>
                      <li class="nav-item">
                          <a href="#" class="nav-link align-middle px-0" @click="logout">
                              <i class="fs-4 bi-box-arrow-right custom-color"></i> <span class="ms-1 d-none d-sm-inline custom-color">Cerrar sesión</span>
                          </a>
                      </li>
                  </ul>
                  <hr>
              </div>
          </div>
          <div class="col py-3">
            <div class="container">
              <div>
                <div class="row" style="height: 100%;">
                  <div class="col-lg-12 pr-lg-4 custom-column column-margin">
                    <!-- Columna izquierda (mayor) -->
                    <div class="d-flex justify-content-center mb-3">
                      <!-- Buscador -->
                      <input v-on:keyup.enter="searchUser" v-model="findUsername" type="text" class="form-control" placeholder="Buscar usuarios">
                    </div>

                    <div class="list-group">
                      <div v-for="users in usernames" :key="users" class="list-group-item">
                        <router-link v-if="ownuser !== users" :to="`/findUser/${ownuser}/${users}`" class="custom-link">{{ users }}</router-link>
                        <router-link v-else :to="`/userProfile/${ownuser}`" class="custom-link">{{ users }}</router-link>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 pr-lg-4 custom-column column-margin">
                    <h4>Siguiendo</h4>
                    <div class="list-group">
                      <publication></publication>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Navbar from "../components/Navbar.vue";

import publication from "../components/AllPublications.vue";

export default {
  components: {
    Navbar,
    publication,
  },
  data() {
    return {
      publications: [],
      findUsername: '',
      sidebarActive: false,
      usernames: [],
      ownuser: ''
    };
  },
  created() {
    if (localStorage.getItem('token')) {

      const storedUserInfo = localStorage.getItem('user');

      if (storedUserInfo) {
        this.$store.commit('auth/setUser', JSON.parse(storedUserInfo));
      }
      this.ownuser = this.$store.state.auth.user.username;
    }
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 768;
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarActive = !this.sidebarActive;
    },
    logout() {
      this.$store.dispatch('auth/doLogout');
    },
    async searchUser() {
      await this.$store.dispatch('auth/doSearchUser', this.findUsername)
      this.usernames = this.$store.state.auth.usernames;
    }
  },
};
</script>
  
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}
.nav-item p {
  font-size: 20px;
  color: #ffffff;
}

.custom-color {
  color: #5dca53; 
}
.custom-color-navbar {
  background-color: #252529; 
}
.custom-border {
  border-right: 3px solid rgb(76, 170, 76);
  height: 100%;
}
.custom-column {
    border-radius: 10px;
    background-color: #f1f1f1;
    padding: 20px;
  }

.column-margin {
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
  