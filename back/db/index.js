const mongo = require('./mongo');
const { database } = resolve('package');

// for db switch
module.exports = {
  mongo
}[database];
