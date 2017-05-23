const redis = require('./redis');
const { cacheDb } = resolve('package');

// for db switch
module.exports = {
  redis
}[cacheDb];
