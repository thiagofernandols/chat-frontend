<template>
  <div class="m-3 chat">
      <b-card-group deck>
        <b-card class="text-left">
          <div v-for="msg in messages" :key="msg._id">
            <b>{{msg}}Thiago </b><i>diz:</i>
            <b-card-text>wolf ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </div>
          <b>Thiago </b><i>(16/03/2020 22:28) diz:</i>
            <b-card-text>wolf ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        </b-card>
      </b-card-group>
    </div>
</template>

<script>

export default {
  name: 'Content',
  data: function () {
    return {
      messages: []
    }
  }
}
</script>

<style scoped>
.chat {
  margin-top: 75px!important;
}
.card-body {
  min-height: 65vh;
}

</style>
