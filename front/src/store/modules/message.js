import api from '../api'

export default {
  state: {
    list: [],
  },
  getters: {
    message_list: state => state.list,
  },
  actions: {
    fetch_messages ({ commit }, recieverId, query={}) {
      query.criteria = query.criteria || { beRead: false }
      query.limit = query.limit || 11
      return api.fetchItem('message', recieverId, query).then(res => {
        commit('MESSAGE_SET_LIST', res)
        return res
      })
    },
    read_message ({ commit }, id) {
      let body = { beRead: true }
      return api.patch('message', { id, body }).then(res => {
        commit('MESSAGE_READ_ONE', id)
        return res
      })
    }
  },
  mutations: {
    MESSAGE_SET_LIST (state, { code, data }) {
      if (code === 200 && data.length)
        state.list = data
      else state.list = []
    },
    MESSAGE_READ_ONE (state, id) {
      let i = state.list.findIndex(e => e._id===id)
      state.list.splice(i, 1)
    }
  }
}
