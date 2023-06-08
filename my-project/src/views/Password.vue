<template>
  <!DOCTYPE html>
  <html>
  <head>
    <title>Recuperar Contraseña</title>
  </head>
  <body>
    <h1>Recuperar Contraseña</h1>

    <div id="app">
      <form @submit.prevent="enviarEmail">
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" v-model="email" required>

        <button type="submit">Enviar</button>
      </form>

      <p>{{ mensaje }}</p>
    </div>
  </body>
  </html>

</template>

<script>


</script>
