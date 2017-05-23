const { rJson } = resolve('util/ext')
const { vObjectId } = resolve('util/validator')
const { models, rights, io } = resolve('db')
const enum_rights = rights.enum
const right = rights.topic
const io_topic = io(models.topic)
const findUserById = require('./user')._findById
const findTagsByIds = require('./tag')._findByIds
const findCategoryById = require('./category')._findById
const { readFilter, editFilter } = resolve('util/right')
const { marked } = resolve('util/marked')

const { bSigned } = resolve('middleware/auth')

module.exports = {
  //find: async ctx => {
  //  let { criteria, select, sort, skip, limit } = ctx.query
  //  criteria = criteria ? JSON.parse(criteria) : {}
  //  select = readFilter(select, right, enum_rights.lteGuests)
  //  return ctx.body = await io_topic.find(criteria, select, { sort, skip, limit })
  //},
  find: async ctx => {
    let { criteria, select, sort, skip, limit } = ctx.query
    criteria = criteria ? JSON.parse(criteria) : {}
    criteria.hidden = false
    select = readFilter(select, right, enum_rights.lteGuests)
      .replace('content ', '')
    sort = sort ? JSON.parse(sort) : null
    let resp_topics = await io_topic.find(criteria, select, { sort, skip, limit })

    if (resp_topics.code !== 200) return ctx.body = resp_topics
    let topics = resp_topics.data
    let i = topics.length
    while (i--) {
      let { authorId, tags, category, content, type } = topics[i]
      if (type === 'md' && content)
        topics[i].content = marked(topics[i].content)
      if (authorId) {
        let resp_author = await findUserById(authorId)
        if (resp_author.code>200 || !resp_author.data) 
          log.error(`author(${authorId}) is not found`)
        topics[i].authorInfo = resp_author.data
      }
      if (category) {
        let resp_category = await findCategoryById(category, "_id path name ")
        if (resp_category.code !== 200 || !resp_category.data) 
          return ctx.body = resp_category
        topics[i].categoryInfo = resp_category.data
      }
      if (tags && tags.length) {
        let resp_tag = await findTagsByIds(tags, "_id path name ")
        if (resp_tag.code>200 || !resp_tag.data.length)
          return ctx.body = resp
        topics[i].tagsInfo = resp_tag.data
      } else topics[i].tagsInfo = []
    }
    return ctx.body = rJson(200, 'topic.find', topics)
  },

  findByPath: async (ctx, next) => {
    let path = ctx.params.path
    if (!path) return ctx.body = rJson(400, 'invalid params: path')
    let { select, origin, checkOwner } = ctx.query
    select = readFilter(select, right, enum_rights.lteGuests)

    let resp = await io_topic.findOne({ path, hidden:false }, select)
    if (resp.code !== 200 || !resp.data) 
      return ctx.body = resp

    let { _id, authorId, tags, category, type, content } = resp.data
    // marked
    if (type === 'md' && !origin) // do nothing if origin is true
      resp.data.content = marked(content)
    // get infos
    //let data = Object.assign({}, resp.data._doc) // _doc ???
    let data = resp.data
    if (authorId) {
      let resp_author = await findUserById(authorId)
      if (resp_author.code !== 200 || !resp_author.data) 
        return ctx.body = resp_author
      data.authorInfo = resp_author.data
      
    }
    if (tags && tags.length) {
      let resp_tag = await findTagsByIds(tags, "_id path name ")
      if (resp_tag.code !== 200 || !resp_tag.data) 
        return ctx.body = resp_tag
      data.tagsInfo = resp_tag.data
    }
    if (category) {
      let resp_category = await findCategoryById(category, "_id path name ")
      if (resp_category.code !== 200 || !resp_category.data) 
        return ctx.body = resp_category
      data.categoryInfo = resp_category.data
    }
    // update pv
    if (ctx.headers['user-agent']) // no crawlers
      io_topic.updateById(_id, { $inc: { visitCount: 1 } })
      
    return ctx.body = rJson(200, 'topic.findById', data)
  },

  create: async ctx => {
    let body = ctx.request.body
    body = editFilter(body, right, enum_rights.lteOwner)
    if (!body)
      return ctx.body = rJson(400, 'invalid body: null or illegal keys')

    body.authorId = ctx.state.user._id
    return ctx.body = await io_topic.create(body)
  },
  create_by_editor: async ctx => {
    let body = ctx.request.body
    body = editFilter(body, right, enum_rights.lteEditor)
    if (!body)
      return ctx.body = rJson(400, 'invalid body: null or illegal keys')

    body.authorId = ctx.state.user._id
    return ctx.body = await io_topic.create(body)
  },

  updateById: async ctx => {
    const id = ctx.params.id
    if (!id || !vObjectId(id))
      return ctx.body = rJson(400, 'invalid params: id')
    const resp = await io_topic.findById(id, 'authorId')
    if (resp.code !== 200) return ctx.body = resp
    if (!resp.data || !resp.data.authorId)
      return ctx.body = rJson(400, 'invalid params: id')
      
    // note: resp authorId is Object 
    if (resp.data.authorId.toString() !== ctx.state.user._id)
      return ctx.body = rJson(401, 'you are not the owner')
    
    let body = ctx.request.body
    body = editFilter(body, right, enum_rights.lteEditor)
    if (!body)
      return ctx.body = rJson(400, 'invalid body: null or illegal keys')

    body.updateAt = Date.now()
    return ctx.body = await io_topic.updateById(id, body)
  },

  updateById_by_editor: async ctx => {
    const id = ctx.params.id
    if (!id || !vObjectId(id))
      return ctx.body = rJson(400, 'invalid params: id')
    // TODO: check authorId if not the author then send messages

    let body = ctx.request.body
    body = editFilter(body, right, enum_rights.lteEditor)
    if (!body)
      return ctx.body = rJson(400, 'invalid body: null or illegal keys')

    body.updateAt = Date.now()
    return ctx.body = await io_topic.updateById(id, body)
  },

  _findById: async id => {
    return ctx.body = await io_topic.findById(id, select)
  },

}
