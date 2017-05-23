// middleware
const { rJson } = resolve('util/ext')
const { vObjectId } = resolve('util/validator')
const { models, rights, io } = resolve('db')
const enum_rights = rights.enum
const right = rights.category
const io_category = io(models.category)
const { readFilter, editFilter } = resolve('util/right')

module.exports = {
  find: async ctx => {
    let { criteria, limit, skip, sort } = ctx.query
    criteria = criteria ? JSON.parse(criteria) : {}
    let select = readFilter(0, right, enum_rights.lteGuests)
    let opts = {}
    if (limit) opts.limit = parseInt(limit)
    if (skip) opts.skip = parseInt(skip)
    if (sort) opts.sort = JSON.parse(sort)

    return ctx.body = await io_category.find(criteria, select, opts)
  },

  findByPath: async ctx => {
    const path = ctx.params.path
    if (!path)
      return ctx.body = rJson(400, 'invalid params: path')

    let criteria = { path }
    let select = readFilter(0, right, enum_rights.lteGuests)

    return ctx.body = await io_category.findOne(criteria, select)
  },

  create: async ctx => {
    let body = ctx.request.body
    body = editFilter(body, right, enum_rights.lteEditor)
    if (!body)
      return ctx.body = rJson(400, 'invalid body: null or illegal keys')
    // attach additional attributes safely
    body.authorId = ctx.state.user._id

    return ctx.body = await io_category.create(body)
  },

  updateById: async ctx => {
    const id = ctx.params.id
    if (!id || !vObjectId(id))
      return ctx.body = rJson(400, 'invalid params: id')

    let body = ctx.request.body
    body = editFilter(body, right, enum_rights.lteEditor)
    if (!body)
      return ctx.body = rJson(400, 'invalid body: null or illegal keys')
    // attach additional attributes safely
    body.updateAt = Date.now()

    return ctx.body = await io_category.updateById(id, body)
  },

  _findById: async (id, select) => {
    select = readFilter(select, right, enum_rights.lteGuests)
    return await io_category.findById(id, select)
  }
}
