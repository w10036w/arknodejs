const { lteOwner, lteEditor } = require('./_enum')

module.exports = {
  _id: {},
  path: { edit: lteOwner },
  title: { edit: lteOwner },
  authorId: { },
  type: { edit: lteOwner },
  thumbnail: { edit: lteOwner },
  content: { edit: lteOwner },
  toc: { edit: lteOwner },
  tags: { edit: lteOwner },
  category: { edit: lteOwner },
  top: { edit: lteEditor },
  allowComment: { edit: lteOwner },

  likedUsers: {},
  replyCount: {},
  visitCount: {},
  lastReplyId: {},
  lastReplyAt: {},

  createAt: {},
  updateAt: {},
  hidden: { edit: lteEditor },
}
