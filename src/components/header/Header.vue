<template>
  <div class="navbar">
    <h1> {{ title }}</h1>
  </div>
</template>

<script>

export default {
  name: 'Header',
  props: {
    title: String
  }
}
</script>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: rgb(228, 228, 228);
  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1032;
}
.navbar h1 {
  margin: auto;
}
</style>
