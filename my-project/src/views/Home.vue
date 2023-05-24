<template>
  <div class="twitter-template">
    <navbar>
      <button class="sidebar-toggle" @click="toggleSidebar" v-if="isMobile">
        <i class="fas fa-bars"></i>
      </button>
    </navbar>
    <div class="content">
      <div class="sidebar" :class="{ 'sidebar-active': sidebarActive }">
        <sidebar></sidebar>
      </div>
      <div class="main-content">
        <div class="feed">
          <div class="tweets">
            <tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet"></tweet>
          </div>
        </div>
        
        <div class="recommendations" :class="{ 'recommendations-sidebar-active': sidebarActive }">
          <recommended-users></recommended-users>
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
      tweets: [
        // Aquí van los datos de los tweets
        
      ],
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
.twitter-template {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: auto;
  padding: 10px;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
}

.sidebar {
  flex-basis: 250px;
  background-color: #f5f8fa;
  transition: transform 0.3s ease;
}

.sidebar.sidebar-active {
  transform: translateX(0);
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
}

.feed {
  flex-basis: calc(100% - 300px);
  background-color: #ffffff;
  padding: 20px;
}

.recommendations {
  flex-basis: 300px;
  background-color: #f5f8fa;
}

.tweets {
  padding: 20px;
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 250px;
    height: 100vh;
    transform: translateX(-100%);
  }

  .sidebar.sidebar-active {
    transform: translateX(0);
  }

  .feed {
    flex-basis: 100%;
  }

  .recommendations {
    flex-basis: 100%;
  }
}
</style>
