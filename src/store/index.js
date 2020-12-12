import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_USER = 'TOKEN_USER'
export default new Vuex.Store({
  state: {
    // 用户登录的数据  token等等
    // user: null
    // 使用的时候从本地拿
    // user: JSON.parse(window.localStorage.getItem(TOKEN_USER))
    user: getItem(TOKEN_USER)

  },
  mutations: {
    setUser(state, data) {
      state.user = data

      // 防止刷新丢失 存到本地
      // window.localStorage.setItem(TOKEN_USER, JSON.stringify(state.user))
      setItem(TOKEN_USER, state.user)

    }
  },
  actions: {
  },
  modules: {
  }
})
