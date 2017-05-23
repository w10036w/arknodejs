const { twitter, github } = resolve('config')
const { bSigned, bAdmin } = resolve('middleware/auth')
const { rJson } = resolve('util/ext')
const { verify } = resolve('util/token')

const use_passport = require('./use_passport')
const { logout, verify_token } = require('./actions')

module.exports = (app, r) => {
  // Warning: passport and r changed
  use_passport(app, r, ['local', 'twitter', 'github'])

  r.get('/logout', logout)
  // test router
  r.get('/test', async ctx => {
    let token = ctx.headers.Authorization
    let user = null
    if(verify(token)) user = decode(token).payload
    return ctx.body = rJson(200, 'api works like a charm', { user })
  })
  r.get('/test_admin', bAdmin,
    ctx => ctx.body = rJson(200, 'admin granted', { ctxRespRole: ctx.response.role }))
  r.get('/verify_token', bSigned, verify_token)

  //r.get('/test_self', bSelf)
};
