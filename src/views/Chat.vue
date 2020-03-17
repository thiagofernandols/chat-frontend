<template>
  <div class="home">
    <Header :title="chat.chatName" />
    <Content :chat="chat"/>
    <Writer :chat="chat"/>
    <div>
      <b>{{$t('chat.logged')}}: </b><i>{{userApp.nickName}}</i>
    </div>
  </div>
</template>

<script>
import Header from '../components/header/Header.vue'
import Content from '../components/content/Content.vue'
import Writer from '../components/writer/Writer.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Chat',
  components: {
    Header,
    Content,
    Writer
  },
  computed: mapState(['userApp']),
  data: function () {
    return {
      chat: {},
      user: {}
    }
  },
  methods: {
    promptNickName: function () {
      this.user.nickName = prompt(this.$t('chat.nickName'))
      if (!this.user.nickName) {
        this.user.nickName = `Observador-${Number(new Date())}`
      }
      this.$store.commit('setUser', this.user)
    },
    initChat: function () {
      this.$showPreload()
      const routePath = this.$router.currentRoute.path
      let paramChatName = this.$router.currentRoute.params.chatName
      if (routePath === '/' || routePath === '/chat-principal') {
        paramChatName = 'chat-principal'
      }
      axios.get('/chats', { params: { name: paramChatName } })
        .then(response => {
          if (response.data.items.length) {
            this.chat = response.data.items[0]
          } else {
            axios.post('/chats', { chatName: paramChatName })
              .then(response => {
                this.chat = response.data
              })
          }
        })
    }
  },
  created: function () {
    if (!this.userApp || !this.userApp.nickName) {
      this.promptNickName()
    }
    this.initChat()
  }
}
</script>
