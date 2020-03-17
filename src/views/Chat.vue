<template>
  <div class="home">
    <Header :title="chat.chatName" />
    <Content :chat="chat"/>
    <Writer :chat="chat"/>
    <div>
      <b>{{$t('chat.logged')}}: </b><i>{{userApp.nickName}}</i>
    </div>
    <b-modal id="modalNickName" ref="modalNickName" :title="$t('chat.nickName')" @hidden="handleOk" @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleOk">
          <b-form-group :label="$t('writer.name')" label-for="name-input" >
            <b-form-input id="name-input" v-model="nameModal" @keyup.enter="handleOk"/>
          </b-form-group>
        </form>
      </b-modal>
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
      nameModal: '',
      chat: {},
      user: {}
    }
  },
  methods: {
    handleOk: function () {
      this.user.nickName = this.nameModal
      if (!this.user.nickName) {
        this.user.nickName = `Observador-${Number(new Date())}`
      }
      this.$store.commit('setUser', this.user)
      this.$refs.modalNickName.hide()
    },
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
  mounted: function () {
    if (!this.userApp || !this.userApp.email) {
      this.$refs.modalNickName.show()
    }
  },
  created: function () {
    this.initChat()
  }
}
</script>
