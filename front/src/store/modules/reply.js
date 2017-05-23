import api from '../api'

export default {
  state: {
    curr: {}
  },
  getters: {
    reply_curr: state => state.curr,
    reply_list: state => state.list
  },
  actions: {
    create_reply ({ commit }, { body }) {
      return api.post('reply', body).then(res => {
        res.name = 'create_reply'
        commit('LOG', res)
        return res
      })
    },
    update_reply ({ commit }, { id, body }) {
      return api.patch('reply', { id, body }).then(res => {
        res.name = `update_reply (${id})`
        commit('LOG', res)
        return res
      })
    },
    reply_reply ({ commit }, username) {
      commit('REPLY_REPLY', username)
    },
    edit_reply ({ commit, rootState }, id) {
      let list = rootState.topic.curr_replys
      if (list.length && id) {
        commit('EDIT_REPLY', { list, id })
      }
    }
  },
  mutations: {
    REPLY_SET_LIST (state, { code, data }) {
      if (code === 200 && data.length)
        state.list = data
      else state.list = []
    },
    REPLY_REPLY (state, username) {
      state.curr = {replyToUsername:username}
    },
    EDIT_REPLY (state, { list, id }) {
      if (!id) {
        state.curr = {}
        return
      }
      let i = list.length
      while (i--) {
        if (list[i]._id === id) state.curr = list[i]
      }
    }
  }
}
