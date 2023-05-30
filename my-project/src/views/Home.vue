<template>
<div>
  <Navbar/>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 custom-color-navbar">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link align-middle px-0">
                            <i class="fs-4 bi-box-arrow-in-right custom-color"></i> <span class="ms-1 d-none d-sm-inline custom-color">Iniciar sesión</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link align-middle px-0">
                            <i class="fs-4 bi-person-add custom-color"></i> <span class="ms-1 d-none d-sm-inline custom-color">Registrarse</span>
                        </router-link>
                    </li>
                </ul>
                <hr>
            </div>
        </div>
        <div class="col py-3">
          <div class="container">
            <div>
              <div class="row" style="height: 100%;">
                <div class="col-lg-7 pr-lg-4 custom-column column-margin">
                  <!-- Columna izquierda (mayor) -->
                  <div class="d-flex justify-content-center mb-3">
                    <!-- Buscador -->
                    <input type="text" class="form-control" placeholder="Buscar">
                  </div>
                  <div class="list-group">
                    <!-- Lista de tweets -->
                    <!-- <a href="#" class="list-group-item list-group-item-action">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">@usuario1</h5>
                        <small>Fecha del tweet</small>
                      </div>
                      <p class="mb-1">Contenido del tweet...</p>
                      <small>Enlace o información adicional</small>
                    </a> -->
                    <!-- Agrega más tweets aquí -->
                    
                    <Tweet></Tweet>
                    
                  </div>
                </div>
                
                <div class="col-lg-4 custom-column column-margin">
                  <!-- Columna derecha -->
                  <h3>Recomendaciones</h3>
                    <RecommendedUsers/>
                    <!-- Recomendaciones de usuarios -->
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
import Sidebar from "../components/Sidebar.vue";
import Tweet from "../components/Tweet.vue";
import RecommendedUsers from "../components/RecommendedUsers.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    Tweet,
    RecommendedUsers,
  },
  data() {
    return {
      tweets: [],
      sidebarActive: false,
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 768;
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarActive = !this.sidebarActive;
    },
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

.custom-color {
  color: #5dca53; /* Color personalizado en formato hexadecimal */
}
.custom-color-navbar {
  background-color: #252529; /* Reemplaza #ff0000 con tu color personalizado en formato hexadecimal */
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
  }
</style>
