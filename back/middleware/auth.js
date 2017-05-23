const { rJson } = resolve('util/ext')
//const cache = resolve('cache')
const { getToken, verify, decode } = resolve('util/token')

let token = '', ctxUser, tokenUser

exports.bSigned = (ctx, next) => {
  token = getToken(ctx)
  if (verify(token)) {
    tokenUser = decode(token).payload
    ctx.state.user = tokenUser
    return next ? next() : true
  }
  return ctx.body = rJson(401, 'login required')
}

exports.bAdmin = (ctx, next) => {
  // avoid next middleware to re-validate
  token = getToken(ctx)
  ctxUser = ctx.state.user
  if (ctxUser)  {
    if (ctxUser.role === 'admin')
      return next ? next() : true
  } else if (verify(token)) {
    tokenUser = decode(token).payload
    if (tokenUser.role === 'admin') {
      ctx.state.user = tokenUser
      return next ? next() : true
    }
  }
  return ctx.body = rJson(401, 'admin required')
}

exports.bEditor = (ctx, next) => {
  ctxUser = ctx.state.user
  token = getToken(ctx)
  if (ctxUser)  {
    if (ctxUser.role === 'editor')
      return next ? next() : true
  } else if (verify(token)) {
    tokenUser = decode(token).payload
    if (tokenUser.role === 'editor') {
      ctx.state.user = tokenUser
      return next ? next() : true
    }
  }
  return ctx.body = rJson(401, 'editor required')
}

exports.bSignOff = (ctx, next) => {
  token = getToken(ctx)
  if (!verify(token))
    return next ? next() : true
  else return ctx.redirect('/') // go homepage if signed
}
