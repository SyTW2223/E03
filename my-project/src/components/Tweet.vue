<template>
  <div>
    <div id="tweetCarousel" class="carousel slide">
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
      <button class="carousel-control-prev" type="button" data-bs-target="#tweetCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#tweetCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tweetData: [
        {
          id: 1,
          avatar: 'ruta/al/avatar.png',
          handle: '@usuario',
          content: 'Contenido del tweet...',
          date: 'Fecha del tweet',
        },
        {
          id: 2,
          avatar: 'ruta/al/avatar.png',
          handle: '@usuario2',
          content: 'Contenido del tweet...',
          date: 'Fecha del tweet',
        },
      ],
    };
  },
};
</script>

<style scoped>
.tweet {
  background-color: #f5f8fa;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
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

.carousel-control-prev,
.carousel-control-next {
  width: 3%;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: #13e700;
}

.carousel-control-prev-icon:before,
.carousel-control-next-icon:before {
  color: rgb(107, 145, 105);
}

.carousel-control-prev {
  margin-left: -20px;
}

.carousel-control-next {
  margin-right: -20px;
}
</style>
