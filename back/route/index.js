const r = require('koa-router')()

const { rJson } = resolve('util/ext')
const { sub } = resolve('package')


module.exports = app => {
  r.prefix(sub)
  // welcome
  r.get('/', ctx => {
    return ctx.body = rJson(200,
      'welcome to the International, oh no, api service', {
        router: {
          graph: 'disabled',
          rest: sub,
          current_auth_method: 'jwt'
        }
      }
    )
  })
  // use authentication
  require('./auth')(app, r);
  // use graph api
  // require('./graph')(r);
  // use rest api
  require('./rest/')(r)
  // cdn, e.g. qiniu
  require('./cdn')(r)

  app.use(r.routes()).use(r.allowedMethods())
}
