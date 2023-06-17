<template>
  <div>
    <Navbar/>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-3">
          <!-- Sección de información del perfil -->
          <div class="card mb-3">
  
            <div class="card-body">
              <!-- <div>{{ logUserInfo }}</div> -->
              <h5 class="card-title" v-if="this.userInfo">@{{ this.userInfo.username }}</h5>
              <p class="card-text" v-if="this.userInfo">Seguidores {{ this.userInfo.followers.length }}</p>
              <p class="card-text" v-if="this.userInfo">Siguiendo {{ this.userInfo.follows.length }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="bigcard">

            <!-- Formulario para crear nuevos publications -->
            <div class="card">
              <div class="card-body">
                <!-- <h5 class="card-title">Nueva publicación</h5> -->
                <form @submit.prevent="createpublication">
                  <!-- <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="newpublicationContent"></textarea>
                  </div> -->
                  <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" v-model="newpublicationContent"></textarea>
                    <label for="floatingTextarea">Nueva publicacion</label>
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
            <h4>Mis publicaicones</h4>
            <publication/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      showAlert: false,
      showEmptyAlert: false,
      userInfo: null,
    };
  },
  async created() {
    if (localStorage.getItem('token')) {

      const user = this.$route.params.username

      
      if (user) {
        await this.$store.dispatch('auth/doGetUser', user)
        this.userInfo = this.$store.state.auth.findUser
      }
      console.log(this.$store.state.auth.findUser)
      // console.log(this.userInfo.)
    }
  },
  methods: {
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
