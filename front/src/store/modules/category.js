import api from '../api'

export default {
  state: {
    list: [],
  },
  getters: {
    category_list: state => state.list,
  },
  actions: {
    fetch_categories ({ commit }, query={}) {
      return api.fetchAll('category', query).then(res => {
        commit('CATEGORY_SET_LIST', res)
        return res
      })
    },
    create_category ({ commit }, body) {
      return api.post('category', body).then(res => {
        commit('LOG', res)
        return res
      })
    }
  },
  mutations: {
    CATEGORY_SET_LIST (state, { code, data }) {
      if (code === 200 && data.length)
        state.list = data
      else state.list = []
    }
  }
}
