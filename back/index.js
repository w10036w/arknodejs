// non-dep deps
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const fs = require('fs');
const path = require('path');
const compress = require('koa-compress')

// app conf
//global.resolve = file => path.resolve(__dirname, file)
global.resolve = name => require(`${__dirname}/${name}`);
global.Promise = require("bluebird")
global.log = require('./util/log')
const config = require('./config')
const db = require('./db');
const { port } = require('./package');


const app = new Koa();
app.use(compress({
  filter: content_type => /test/.test(content_type),
  threshold: 0, // default 1024 byte
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(bodyParser());
app.keys = [config.secret];

// Logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  // TODO: error trace, req / res size
  log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${ms}ms`);
});
/** route setting, including auth */
require('./route')(app);

(async() => {
  try {
    await db.connect(config.db.uri)
    const opts = {
      criteria: {
        username: config.defaultAdmin.username
      },
      select: 'username'
    }
    let user = await db.models.user.load(opts)
    if (!user) {
      user = await db.models.user.create(config.defaultAdmin)
      log.info(`account created: ${user.username}`)
    }
  } catch (err) {
    log.error('Unable to connect to database');
  }
  // main api service
  await app.listen(port);
  log.debug(`ApiServer is running on port ${port}`);
  //require('./wss')
})();
