<template>
  <footer class="footer-area overlay">
    <v-container> </v-container>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      date: null,
    }
  },
  created() {
    this.data = new Date().getFullYear()
  },
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
