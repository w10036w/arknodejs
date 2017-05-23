const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const common = require('./base')
//const user = require('../schema/user')

const crypto = require('crypto')

const schema = new Schema(Object.assign({}, {
  // public
  username: { type: String, lowercase: true, trim: true,
    index: true, unique: true, required: true },
  displayName: { type: String, default: '' },
  email: { type: String, default: '' },
  avatar: String, // TODO: diff default avatar from diff realm
  role: { type: String, default: 'guest' },
  group: [ObjectId],
  level: { type: Number, default: 1 },
  githubAddr: String,
  facebookAddr: String,
  twitterAddr: String,
  bio: String,
  followers: [ObjectId],
  followings: [ObjectId],
  favorites: [ObjectId],
  // admin only
  provider: { type: String, default: 'local' },
  salt: String,
  hashed_password: { type: String },
  twitterId: String,
  githubId: String,
  //googleId: String,
  //wechatId: String,
  facebookId: String,
  authToken: String
}, common));

schema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
  }).get(function () {
  return this._password
});
schema.virtual('followerCount')
  .get(function () {
    return this.followers.length
  })
schema.virtual('favoriteCount')
  .get(function () {
    return this.favorites.length
  })

// Methods
schema.methods = {
  authenticate (plainText) {
    const encrypted = this.encryptPassword(plainText)
    const hashed = this.hashed_password;
    return encrypted === hashed;
  },
  encryptPassword (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha256', this.salt + '')
        .update(password)
        .digest('hex');
    } catch (err) {
      return err;
    }
  },
  makeSalt() {
    return Math.round((new Date().valueOf() * Math.random()))
  },
  followingCount () {
    return this.followings.length
  }
}
schema.statics = {
  load (opts) {
    return this.findOne(opts.criteria)
      .select(opts.select)
      .exec()
  }
}

module.exports = mongoose.model('user', schema)
