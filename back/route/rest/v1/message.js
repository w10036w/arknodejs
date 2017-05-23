// middleware
const { rJson } = resolve('util/ext')
const { vObjectId } = resolve('util/validator')
const { models, rights, io } = resolve('db')
const enum_rights = rights.enum
const right = rights.tag
const io_tag = io(models.tag)
const { readFilter, editFilter } = resolve('util/right')

module.exports = {
  find: async ctx => {
    console.log('io_tag', io_tag)
    let { criteria, limit, skip, sort } = ctx.query
    criteria = criteria ? JSON.parse(criteria) : {}
    let select = readFilter(0, right, enum_rights.lteGuests)
    let opts = {}
    if (limit) opts.limit = parseInt(limit)
    if (skip) opts.skip = parseInt(skip)
    if (sort) opts.sort = JSON.parse(sort)

    return ctx.body = await io_tag.find(criteria, select, opts)
  },

  updateById: async ctx => {

  }

}
