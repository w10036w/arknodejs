import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import topic from './modules/topic'
import reply from './modules/reply'
import category from './modules/category'
import tag from './modules/tag'
import widget from './modules/widget'
import message from './modules/message'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user, topic, reply, category, tag, message, widget },
  state: {
    loading: false,
    progress: 0,
    login_user: {},
    logs: [],
    flash: [],
    ws: null
  },
  getters: {
    login_user: state => state.login_user,
    logs: state => state.logs,
    flash: state => state.flash,
  },
  actions: {
    login ({ commit }, user) {
      commit('LOGIN', user)
      return user
    },
    logout ({ commit }) {
      commit('LOGOUT')
    },
    logger ({ commit }, res) {
      commit('LOG', res)
    },
    clear_flash ({ commit }) {
      commit('CLEAR_FLASH')
    },
    cdn_token ({ commit }, name) {
      return api.cdnToken(name)
    },
    cdn_img_upload({ commit }, { key, file, token }) {
      return api.cdnImgUpload(key, file, token)
    },
    ws_connect({ commit }, ws) {
      commit('WS_CONNECT', ws)
    }
  },
  mutations: {
    LOGIN (state, user) {
      state.login_user = user
    },
    LOGOUT (state) {
      state.login_user = null
    },
    LOG (state, res) {
      state.logs.push(res)
      state.flash.push(res)
      setTimeout(() => {
        const i = state.flash.indexOf(res)>-1
        if (i) state.flash.splice(i, 1)
      }, 5000)
    },
    CLEAR_FLASH (state) {
      state.flash = []
    },
    WS_CONNECT (state, ws) {
      state.ws = ws
    }
  }
})
