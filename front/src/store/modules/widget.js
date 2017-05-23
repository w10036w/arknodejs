export default {
  state: {
    dialog: '',
    navbar: '',
    footer: ''
  },
  getters: {
    dialog: state => state.dialog
  },
  mutations: {
    DIALOG (state, name) {
      state.dialog = name
    }
  },
  actions: {
    dialog ({ commit }, name) {
      commit('DIALOG', name)
    }
  }
}
