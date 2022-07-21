import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: {
      label: '北京',
      value: 'AREA|88cff55c-aaa4-e2e0'
    }
  },
  getters: {},
  mutations: {
    getNowCity(state, info) {
      state.city = info
    }
  },
  actions: {},
  modules: {}
})
