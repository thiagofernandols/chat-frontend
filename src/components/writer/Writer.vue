<template>
  <div>
    <b-container fluid>
      <b-form @submit.prevent="sendMessage">
        <b-row>
          <b-col sm="10">
            <b-form-textarea
              @keyup.enter="sendMessage"
              id="message" :disabled="observer"
              ref="message"
              v-model="message"
              size="lg"
              :placeholder="observer ? `${$t('writer.welcome')}, ${userApp.nickName ? userApp.nickName : 'observador'}` : $t('writer.typeHere')" />
          </b-col>
          <b-col sm="2" style="margin:auto;">
            <div style="display: grid;" v-if="!observer">
              <b-button @click="sendMessage" variant="outline-primary">
                {{ $t('writer.send') }}<b-icon-reply />
              </b-button>
              <b-button @click="logout" variant="outline-primary" class="mt-2">
                {{ $t('writer.logout') }}<b-icon-box-arrow-right />
              </b-button>
            </div>

            <div v-else style="display: grid;">
              <b-button @click="showModal('register')" variant="outline-primary">
                {{ $t('writer.register') }}<b-icon-person />
              </b-button>
              <b-button @click="showModal('login')" variant="outline-primary" class="mt-2">
                {{ $t('writer.login') }}<b-icon-box-arrow-right />
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>

      <b-modal id="modal" ref="modal" :title="$t('writer.login')" @show="resetModal"
        @hidden="resetModal" @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group v-if="actionModal === 'register'" :state="nameState" :label="$t('writer.name')" label-for="name-input" :invalid-feedback="$t('chat.required')" >
            <b-form-input id="name-input" v-model="userModal.nickName" :state="nameState" required @keyup.enter="handleSubmit"/>
          </b-form-group>
          <b-form-group :label="$t('writer.email')" label-for="email-input" :state="emailState" :invalid-feedback="$t('chat.required')">
            <b-form-input id="email-input" v-model="userModal.email" :state="emailState" required  @keyup.enter="handleSubmit"/>
          </b-form-group>
          <b-form-group v-if="actionModal === 'register'" :label="$t('writer.birthday')" :state="birthDayState" label-for="birthday-input" :invalid-feedback="$t('chat.required')">
            <b-form-input id="birthday-input" type="date" v-model="userModal.birthDay" :state="birthDayState" required  @keyup.enter="handleSubmit"/>
          </b-form-group>
        </form>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'Writer',
  computed: mapState(['userApp']),
  props: {
    chat: Object
  },
  data: function () {
    return {
      message: '',
      observer: true,
      actionModal: '',
      userModal: {
        nickName: '',
        email: '',
        birthDay: ''
      },
      nameState: null,
      emailState: null,
      birthDayState: null
    }
  },
  mounted: function () {
    this.$refs.message.focus()
    if (this.userApp.email !== undefined && this.userApp.email !== '') {
      this.observer = false
    }
  },
  methods: {
    sendMessage: function () {
      axios.post('/historics', {
        chat: this.chat._id,
        user: this.userApp._id,
        message: this.message,
        dateMessage: new Date()
      })
        .then(response => {
          this.message = ''
          this.$store.state.myMsg = true
        })
    },
    showModal: function (action) {
      this.actionModal = action
      this.userModal.nickName = this.userApp.nickName
      this.$refs.modal.show()
    },
    authenticate: function (user) {
      axios.post('/users/authenticate', user)
        .then(response => {
          this.$toasted.global.defaultSuccess({ msg: `${this.$t('writer.welcome')}, ${response.data.nickName}` })
          this.$store.commit('setUser', response.data)
          this.observer = false
          this.$refs.modal.hide()
          this.userModal = {
            nickName: '',
            email: '',
            birthDay: ''
          }
          axios.post('/historics', {
            chat: this.chat._id,
            message: `${this.userApp.nickName} entrou no chat...`,
            dateMessage: new Date()
          })
            .then(this.$store.state.myMsg = true)
        })
    },
    logout: function () {
      axios.post('/historics', {
        chat: this.chat._id,
        message: `${this.userApp.nickName} saiu do chat...`,
        dateMessage: new Date()
      })
        .then(() => {
          this.$store.commit('setUser', { nickName: `Observador-${Number(new Date())}` })
          this.observer = true
          this.$store.state.myMsg = true
        })
    },
    checkFormValidity: function () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      this.emailState = valid
      this.birthDayState = valid
      return valid
    },
    resetModal: function () {
      this.name = ''
      this.nameState = null
      this.emailState = null
      this.birthDayState = null
    },
    handleOk: function (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit: function () {
      if (!this.checkFormValidity()) {
        return
      }

      if (this.actionModal === 'register') {
        axios.post('/users', this.userModal)
          .then(response => {
            this.authenticate(this.userModal)
          })
      } else {
        this.authenticate(this.userModal)
      }
    }
  }
}
</script>
