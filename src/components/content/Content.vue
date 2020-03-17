<template>
  <div class="m-3 chat">
      <b-card-group deck>
        <b-card class="text-left">
          <div v-for="msg in messages" :key="msg._id">
            <b>{{msg.user.nickName}} </b><i>({{ msg.dateMessage | formatDateTime}}) diz:</i>
            <b-card-text>{{msg.message}}</b-card-text>
          </div>
        </b-card>
      </b-card-group>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Content',
  props: {
    chat: Object
  },
  data: function () {
    return {
      messages: [],
      timer: '',
      count: 0
    }
  },
  created () {
    this.$showPreload()
    this.fetchMessageList()
    this.timer = setInterval(this.fetchMessageList, 2000)
  },
  methods: {
    fetchMessageList () {
      if (this.chat._id) {
        axios.get(`/historics/chat/${this.chat._id}`)
          .then(response => {
            this.messages = response.data.items
            if (this.messages.length > this.count && !this.$store.state.myMsg) {
              this.playSound()
            }
          }).then(() => {
            this.scrollToEnd()
            this.count = this.messages.length
            this.$store.state.myMsg = false
          })
      }
    },
    scrollToEnd: function () {
      var elem = this.$el.querySelector('.card-body')
      elem.scrollTop = elem.scrollHeight
    },
    playSound: function () {
      const audio = new Audio()
      audio.src = './sound.mp3'
      audio.play()
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.chat {
  margin-top: 75px!important;
}
.card-body {
  height: 65vh;
  overflow: auto;
}

</style>
