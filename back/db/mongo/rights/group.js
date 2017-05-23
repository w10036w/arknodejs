const { lteEditor } = require('./_enum')

module.exports = {
  _id: {},
  name: { edit: lteEditor },
  authorId: { read: lteEditor },
  path: { edit: lteEditor },
  summary: { edit: lteEditor },
  createAt: {},
  updateAt: {},
  hidden: {}
}
