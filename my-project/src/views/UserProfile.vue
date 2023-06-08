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

            <!-- Formulario para crear nuevos tweets -->
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Nuevo Tweet</h5>
                <form @submit.prevent="createTweet">
                  <div class="form-group">
                    <textarea class="form-control" rows="3" v-model="newTweetContent"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">Publicar</button>
                </form>
              </div>
            </div>
            <!-- Sección de tweets publicados -->
            <Tweet/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // Importa la función mapState de vuex
import Tweet from "../components/Tweet.vue";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
    Tweet,
  },
  computed: {
    ...mapState('auth', {
      userInfo: state => state.user
    }),
    logUserInfo() {
      // console.log(this.userInfo);
      // console.log(this.userInfo.name);
      return this.userInfo; // Opcional: puedes devolver userInfo si lo necesitas en el template
    },
    following() {
      // Simulación del estado de seguir o dejar de seguir al usuario
      return false;
    }
  },
  data() {
    return {
      newTweetContent: ''
    };
  },
  created() {
    if (localStorage.getItem('token')) {

      const storedUserInfo = localStorage.getItem('user');

      if (storedUserInfo) {
        this.$store.commit('auth/setUser', JSON.parse(storedUserInfo));
      }
    }
  },
  methods: {
    followUser() {
      // Lógica para seguir o dejar de seguir al usuario
    },
    async createTweet() {
      // Lógica para crear un nuevo tweet
      await this.$store.dispatch('auth/sendTweet', this.newTweetContent)
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