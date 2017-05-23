const qs = require('querystring')
const { expiresIn } = resolve('config')
//const cache = resolve('cache')
const { rJson, asyncRedis } = resolve('util/ext')
const { getToken, encode, verify, decode } = resolve('util/token')

const default_err_msg = 'invalid username or password'
const default_suc_msg = 'login successfully'

exports.login_local = async (ctx, user, msg) => {
  if (!user) {
    return ctx.body = rJson(401, msg || default_err_msg)
  }
  if (user.hidden) {
    return ctx.body = rJson(401, 'you are banned')
  }
  let basic = {
    _id: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    hidden: user.hidden
  }
  let token = encode(basic);
  let key = `token_${user.username}`
  //await asyncRedis(cache, 'setex', { key, value: token, expiresIn })
  return ctx.body = rJson(200, default_suc_msg, { token, user: basic })
}

// for OAuth redirection
exports.login = async (ctx, user, msg) => {
  if (!user) {
    return ctx.body = rJson(401, msg || default_err_msg)
  }
  if (user.hidden) {
    //return ctx.body = rJson(401, 'you are banned')
    return ctx.redirect('/')
  }
  // user basic info
  let basic = {
    _id: user._id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    hidden: user.hidden
  }
  let token = encode(basic);
  let key = `token_${user.username}`
  //await asyncRedis(cache, 'setex', { key, value: token, expiresIn })

  const uri = `/passport.html?&token=${token}`
  return ctx.redirect(uri)
  //return ctx.body = rJson(200, default_suc_msg, { token, basic })
}

exports.logout = ctx => {
  let token, username
  // try {
  //   token = getToken(ctx)
  //   username = decode(token).payload.username
  //   cache.del(`token_${username}`)
  // } catch (err) {  }
  return ctx.redirect('/')
}

exports.verify_token = async ctx => {
  let token, user
  token = getToken(ctx)
  if (!verify(token)) return ctx.body = rJson(200, 'invalid token')
  user = decode(token).payload
  return ctx.body = rJson(200, default_suc_msg, user)
}
