import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import CripVueLoading from 'crip-vue-loading'

axios.defaults.baseURL = process.env.API_ENDPOINT || 'http://localhost:3000'

Vue.use(CripVueLoading, {
  axios,
  color: '#007bff',
  failColor: '#dc3545',
  height: '3px'
})
Vue.extend({
  methods: {
    addRequest (e) {
      this.$loading.start()
    },
    completeRequest () {
      this.$loading.complete()
    },
    failRequest () {
      this.$loading.fail()
    }
  }
})

const success = res => {
  store.dispatch('hidePreload')
  return res
}
const error = err => {
  store.dispatch('hidePreload')
  if (!err.response) {
    Vue.toasted.global.defaultError({ msg: 'Unavailable service' })
  } else {
    if (err.response.status >= 400 && err.response.status < 500) {
      Vue.toasted.global.defaultError({ msg: err.response.data.message })
    } else {
      Vue.toasted.global.defaultError({ msg: err.response.data.errors[0].message })
    }
    return Promise.reject(err)
  }
}

axios.interceptors.response.use(success, error)

axios.interceptors.request.use(async (config) => {
  if (store.state.userApp && store.state.userApp.accessToken) {
    config.headers.Authorization = `Bearer ${store.state.userApp.accessToken}`
  }
  return config
})
