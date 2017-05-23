import api from '../api'

export default {
  state: {
    list: [],
  },
  getters: {
    tag_list: state => state.list,
  },
  actions: {
    fetch_tags ({ commit }, query={}) {
      return api.fetchAll('tag', query).then(res => {
        commit('TAG_SET_LIST', res)
        return res
      })
    },
    create_tag ({ commit }, body) {
      return api.post('tag', body).then(res => {
        commit('LOG', res)
        return res
      })
    }
  },
  mutations: {
    TAG_SET_LIST (state, { code, data }) {
      if (code === 200 && data.length)
        state.list = data
      else state.list = []
    }
  }
}
