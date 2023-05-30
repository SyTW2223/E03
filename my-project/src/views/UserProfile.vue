<template>
  <div>
    <Navbar/>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-3">
          <!-- Sección de información del perfil -->
          <div class="card mb-3">
            <div class="profile-image-container">
              <img class="card-img-top rounded-circle" :src="user.avatar" alt="Perfil">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ user.name }}</h5>
              <p class="card-text">Seguidores: {{ user.followers }}</p>
              <p class="card-text">Siguiendo: {{ user.following }}</p>
              <!-- <button class="btn btn-primary" @click="followUser">{{ following ? 'Dejar de seguir' : 'Seguir'
              }}</button> -->
            </div>
          </div>
          <!-- Lista de seguidores -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Seguidores</h5>
              <ul class="list-group">
                <li v-for="follower in user.followersList" :key="follower.id" class="list-group-item">
                  {{ follower.name }}
                </li>
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
          <!-- <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Tweets</h5>
              <ul class="list-group">
                <li v-for="tweet in tweets" :key="tweet.id" class="list-group-item">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-1">@{{ user.username }}</h6>
                    <small>{{ tweet.date }}</small>
                  </div>
                  <p class="mb-1">{{ tweet.content }}</p>
                  <small>{{ tweet.link }}</small>
                </li>
              </ul>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
  
<script>
import Tweet from "../components/Tweet.vue";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
    Tweet,
  },
  data() {
    return {
      user: {
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'https://thispersondoesnotexist.xyz/img/4007.jpg',
        followers: 500,
        following: 200,
        followersList: [
          { id: 1, name: 'Follower 1' },
          { id: 2, name: 'Follower 2' },
          { id: 3, name: 'Follower 3' }
        ]
      },
      tweets: [
        { id: 1, content: 'Contenido del Tweet 1', date: '2023-05-30', link: 'https://example.com/tweet1' },
        { id: 2, content: 'Contenido del Tweet 2', date: '2023-05-29', link: 'https://example.com/tweet2' },
        { id: 3, content: 'Contenido del Tweet 3', date: '2023-05-28', link: 'https://example.com/tweet3' }
      ],
      newTweetContent: ''
    };
  },
  computed: {
    following() {
      // Simulación del estado de seguir o dejar de seguir al usuario
      return false;
    }
  },
  methods: {
    followUser() {
      // Lógica para seguir o dejar de seguir al usuario
    },
    createTweet() {
      // Lógica para crear un nuevo tweet
      const newTweet = {
        id: this.tweets.length + 1,
        content: this.newTweetContent,
        date: new Date().toISOString(),
        link: ''
      };
      this.tweets.unshift(newTweet);
      this.newTweetContent = '';
    }
  }
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