// middleware
const { rJson } = resolve('util/ext')
const { vObjectId } = resolve('util/validator')
const { models, rights, io } = resolve('db')
const enum_rights = rights.enum
const right = rights.reply
const io_reply = io(models.reply)
const io_topic = io(models.topic)
const io_user = io(models.user)
const findUserById = require('./user')._findById
const { readFilter, editFilter } = resolve('util/right')

module.exports = {
  findByTopicAuthor: async ctx => {
    let { criteria, limit=20, skip, sort } = ctx.query
    criteria = JSON.parse(criteria)
    if (!criteria)
      return ctx.body = rJson(400, 'invalid query: no criteria')
    let select = readFilter(0, right, enum_rights.lteGuests)
    let opts = {}
    if (limit) opts.limit = parseInt(limit)
    if (skip) opts.skip = parseInt(skip)
    //opts.sort = sort ? JSON.parse(sort) : { _id: -1 }
    
    let resp = await io_reply.find(criteria, select, opts)
    if (resp.code>200 || !resp.data.length) return ctx.body = resp
    let i = resp.data.length
    // try cache
    let cache = {}, err
    while (i--) {
      let reply = resp.data[i]
      let aid = reply.authorId
      let tid = reply.topicId
      if (aid && criteria.topicId) {
        let resp_author = cache[aid] || await io_user.findById(aid, "_id avatar username ")
        
        if (resp_author.code>200 || !resp_author.data)
          err = `author (${aid}) of reply(${reply._id}) is not found`
          
        if (!cache[aid]) cache[aid] = resp_author
        reply.authorInfo = cache[aid].data
      } 
      if (tid && criteria.authorId) {
        let resp_topic = cache[tid] || await io_topic.findById(tid, "_id title path thumbnail")
        
        if (resp_topic.code>200 || !resp_topic.data)
          err = `topic (${tid}) of reply(${reply._id}) is not found`
          
        if (!cache[tid]) cache[tid] = resp_topic
        reply.topicInfo = cache[tid].data
      }
    }
    return ctx.body = resp
  },

  create: async ctx => {
    let body = ctx.request.body
    body = editFilter(body, right, enum_rights.lteOwner)
    if (!body)
      return ctx.body = rJson(400, 'invalid body: null or illegal keys')
    // attach additional attributes safely
    body.authorId = ctx.state.user._id

    // TODO check if allow comments
    const topicId = body.topicId
    let resp_topic = await io_topic.findById(topicId)
    if (resp_topic.code>200) return ctx.body = resp_topic
    if (!resp_topic.data) return ctx.body = rJson(500, 'topic not found')
    if (!resp_topic.data.allowComment) return ctx.body = rJson(403, 'topic not allows comment')

    // TODO if async, should rollback?
    let resp = await io_reply.create(body)
    if (resp.code>200) return ctx.body = resp
    let resp_count = await io_topic.updateById(body.topicId, { $inc: { replyCount: 1 } })
    if (resp_count.code>200) return 
    return ctx.body = resp
  },

  updateById: async ctx => {
    const id = ctx.params.id
    if (!id || !vObjectId(id))
      return ctx.body = rJson(400, 'invalid params: id')
    let resp = await io_reply.findById(id)
    if (resp.code>200) return ctx.body = rJson(400, 'reply does not exist')
    if (resp.data.authorId.toString() !== ctx.state.user._id)
      return ctx.body = rJson(401, 'you are not the owner')

    let body = ctx.request.body
    body = editFilter(body, right, enum_rights.lteOwner)
    if (!body)
      return ctx.body = rJson(400, 'invalid body: null or illegal keys')
    // attach additional attributes safely
    body.updateAt = Date.now()

    return ctx.body = await io_reply.updateById(id, body)
  }
}
