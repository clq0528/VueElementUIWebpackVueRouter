import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import system from './modules/system'
import user from './modules/user'
import tabs from './modules/tabs'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    system,
    user,
    tabs
  },
  getters
})

export default store
