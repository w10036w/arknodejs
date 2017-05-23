// middleware
const mongoose = require('mongoose')
const { rJson } = resolve('util/ext')
const { vObjectId } = resolve('util/validator')
const { models, rights, io } = resolve('db')
const enum_rights = rights.enum
const right = rights.user
const io_user = io(models.user)
const io_topic = io(models.topic)
const io_group = io(models.group)
const { readFilter, editFilter } = resolve('util/right')

module.exports = {
  // TODO: cache in redis
  findByUsername: async ctx => {
    const username = ctx.params.username
    if (!username)
      return ctx.body = rJson(400, 'invalid params: username')
    let select = ctx.query.select
    let criteria = { username }
    select = readFilter(select, right, enum_rights.lteGuests)
    return ctx.body = await io_user.findOne(criteria, select)
  },
  findByIds: async ctx => {
    let { ids, select, limit, skip, sort }  = ctx.query
    if (!ids)
      return ctx.body = rJson(400, 'invalid id array')
    ids = ids.split('+')
    criteria = { _id: { $in: ids.map(o => mongoose.Types.ObjectId(o)) } }
    select = readFilter(select, right, enum_rights.lteGuests)
    return ctx.body = await io_user.find(criteria, select, { limit, skip, sort })
  },

  updateById: async ctx => {
    const id = ctx.params.id
    if (!id || !vObjectId(id))
      return ctx.body = rJson(400, 'invalid params: id')
    if (id !== ctx.state.user._id)
      return ctx.body = rJson(401, 'you are not the owner')
    let body = ctx.request.body
    body = editFilter(body, right, enum_rights.lteOwner)
    if (!body)
      return ctx.body = rJson(400, 'invalid body: null or illegal keys')

    // attach pushitional attributes safely
    body.updateAt = Date.now()
    return ctx.body = await io_user.updateById(id, body)
  },

  isFollowing: async ctx => {
    const id = ctx.state.user._id
    const { userId } = ctx.params
    if (!userId || !vObjectId(userId))
      return ctx.body = rJson(400, 'invalid params: userId')
    
    let resp = await io_user.findById(id, 'followings')
    if (resp>200) return resp
    let bFollowing = resp.data.followings.indexOf(userId)!==-1
    return ctx.body = rJson(200, { isFollowing: bFollowing })
  },
  isFavorited: async ctx => {
    const id = ctx.state.user._id
    const { topicId } = ctx.params
    if (!topicId || !vObjectId(topicId))
      return ctx.body = rJson(400, 'invalid params: topicId')
    
    let resp = await io_user.findById(id, 'favroites')
    if (resp>200) return resp
    let bFavorited = resp.data.favroites.indexOf(topicId)!==-1
    return ctx.body = rJson(200, { isFavroited: bFavorited })
  },
  /** customized */
  // dual io across user to user
  followUser: async ctx => {
    const id = ctx.state.user._id
    const { userId } = ctx.params
    if (!userId || !vObjectId(userId))
      return ctx.body = rJson(400, 'invalid params: userId')

    let action = ctx.query.action // follow by default
    if (!action || action=='follow') {
      let push_following = await io_user.updateById(id, { $push: { followings: userId } } )
      let push_follower = await io_user.updateById(userId, { $push: { followers: id } } )
      if (push_follower.code>200) return ctx.body = push_follower
      if (push_following.code>200) return ctx.body = push_following
      return ctx.body = rJson(200, `user (${id}) follows user (${userId})`)
    } else {
      let pull_following = await io_user.updateById(id, { $pull: { followings: userId } } )
      let pull_follower = await io_user.updateById(userId, { $pull: { followers: id } } )
      if (pull_follower.code>200)
        return ctx.body = pull_follower
      else if (pull_following.code>200)
        return ctx.body = pull_following
      return ctx.body = rJson(200, `user (${id}) unfollows user (${userId})`)
    }
  },

  // dual io across user and topic
  favoriteTopic: async ctx => {
    const id = ctx.state.user._id
    const { topicId }  = ctx.params
    if (!topicId || !vObjectId(topicId))
      return ctx.body = rJson(400, 'invalid params: topicId')
    
    let action = ctx.query.action // like by default
    if (!action || action!=='unfavorite') {
      let push_favorite = await io_user.updateById(id, { $push: { favorites: topicId } })
      let push_likedUser = await io_topic.updateById(topicId, { $push: { likedUsers: id } })
      
      if (push_favorite.code>200) 
        return ctx.body = push_favorite
      if (push_likedUser.code>200) 
        return ctx.body = push_likedUser

      return ctx.body = rJson(200, `user (${id}) likes topic (${topicId})`)
    } else {
      let pull_favorite = await io_user.updateById(id, { $pull: { favorites: topicId } })
      let pull_likedUser = await io_topic.updateById(topicId, { $pull: { likedUsers: id } })
      
      if (pull_favorite.code>200) return ctx.body = pull_favorite
      if (pull_likedUser.code>200) return ctx.body = pull_likedUser
      return ctx.body = rJson(200, `user (${id}) dislikes topic (${topicId})`)
    }
  },

  // user & group
  joinGroup: async ctx => {
    const id = ctx.state.user._id
    const { groupId }  = ctx.params
    if (!groupId || !vObjectId(groupId))
      return ctx.body = rJson(400, 'invalid params: groupId')
    
    let action = ctx.query.action // like by default
    if (!action || action=='join') {
      let push_group = await io_user.updateById(id, { $push: { group: groupId } })
      let push_group_member = await io_group.updateById(groupId, { $push: { members: id } })
      
      if (push_group.code>200) return ctx.body = push_group
      if (push_group_member.code>200) return ctx.body = push_group_member
      return ctx.body = rJson(200, `user (${id}) joins group (${groupId})`)
    } else {
      let pull_group = await io_user.updateById(id, { $pull: { favorites: groupId } })
      let pull_group_member = await io_group.updateById(groupId, { $pull: { members: id } })
      
      if (pull_group.code>200) return ctx.body = pull_group
      if (pull_group_member.code>200) return ctx.body = pull_group_member
      return ctx.body = rJson(200, `user (${id}) leaves group (${groupId})`)
    }
  },

  // TODO: cache in redis
  _findById: async _id => {
    return await io_user.findOne(
      { _id, hidden: false },
      { _id:0, username: 1, avatar: 1 })
  }
}
