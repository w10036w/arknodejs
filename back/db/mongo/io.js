// TODO: use redis to cache find / findAll / findOne
const { rJson, asyncMongo } = resolve('util/ext')

module.exports = model => ({
// queries needs to be declared obviously (like graphql)
  findOne: async (criteria, select) => {
    const task = model.findOne(criteria, select)
    const note = `${model.modelName}.findOne
       criteria: ${JSON.stringify(criteria)}, select: ${select}`
    
    const { err, data } = await asyncMongo(task, note)
    if (err) return rJson(500, 'DB ERR: '+note)
    return rJson(200, note, data)
  },
  find: async (criteria, select, { limit=30, skip=0, sort=null, count=false }) => {
    const task = model.find(criteria, select)
    if (limit) task.limit(parseInt(limit))
    if (skip) task.skip(parseInt(skip))
    if (sort) task.sort(sort)
    if (count) task.count()
    const note = `${model.modelName}.find
      criteria: ${JSON.stringify(criteria)}, select: ${select}, limit: ${limit}, skip: ${skip}, sort: ${sort}, count: ${count}`
    
    const { err, data } = await asyncMongo(task, note)
    if (err) return rJson(500, 'DB ERR: '+note)
    return rJson(200, note, data)
  },
  findById: async (id, select) => {
    const task = model.findById(id, select);
    let note = `${model.modelName}.findById
      id: ${id}, select: ${select}`

    const { err, data } = await asyncMongo(task, note)
    if (err) return rJson(500, 'DB ERR: '+note)
    return rJson(200, note, data)
  },
// mutations
  create: async body => {
    const task = new model(body)
    if (task.errors) // if schema validation error
      return rJson(400, 'DB VERIFICATION: '+task.errors)
    let note = `${model.modelName}.create
      body: ${JSON.stringify(body)}`
    
    const { err, data } = await asyncMongo(task, note, 'save')
    if (err) return rJson(500, 'DB ERR: '+note)
    return rJson(200, note, data)
  },
  updateById: async (id, body) => {
    const task = model.findByIdAndUpdate(id, body)
    if (task.errors)
      return rJson(400, 'DB VERIFICATION: '+task.errors)
    let note = `${model.modelName}.update
      id: ${id}, body: ${JSON.stringify(body)}`
    
    const { err, data } = await asyncMongo(task, note)
    if (err) return rJson(500, 'DB ERR: '+note)
    return rJson(200, note, data)
  },
  removeById: async id => {
    const task = model.findByIdAndRemove(id)
    let note = `${model.modelName}.removeById
      id: ${id}`

    const { err, data } = await asyncMongo(task, note)
    if (err) return rJson(500, 'DB ERR: '+note)
    return rJson(200, note, data)
  },
  remove: async ids => {
    let note = `${model.modelName}.remove
      ids: ${ids}`
    try { await model.remove({ _id: { $in: ids } }) }
    catch (err) {
      let note = 
      log.error(note, err)
      return rJson(500, 'DB ERR:'+note)
    }
    return rJson(200, note, data)
  }
})

