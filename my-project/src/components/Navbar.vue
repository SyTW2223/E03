<template>
<nav class="navbar">
    <div class="navbar-logo">Logo</div>
    <div class="navbar-links">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" class="btn btn-outline-dark">Login</button>
        <button type="button" class="btn btn-dark">Register</button>
      </div>
    </div>
    <button class="sidebar-toggle" @click="toggleSidebar" v-if="isMobile">
      <i class="bi bi-list"></i> <!-- Agrega el icono de menú aquí -->
    </button>
  </nav>
</template>

<script lang="ts">
export default {
  computed: {
    isMobile() {
      return window.innerWidth <= 768;
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #1da1f2;
  display: flex;
  align-items: center;
  padding: 10px;
}

.navbar-logo {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: auto;
}

.navbar-links a {
  color: #ffffff;
  margin-right: 10px;
  text-decoration: none;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 10px;
}
</style>
