import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './config/i18n'

import './config/bootstrap'
import './config/toasted'
import './config/axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
