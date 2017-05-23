import axios from 'axios'
import qs from 'querystring'
import api from 'create-api'

const prefix = api.prefix
const isServer = api.isServer

export default {
  fetchItem (model, param, query) {
    const uri = `${prefix}/${model}/${param}?${qs.stringify(query)}`
    // if (isServer && api.cache.has(uri)) {
    //   return Promise.resolve(api.cache.get(uri))
    // }
    return axios.get(uri).then(resp => {
      const json = resp.data
      if (isServer) api.cache.set(uri, json)
      return json
    })
  },
  fetchAll (model, query) {
    const target = `${prefix}/${model}`
    const key = target + JSON.stringify(query)
    // if (isServer && api.cache.has(key)) {
    //   return Promise.resolve(api.cache.get(key))
    // }
    return axios.get(target, { params: query }).then(resp => {
      const result = resp.data
      if (isServer) api.cache.set(key, result)
      return result
    })
  },
  post (model, body) {
    const uri = `${prefix}/${model}`
    return axios.post(uri, body).then(resp => resp.data)
  },
  patch (model, { id, body }) {
    const uri = `${prefix}/${model}/${id}`
    return axios.patch(uri, body).then(resp => resp.data)
  },

  // user interaction
  follow_user (userId, action) {
    const uri = `${prefix}/user/following/${userId}?action=${action}`
    return axios.patch(uri).then(resp => resp.data)
  },
  favorite_topic (topicId, action) {
    const uri = `${prefix}/user/favorite/${topicId}?action=${action}`
    return axios.patch(uri).then(resp => resp.data)
  },
  join_group (groupId, action) {
    const uri = `${prefix}/user/group/${groupId}?action=${action}`
      
    return axios.patch(uri).then(resp => resp.data)
  },
  is_following (userId) {
    const uri = `${prefix}/user/is_following/${userId}`
    return axios.get(uri).then(resp => resp.data)
  },
  is_favorited (topicId) {
    const uri = `${prefix}/topic/is_favorited/${topicId}`
    return axios.get(uri).then(resp => resp.data)
  },

  cdnToken (name) {
    return axios.post(`${prefix}/cdn/token?name=${name}`).then(resp => resp.data)
  },
  cdnImgUpload (key, file, token) {
    // ok ....
    let formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('key', key)
    formData.append('token', token)
    return axios.post('//up.qbox.me/', formData).then(res => res.data)
  },
  cdnVideoUpload (key, file, token) {

  },
}