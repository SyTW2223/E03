<template>
  <div>
    <h1>Mi cerveza</h1>
    <p>El título es: {{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'CervezaView_',
  data () {
    return {
      title: ''
    }
  },
  mounted () {
    fetch(process.env.VUE_APP_API_URL + '/api')
      .then(res => res.json())
      .then(res => {
        this.title = res.title
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>
