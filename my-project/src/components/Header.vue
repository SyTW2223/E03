<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/cerveza">Cerveza Place</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'VueHeader'
}
</script>
