<template>
  <div>
    <div v-for="(publication, index) in sortedPublications" :key="index">
      <div class="publication" v-for="(item, subIndex) in publication" :key="subIndex">
        <div class="user-info">
          <div class="username">
            <router-link v-if="ownuser !== item.username" :to="`/findUser/${ownuser}/${item.username}`" class="custom-link">@{{ item.username }}</router-link>
            <router-link v-else :to="`/userProfile/${ownuser}`" class="custom-link">@{{ item.username }}</router-link>
          </div>
          <div class="date">{{ formatPublicationDate(item.date) }}</div>
        </div>
        <div class="content">{{ item.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publicationData: [],
      ownuser: this.$store.state.auth.user.username
    };
  },
  async created() {
    await this.$store.dispatch('auth/doAllPublicactions');
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
    formatPublicationDate(date) {
      const publicationDate = new Date(date);
      if (isNaN(publicationDate)) {
        return ''; // O cualquier valor predeterminado que desees mostrar para fechas no válidas
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
  color:  #4ea746; /* Cambia el color del enlace según tus necesidades */
  text-decoration: none; /* Elimina el subrayado del enlace */
  cursor: pointer; /* Muestra el cursor como puntero */
}

.date {
  color: #657786;
  font-size: 12px;
  text-align: right;
}
</style>
