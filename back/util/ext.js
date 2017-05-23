
// filter obj attr
function filterAttr (obj, select=select) {
  const attrs = select.split(' ')
  let l = attrs.length
  let o = {}
  while (l--) {
    o[attrs[l]] = obj[attrs[l]]
  }
  return o
}

async function asyncMongo (fn, note, action='exec') {
  try { 
    let data = await fn[action]() 
    return { data }
  } catch (err) { 
    const r = { err }
    log.error(note, err)
    return { err: true } // log error silently
  }
}

async function asyncRedis (redis, mtd, { key, value, expiresIn }) {
  try {
    await redis[mtd](key, expiresIn, value)
  } catch (err) {
    log.error('REDIS ERR:'+err)
  }
}

const err400 = 'bad request'
const err401 = 'access denied'
const err500 = 'internal server error'
const { debug } = resolve('package.json')

function rJson (code=200, note='', data, time=Date.now()) {
  if(code === 200) {
    if (!debug) return { code, data, time }
    return { code, note:'', data, time }
  }
  else if (code === 400) note = note || err400
  else if (code === 401) note = note || err401
  else if (code === 500) note = note || err500
  return { code, note, time };
};

module.exports = { filterAttr, asyncMongo, asyncRedis, rJson }
