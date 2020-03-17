import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

Vue.prototype.$showPreload = function () {
  this.$store.commit('preload', true)
}

Vue.prototype.$hidePreload = function () {
  this.$store.commit('preload', false)
}

export default new Vuex.Store({
  state: {
    preload: false,
    userApp: {},
    myMsg: false
  },
  mutations: {
    preload (store, value) {
      store.preload = value
    },
    setUser (state, user) {
      state.userApp = user
    }
  },
  actions: {
    showPreload (dispatch) {
      dispatch.commit('preload', true)
    },
    hidePreload (dispatch) {
      dispatch.commit('preload', false)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
