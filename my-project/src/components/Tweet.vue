<template>
  <div>
    <div id="tweetCarousel" class="carousel slide ">
      <div class="carousel-inner">
        <div v-for="tweet in tweetData" :key="tweet.id" :class="['carousel-item', { active: tweet.id === 1 }]">
          <div class="tweet">
            <div class="date">{{ tweet.date }}</div>
            <div class="user-info">
              <img :src="tweet.avatar" class="avatar" alt="Avatar">
              <span class="handle">{{ tweet.handle }}</span>
            </div>
            <div class="content">{{ tweet.content }}</div>
          </div>
        </div>
      </div>
      <div class="carousel-controls ">
        <button class="carousel-control-prev" type="button" data-bs-target="#tweetCarousel" data-bs-slide="prev">
          <span class="fs-2 bi-arrow-left-square" style="color: #007c00;" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next " type="button" data-bs-target="#tweetCarousel" data-bs-slide="next">
          <span class="fs-2 bi-arrow-right-square" style="color: #007c00;" aria-hidden="true"></span>
          <!-- <i class="bi bi-arrow-left-square"></i> -->
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      
      tweetData: [
        // {
        //   id: 1,
        //   avatar: 'ruta/al/avatar.png',
        //   handle: '@usuario',
        //   content: 'Contenido del tweet...',
        //   date: 'Fecha del tweet',
        // },
        // {
        //   id: 2,
        //   avatar: 'ruta/al/avatar.png',
        //   handle: '@usuario2',
        //   content: 'Contenido del tweet...',
        //   date: 'Fecha del tweet',
        // },
      ],
    };
    
  },
  created () {
    // this.$store.dispatch('auth/sendTweet', {
    //   username: this.username
    // })
    const userData = JSON.parse(localStorage.getItem('user')); // Obtener el objeto JSON del usuario desde el localStorage
    if (userData) {
      this.username = userData.username; // Obtener el nombre de usuario del objeto userData
      this.fetchTweets(); // Llamar al método para obtener los tweets del usuario
    }
    console.log(this.username)
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await this.$store.dispatch('auth/sendTweet', {
          username: this.username,
        });
        // this.tweetData = response.data; // Asignar los tweets obtenidos desde el store a la variable tweetData
        this.tweetData = this.$store.state.auth.message
        console.log(this.tweetData)
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.tweet {
  background-color: #c2c2c267;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #6b6b6b;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.handle {
  color: #657786;
} 

.content {
  font-size: 14px;
  text-align: left;
}

.date {
  color: #657786;
  font-size: 12px;
  text-align: right;
}

.carousel {
  width: 100%;
}

.carousel-inner {
  height: 100%;
}

.carousel-item {
  height: 100%;
}

.carousel-controls {
  background-color: rgb(136, 11, 11);
  position: absolute;
  bottom: 0%;
  left: 40%;
  right: 40%;
}

.carousel-control-prev,
.carousel-control-next {
  width: auto;
  background-color: rgb(82, 34, 34);
}

.carousel-control-prev {
  margin-right: 10px; /* Ajusta el margen entre las flechas */
}

.carousel-control-next {
  margin-left: 10px; /* Ajusta el margen entre las flechas */
}

.carousel-control-next-icon {
  /* background-color: #5aaf29; */
  border-radius: 10%;
  fill: #007c00;
}
.carousel-control-prev-icon {
  /* background-color: #5aaf29; */
  border-radius: 10%;
  /* background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");} */
  /* background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%6db3b7' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E")  */
}
</style>
