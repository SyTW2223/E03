<template>
  <div>
    <Navbar/>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-3">
          <!-- Sección de información del perfil -->
          <div class="card mb-3">
            <div class="profile-image-container">
              <!-- <img class="card-img-top rounded-circle" :src="userInfo.avatar" alt="Perfil"> -->
            </div>
            <div class="card-body">
              <!-- <div>{{ logUserInfo }}</div> -->
              <h5 class="card-title">@{{ this.userInfo.username }}</h5>
              <p class="card-text">Seguidores: {{ this.userInfo.followers }}</p>
              <p class="card-text">Siguiendo: {{ this.userInfo.follows }}</p>
              <!-- <button class="btn btn-primary" @click="followUser">{{ following ? 'Dejar de seguir' : 'Seguir' }}</button> -->
            </div>
          </div>
          <!-- Lista de seguidores -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Seguidores</h5>
              <ul class="list-group">
                <!-- <li v-for="follower in userInfo.followersList" :key="follower.id" class="list-group-item">
                  {{ follower.name }}
                </li> -->
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="bigcard">

            <!-- Formulario para crear nuevos publications -->
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Nuevo publication</h5>
                <form @submit.prevent="createpublication">
                  <div class="form-group">
                    <textarea class="form-control" rows="3" v-model="newpublicationContent"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">Publicar</button>
                </form>
              </div>
              <div class="alert alert-success mt-3" role="alert" v-if="showAlert">
                Publicación enviada exitosamente.
                <button type="button" class="btn-close" @click="closeAlert"></button>
              </div>

              <!-- Alerta de contenido vacío -->
              <div class="alert alert-danger mt-3" role="alert" v-if="showEmptyAlert">
                El contenido de la publicación no puede estar vacío.
                <button type="button" class="btn-close" @click="closeEmptyAlert"></button>
              </div>
            </div>
            <!-- Sección de publications publicados -->
            <publication/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // Importa la función mapState de vuex
import publication from "../components/Publication.vue";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
    publication,
  },
  computed: {
    // ...mapState('auth', {
    //   userInfo: state => state.user
    // }),
    // logUserInfo() {
    //   // console.log(this.userInfo);
    //   // console.log(this.userInfo.name);
    //   return this.userInfo; // Opcional: puedes devolver userInfo si lo necesitas en el template
    // },
    following() {
      // Simulación del estado de seguir o dejar de seguir al usuario
      return false;
    }
  },
  data() {
    return {
      newpublicationContent: '',
      showAlert: false,
      showEmptyAlert: false,
      userInfo: {}
    };
  },
  created() {
    if (localStorage.getItem('token')) {

      const storedUserInfo = localStorage.getItem('user');

      if (storedUserInfo) {
        this.$store.commit('auth/setUser', JSON.parse(storedUserInfo));
        this.userInfo = this.$store.state.auth.user
        console.log(this.userInfo.followers)
        console.log(this.userInfo.follows)
      }
    }
  },
  methods: {
    followUser() {
      // Lógica para seguir o dejar de seguir al usuario
    },
    // async createpublication() {
    //   // Lógica para crear un nuevo publication
    //   await this.$store.dispatch('auth/sendPublication', this.newpublicationContent)
    // }
    async createpublication() {
      if (this.newpublicationContent.trim() === '') {
        this.showEmptyAlert = true;
        return;
      }

      await this.$store.dispatch('auth/sendPublication', this.newpublicationContent);
      this.newpublicationContent = '';
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
      window.location.reload();
    },
    closeAlert() {
      this.showAlert = false;
    },
    closeEmptyAlert() {
      this.showEmptyAlert = false;
    }
  },
};
</script>

  
<style>

.card {
  background-color: #c2c2c267; /* Cambia el color de fondo del card */
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #6b6b6b;
}

.bigcard {
  background-color: #c2c2c267; /* Cambia el color de fondo del card */
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 20px;
  border: 1px solid #6b6b6b;
}

.list-group-item {
  background-color: #ffffff; /* Cambia el color de fondo del list-group-item */
}

.card-img-top.rounded-circle {
  border-radius: 50%;
  border: 3px solid #5dca53; /* Cambia el color del borde */
  padding: 3px; /* Añade un espacio alrededor de la imagen */
}

.profile-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  width: 150px; /* Ajusta el tamaño de la imagen de perfil */
  height: 150px; /* Ajusta el tamaño de la imagen de perfil */
  margin: 0 auto;
  border: 3px solid #5dca53; /* Cambia el color del borde */
}

</style>