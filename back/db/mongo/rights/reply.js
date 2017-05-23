const { lteOwner } = require('./_enum')

module.exports = {
  _id: {},
  content: { edit: lteOwner },
  type: { edit: lteOwner },
  authorId: {},
  topicId: { edit: lteOwner },
  replyToUsername: { edit: lteOwner },
  replyToTopicPath: {},
  createAt: {},
  updateAt: {},
  hidden: {}
}
