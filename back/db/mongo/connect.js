function connect(uri) {
  const mongoose = require('mongoose');
  mongoose.Promise = global.Promise;
  const log = resolve('util/log');

  return new global.Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => log.error(error))
      .on('close', () => log.info('db:mongo connection closed.'))
      .once('open', () => {
        log.debug('db:mongo connected.');
        return resolve(mongoose.connections[0])
      });

    mongoose.connect(uri);
  });
}

module.exports = connect;
