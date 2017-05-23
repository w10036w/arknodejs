const graphql = require('graphql')
const graphQLHTTP = require('koa-graphql')
const convert = require('koa-convert')

//TODO: add permission middleware to graph
const model = resolve('db').models.user;
const actions = resolve('db').actions(model);
const { schema } = require('./schema')
const debug = process.env.NODE_ENV !== 'production'

module.exports = r => {
  r.get('/users', actions.findAll(user))

  r.all('/graph', convert(graphQLHTTP({
    schema,
    graphiql: debug
  })))

  // TODO: add authentication check
}
