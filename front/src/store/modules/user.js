import api from '../api'
import select from '../select'

const null_user = {
  _id: ''
}

export default {
  state: {
    curr: {},
    curr_topics: [],
    curr_replys: [],
    curr_favorites: [],
    curr_followings: [],
    curr_followers: [],
    curr_is_following: false,
    list: []
  },
  getters: {
    user_curr: state => state.curr,
    user_curr_topics: state => state.curr_topics,
    user_curr_replys: state => state.curr_replys,
    user_curr_favorites: state => state.curr_favorites,
    user_curr_followings: state => state.curr_followings,
    user_curr_followers: state => state.curr_followers,
    user_curr_is_following: state => state.curr_is_following,
    user_list: state => state.list,
  },
  actions: {
    fetch_user ({ commit }, username) {
      return api.fetchItem('user', username).then(res => {
        commit('USER_SET_CURR', res)
        return res
      })
    },
    fetch_user_topics ({ commit, state }, query={}) {
      const authorId = state.curr._id
      query.criteria = query.criteria || JSON.stringify({ authorId })
      query.select = query.select || select.topic.sameUser
      query.sort = query.sort || JSON.stringify({ _id:-1 })
      query.limit = query.limit || 10
      const _init = query._init !==undefined ? query._init : true 
      return api.fetchAll('topic', query).then(res => {
        if (res.code>200) {
          res.name = `fetch_user_topics[${_init?'initial':'more'}] (authorId:${authorId}) failed`
          commit('LOG', res)
        }
        res._init = _init
        commit('USER_SET_CURR_TOPICS', res)
        return res
      })
    },
    fetch_user_favorites ({ commit, state }, query={}) {
      let _id = { $in: state.curr.favorites }
      query.criteria = query.criteria || JSON.stringify({ _id })
      query.select = query.select || select.topic.sameUser
      query.sort = query.sort || JSON.stringify({ _id:-1 })
      query.limit = query.limit || 10
      const _init = query._init !==undefined ? query._init : true

      return api.fetchAll('topic', query).then(res => {
        if (res.code>200) {
          res.name = `fetch_user_favorites[${_init?'initial':'more'}] (userId:${userId}) failed`
          commit('LOG', res)
        }
        res._init = _init
        commit('USER_SET_CURR_FAVORITES', res)
        return res
      })
    },
    fetch_user_replys ({ commit, state }, query={}) {
      const authorId = state.curr._id
      query.criteria = query.criteria || JSON.stringify({ authorId })
      query.sort = query.sort || JSON.stringify({ _id:-1 })
      query.limit = query.limit || 20
      query.skip = query.skip || 0
      const _init = query._init !==undefined ? query._init : true 

      return api.fetchAll('reply', query).then(res => {
        if (res.code>200) {
          res.name = `fetch_user_replys[${_init?'initial':'more'}] (authorId:${authorId}) failed`
          commit('LOG', res)
        }
        res._init = _init
        commit('USER_SET_CURR_REPLYS', res)
        return res
      })
    },

    fetch_user_followings ({ commit, state }, query={}) {
      let followings = state.curr.followings
      if (!followings.length) {
        let res = { code:200, data: [], time: Date.now(), _init:true }
        commit('USER_SET_CURR_FOLLOWINGS', res)
        return res
      }
      query.ids = followings.join('+')
      query.select = query.select || select.user.follower
      query.sort = query.sort || JSON.stringify({ _id:-1 })
      query.limit = query.limit || 30
      const _init = query._init !==undefined ? query._init : true
      return api.fetchAll('user', query).then(res => {
        if (res.code>200) {
          res.name = `fetch_user_followings[${_init?'initial':'more'}] (userId:${state.curr._id}) failed`
          commit('LOG', res)
        }
        res._init = _init
        commit('USER_SET_CURR_FOLLOWINGS', res)
        return res
      })
    },
    fetch_user_followers ({ commit, state }, query={}) {
      let followers = state.curr.followers
      if (!followers.length) {
        let res = { code:200, data: [], time: Date.now(), _init:true }
        commit('USER_SET_CURR_FOLLOWERS', res)
        return res
      }
      query.ids = followers.join('+')
      query.select = query.select || select.user.follower
      query.sort = query.sort || JSON.stringify({ _id:-1 })
      query.limit = query.limit || 30
      const _init = query._init !==undefined ? query._init : true

      return api.fetchAll('user', query).then(res => {
        if (res.code>200) {
          res.name = `fetch_user_followers[${_init?'initial':'more'}] (userId:${state.curr._id}) failed`
          commit('LOG', res)
        }
        res._init = _init
        commit('USER_SET_CURR_FOLLOWERS', res)
        return res
      })
    },
    // needs authorization
    follow_user ({ commit }, { id, action }) {
      return api.follow_user(id, action).then(res => {
        res.name = `${action==='unfollow'?'un':''}follow user(${id})`
        commit('LOG', res)
        return res
      })
    },
    favorite_topic ({ commit }, { id, action }) {
      return api.favorite_topic(id, action).then(res => {
        res.name = `${action==='unfavorite'?'un':''}favorite topic(${id})`
        commit('LOG', res)
        return res
      })
    },
    join_group ({ commit }, { id, action }) {
      return api.join_group(id, action).then(res => {
        res.name = `${action==='leave'?'leave':'join'} group(${id})`
        commit('LOG', res)
        return res
      })
    },
    is_following ({ commit }, { id }) {
      return api.is_following(id).then(res => {
        if (res.code===200) 
          commit('USER_SET_CURR_IS_FOLLOWING', res.data.isFollowing)
      })
    },
    is_favorited ({ commit }, { id }) {
      return api.is_favorited(id)
    },

    update_user ({ commit }, { id, body }) {
      return api.patch('user', { id, body })
    }
  },
  mutations: {
    USER_SET_CURR (state, { code, data }) {
      state.curr = code>200 ? null_user : data
    },
    USER_SET_CURR_TOPICS (state, { data, _init }) {
      if (_init) state.curr_topics = data
      else state.curr_topics.push(...data)
    },
    USER_SET_CURR_REPLYS (state, { data, _init }) {
      if (_init) state.curr_replys = data
      else state.curr_replys.push(...data)
    },
    USER_SET_CURR_FAVORITES (state, { data, _init }) {
      if (_init) state.curr_favorites = data
      else state.curr_favorites.push(...data)
    },
    USER_SET_CURR_FOLLOWINGS (state, { data, _init }) {
      if (_init) state.curr_followings = data
      else state.curr_followings.push(...data)
    },
    USER_SET_CURR_FOLLOWERS (state, { data, _init }) {
      if (_init) state.curr_followers = data
      else state.curr_followers.push(...data)
    },
    USER_SET_CURR_IS_FOLLOWING (state, status) {
      state.curr_is_following = status
    }
    

  }
}
    