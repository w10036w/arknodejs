const bcrypt = require('bcryptjs')

exports.encrypt = (str, cb) => {
  bcrypt.hash(str, 10, cb)
}

exports.decrypt = (str, hash, cb) => {
  bcrypt.compare(str, hash, cb)
}
