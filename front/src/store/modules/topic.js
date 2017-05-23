import api from '../api'

const null_topic = {
  _id: "",
  title: "Topic Not Found",
  path: "topic-not-found",
  thumbnail: '',
  content: "",
  authorId: "",
  hidden: false,
  updateAt: '',
  createAt: Date.now(),
  lastReplyAt: '',
  visitCount: 0,
  replyCount: 0,
  likedUsers: [ ],
  status: 1,
  tags: [ ],
  type: "text"
}
export default {
  state: {
    list: [],
    list_next: [],
    curr: { authorInfo: {}, categoryInfo: {}, tagsInfo: [] },
    curr_replys: [],
    prev: {},
    next: {},
  },
  getters: {
    topic_list: state => state.list,
    topic_list_next: state => state.list_next,
    topic_curr: state => state.curr,
    topic_curr_replys: state => state.curr_replys,
    topic_prev: state => state.prev,
    topic_next: state => state.next,
  },
  actions: {
    fetch_topic ({ commit }, { path, query }) {
      return api.fetchItem('topic', path, query).then(res => {
        commit('TOPIC_SET_CURR', res)
        // with prev & next
        if (res.code>200) return Promise.reject(res)
        let id = res.data._id
        
        const c_prev = { _id: { $lt: id }, hidden: false }
        const c_next = { _id: { $gt: id }, hidden: false }
        const select = '_id title path'
        return Promise.all([
          api.fetchAll('topic', { criteria: c_prev, select, 
            sort:{ _id: -1 }, limit: 1 }),
          api.fetchAll('topic', { criteria: c_next, select, limit: 1 }),
        ]).then(resp => {
          let prev = resp[0]
          let next = resp[1]
          commit('TOPIC_SET_PREV', prev)
          commit('TOPIC_SET_NEXT', next)
          return res
        })
      })
    },
    fetch_topic_replys ({ commit, state }, query={}) {
      const topicId = state.curr._id
      query.criteria = query.criteria || JSON.stringify({ topicId })
      query.sort = query.sort || JSON.stringify({ _id:-1 })
      query.limit = query.limit || 30
      query.skip = query.skip || 0
      const _init = query._init || true 

      return api.fetchAll('reply', query).then(res => {
        if (res.code>200) {
          res.name = `fetch_topic_replys[${_init?'initial':'more'}] (topicId:${topicId}) failed`
          commit('LOG', res)
        }
        res._init = _init
        commit('TOPIC_SET_CURR_REPLYS', res)
        return res
      })
    },
    fetch_topics ({ commit }, query={} ) {
      query.sort = query.sort || JSON.stringify({ _id: -1 })
      query.limit = query.limit || 30
      return api.fetchAll('topic', query).then(res => {
        commit(query.count ? 'TOPIC_SET_LIST_NEXT' :
          'TOPIC_SET_LIST', res)
        return res
      })
    },
    create_topic ({ commit }, body) {
      return api.post('topic', body).then(res => {
        res.name = 'create_topic'
        commit('LOG', res)
        return res
      })
    },
    update_topic ({ commit }, { id, body }) {
      return api.patch('topic', { id, body }).then(res => {
        res.name = 'update_topic (' + id + ')'
        commit('LOG', res)
        return res
      })
    },
    _favorite_topic ({ commit }, { userId, action }) {
      return commit('_TOPIC_FAVORITE_CURR', { userId, action })
    }
  },
  mutations: {
    TOPIC_SET_CURR (state, { code, data }) {
      if (code === 200 && data) {
        data.visitCount++
        state.curr = data
      } else state.curr = null_topic
    },
    TOPIC_SET_CURR_REPLYS (state, { code, data }) {
      if (code === 200) {
        state.curr_replys = data
      } else state.curr_replys = []
    },
    TOPIC_SET_PREV (state, { code, data }) {
      if (code === 200 && data.length) {
        state.prev = data[0]
      } else state.prev = null_topic
    },
    TOPIC_SET_NEXT (state, { code, data }) {
      if (code === 200 && data.length) {
        state.next = data[0]
      } else state.next = null_topic
    },
    TOPIC_SET_LIST (state, { code, data }) {
      if (code === 200 && data.length)
        state.list = data
      else state.list = []
    },
    TOPIC_SET_LIST_NEXT (state, { code, data }) {
      if (code === 200 && data.length)
        state.list_next = data
      else state.list_next = []
    },
    _TOPIC_FAVORITE_CURR (state, { userId, action }) {
      if (action === 'unfavorite') {
        let i = state.curr.likedUsers.indexOf(userId)
        state.curr.likedUsers.splice(i, 1)
      } else
        state.curr.likedUsers.push(userId)
    }
  }
}