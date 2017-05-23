// TODO: use redis to cache find / findAll / findOne
// Do filter, validation, modification for db-input in factories of actions
const { rJson } = resolve('util/ext')

const io = require('./io')

module.exports = model => ({
// queries needs to be declared obviously (like graphql)
// then do filter
  findOne: async ctx => {
    let { criteria, select } = ctx.query;
    criteria = JSON.parse(criteria) || {}
    if (!select)
      return ctx.body = rJson(400, 'missing query: select')

    return ctx.body = await io(model).findOne(criteria, select)
  },
  find: async ctx => {
    let { criteria, select, limit, skip, sort, count } = ctx.query
    criteria = criteria ? JSON.parse(criteria) : {}
    if (!select)
      return ctx.body = rJson(400, 'missing query: select')
    let opts = {}
    if (limit) opts.limit = parseInt(limit)
    if (skip) opts.skip = parseInt(skip)
    if (sort) opts.sort = JSON.parse(sort)
    if (count) opts.count = true
    return ctx.body = await io(model).find(criteria, select, opts)
  },
  findById: async ctx => {
    const query = ctx.query;
    const id = ctx.params.id
    let select = JSON.parse(query.select)

    return ctx.body = await io(model).findById(id, select)
  },

// mutations
  create: async ctx => {
    let body = ctx.request.body

    return ctx.body = await io(model).create(body)
  },
  updateById: async ctx => {
    const id = ctx.params.id
    if (!id) return ctx.body = rJson(400, 'missing params: id')
    let body = ctx.request.body

    return ctx.body = await io(model).updateById(id, body)
  },
  removeById: async ctx => {
    const id = ctx.params.id
    if (!id) return ctx.body = rJson(400, 'invalid params: id')

    return ctx.body = await io(model).removeById(id)
  },
  remove: async ctx => {
    const ids = ctx.request.body.ids // []
    if (!ids || !ids.length)
      return ctx.body = rJson(400, 'invalid body: ids')
    return ctx.body = await io(model).remove(ids)
  }
})

