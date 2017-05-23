const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const common = require('./base')

const schema = new Schema(Object.assign({
  // public
  title: { type: String, index: true, unique: true, required: true },
  path: { type: String, index: true, unique: true, required: true },
  authorId: { type: ObjectId, required: true },
  type: { type: String, default: 'html' },
  thumbnail: { type: String, default: '' },
  content: { type: String, required: true },
  toc: String,
  tags: [String],
  category: String,
  top: { type: Boolean, default: false }, // 0 normal 1 top
  allowComment: { type: Boolean, default: true },
  likedUsers: [ObjectId],
  replyCount: { type: Number, default: 0 },
  visitCount: { type: Number, default: 0 },
  lastReplyId: ObjectId, // click to redirect to the reply
  lastReplyAt: { type: Date, default: Date.now },
  // not recorded in db
  authorInfo: Object,
  categoryInfo: Object,
  tagsInfo: Object,
  // likedUsersInfo: [Object],
  
  // replies: [Object]
}, common));

schema.index({ top: -1, _id: -1 })
schema.index({ top: -1, lastReplyAt: -1 })
schema.index({ authorId: 1, createAt: -1 })

module.exports = mongoose.model('topic', schema);
