<template>
  <div class="recommended-users">
    <div v-for="user in users" :key="user.id" class="user">
      <img class="avatar" :src="user.avatar" alt="Avatar">
      <div class="username">{{ user.username }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          username: "john_doe",
          avatar: "john_doe_avatar.png",
        },
        {
          id: 2,
          username: "jane_smith",
          avatar: "jane_smith_avatar.png",
        },
        // Agrega más usuarios aquí
      ],
    };
  },
};
</script>

<style scoped>
.recommended-users {
  background-color: #f5f8fa;
  width: 300px;
  padding: 20px;
}

.user {
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

.username {
  font-weight: bold;
}
</style>
