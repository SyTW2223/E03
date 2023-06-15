<template>
  <div>
    <div class="publication" v-for="(publication, index) in sortedPublications" :key="index">
      <div class="user-info">
        <div class="username">@{{ publication.username }}</div>
        <div class="date">{{ formatPublicationDate(publication.date) }}</div>
      </div>
      <div class="content">{{ publication.message }}</div>
      <button v-if="isUserProfileRoute" @click="doDeletePub(publication._id)">Eliminar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      publicationData: []
    };
    
  },
  async created () {
    // const user = this.$route.params.username;
    const routeParams = this.$route.params;

    if (routeParams.userfind) {
      // Ruta /findUser/:username/:userfind
      this.username = routeParams.userfind;
    } else {
      // Ruta /userProfile/:username
      this.username = routeParams.username;
    }

    await this.$store.dispatch('auth/doPublicactions', this.username)

    this.publicationData = this.$store.state.auth.publications
    console.log(this.publicationData)
  },
  computed: {
    sortedPublications() {
      return this.publicationData.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
    isUserProfileRoute() {
      return this.$route.path.includes('/userProfile/');
    },
  },
  methods: {
    formatPublicationDate(date) {
      const parsedDate = new Date(date);
      
      if (isNaN(parsedDate.getTime())) {
        return '';
      }
      
      const formattedDate = parsedDate.toISOString().replace('T', ' ').slice(0, 19);
      return formattedDate;
    },
    async doDeletePub(publicationId) {
    // Llama a tu acción o método correspondiente para eliminar la publicación
    // Puedes utilizar el id de la publicación para identificarla y eliminarla de la lista de publicaciones
      console.log(publicationId)
    // Por ejemplo, si estás utilizando Vuex como store, puedes dispatch una acción que maneje la eliminación de la publicación
    await this.$store.dispatch('auth/doDeletePub', publicationId)
    .then(() => {
      // La publicación se eliminó correctamente, puedes realizar acciones adicionales si es necesario
        // Vuelve a cargar las publicaciones actualizadas
      // window.location.reload();
      console.log(this.$store.state.auth.message);
    })
    .catch(error => {
      // Ocurrió un error al eliminar la publicación, puedes manejarlo o mostrar un mensaje de error
      console.error('Error al eliminar la publicación:', error);
    });
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

.date {
  color: #657786;
  font-size: 12px;
  text-align: right;
}
</style>
