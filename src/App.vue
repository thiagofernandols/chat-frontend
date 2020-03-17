<template>
  <div id="app">
    <Loading :active.sync="this.$store.state.preload" :is-full-page="true" :width="45" :color="'#007bff'"/>
    <router-view/>
  </div>
</template>
<script>

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'App',
  components: { Loading }
}
</script>
<style>
#app {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
