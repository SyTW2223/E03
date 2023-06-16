<template>
  <div>
    <Navbar/>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-3">
          <!-- Sección de información del perfil -->
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">@{{ this.userInfoFront.username }}</h5>
              <p class="card-text">Seguidores {{ this.followers  }}</p>
              <p class="card-text">Siguiendo {{ this.follows }}</p>
              <button class="btn btn-primary" @click="followUser">{{ checkFollow ? 'Siguiendo' : 'Seguir' }}</button>
              <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
              </svg>

              <div class="alert alert-danger d-flex align-items-center d-flex justify-content-center" v-if="message & checkFollow" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                  <!-- "Aqui el error" -->
                  {{ this.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="bigcard">
            <!-- Sección de publications publicados -->
            <h4>Publicaicones</h4>
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
  data() {
    return {
      newpublicationContent: '',
      userInfoFront: {},
      message: '',
      user: '',
      userfind: '',
      checkFollow: false,
      follows: 0,
      followers: 0

    };
  },
  async created() {
    if (localStorage.getItem('token')) {

      const storedUserInfo = localStorage.getItem('user');

      if (storedUserInfo) {
        this.$store.commit('auth/setUser', JSON.parse(storedUserInfo));
      }
      const finduser = this.$route.params.userfind;


      if (finduser) {
        await this.$store.dispatch('auth/doGetUser', finduser)
        this.userInfoFront = this.$store.state.auth.findUser
        this.follows = this.userInfoFront.follows.length
        this.followers = this.userInfoFront.followers.length
      }

      this.user = this.$route.params.username;
      this.userfind = this.$route.params.userfind;

      await this.$store.dispatch('auth/doCheckFollow', { username: this.user, finduser: this.userfind })

      console.log(this.$store.state.auth.message)
      if (!this.$store.state.auth.message.error) {
        this.checkFollow = true
        this.message = this.$store.state.auth.message.error
      } else {
        this.checkFollow = false
        this.message = this.$store.state.auth.message.message
      }
      console.log(this.checkFollow)
    }
  },
  methods: {
    async followUser() {
      // Lógica para seguir o dejar de seguir al usuario
      if (!this.checkFollow) {
        // Lógica para seguir al usuario
        await this.$store.dispatch('auth/doFollowing', { username: this.user, finduser: this.userfind })
        this.checkFollow = true

        // Incrementar el número de usuarios seguidos
        this.followers++;
      } else {
        // Lógica para dejar de seguir al usuario
        await this.unfollowUser();
      }

      this.message = this.$store.state.auth.message
    },
    async unfollowUser() {
      // Lógica para seguir o dejar de seguir al usuario
      await this.$store.dispatch('auth/doUnfollowing', { username: this.user, finduser: this.userfind })

      this.message = this.$store.state.auth.message

      this.checkFollow = false; // Actualiza checkFollow a true

      // Decrementar el número de usuarios seguidos
      this.followers--;
    },
    async createpublication() {
      // Lógica para crear un nuevo publication
      await this.$store.dispatch('auth/sendPublication', this.newpublicationContent)
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
