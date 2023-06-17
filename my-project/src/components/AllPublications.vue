<template>
  <div>
    <div v-for="(item, index) in publicationData" :key="index" class="publication">
      <div class="user-info">
        <div class="username">
          <router-link v-if="ownuser !== item.username" :to="`/findUser/${ownuser}/${item.username}`" class="custom-link">@{{ item.username }}</router-link>
          <router-link v-else :to="`/userProfile/${ownuser}`" class="custom-link">@{{ item.username }}</router-link>
        </div>
        <div class="date">{{ formatDate(item.date) }}</div>
      </div>
      <div class="content">{{ item.message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publicationData: [],
      ownuser: '',
    };
  },
  async created() {
    this.ownuser = this.$store.state.auth.user.username;
    await this.$store.dispatch('auth/doAllPublicactions', this.ownuser);
    this.publicationData = this.$store.state.auth.allPublications;
  },
  computed: {
    sortedPublications() {
      return this.publicationData.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
  },
  methods: {
    formatDate(date) {
      const publicationDate = new Date(date);
      if (isNaN(publicationDate)) {
        return ''; 
      }
      const formattedDate = publicationDate.toISOString().replace('T', ' ').slice(0, 19);
      return formattedDate;
    },
  },
};
</script>


<style scoped>
.publication {
  background-color: #c2c2c267;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #6b6b6b;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
}

.content {
  font-size: 14px;
  text-align: left;
}
.custom-link {
  color:  #4ea746; 
  text-decoration: none; 
  cursor: pointer;
}

.date {
  color: #657786;
  font-size: 12px;
  text-align: right;
}
</style>
