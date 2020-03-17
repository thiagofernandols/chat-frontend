import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import CripVueLoading from 'crip-vue-loading'

axios.defaults.baseURL = process.env.API_ENDPOINT || 'http://localhost:3000'

Vue.use(CripVueLoading, {
  color: '#007bff',
  failColor: '#dc3545',
  height: '3px'
})

const success = res => {
  Vue.prototype.$loading.complete()
  store.dispatch('hidePreload')
  return res
}

const error = err => {
  store.dispatch('hidePreload')
  Vue.prototype.$loading.fail()
  if (!err.response) {
    Vue.toasted.global.defaultError({ msg: 'Unavailable service' })
  } else {
    if (err.response.status === 403) {
      Vue.toasted.global.defaultError({ msg: err.response.data.message })
    }
    Vue.toasted.global.defaultError({ msg: err.response.data.errors[0].message ? err.response.data.errors[0].message : err.response.data.message })
    return Promise.reject(err)
  }
}

axios.interceptors.response.use(success, error)

axios.interceptors.request.use(async (config) => {
  if (!config.url.includes('/historics/chat/')) {
    Vue.prototype.$loading.start()
  }
  if (store.state.userApp && store.state.userApp.accessToken) {
    config.headers.Authorization = `Bearer ${store.state.userApp.accessToken}`
  }
  return config
})
