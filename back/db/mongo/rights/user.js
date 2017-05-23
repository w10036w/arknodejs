const { lteGuest, lteOwner, lteEditor } = require('./_enum')

module.exports = {
  _id: {},
  username: {},
  displayName: { edit: lteOwner },
  email: { edit: lteOwner },
  avatar: { edit: lteOwner },
  role: {},
  group: { edit: lteOwner },
  level: {},
  githubAddr: { edit: lteOwner },
  facebookAddr: { edit: lteOwner },
  twitterAddr: { edit: lteOwner },
  bio: { edit: lteOwner },
  topics: {},
  topicCount: {},
  followings: { edit: lteOwner },
  followingCount: {},
  followers: {},
  followerCount: {},
  favorites: { edit: lteOwner },
  favoriteCount: {},
  provider: { read: lteEditor },
  createAt: {},
  updateAt: {},
  hidden: { edit: lteEditor }
}
