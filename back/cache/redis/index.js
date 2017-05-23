const { uri } = resolve('config').cache;
const redis = require('redis');
const bluebird = require("bluebird");
const log = resolve('util/log');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client = redis.createClient(uri);
//client.select(3, function() { /* ... */ });
client.on("error", function (err) {
  log.error("redis error: " + err);
});
client.on("end", function (err) {
  log.error("redis error: " + err);
});

client.on('connect', function () {
  log.debug('cache db:redis connected');
});

module.exports = client;
