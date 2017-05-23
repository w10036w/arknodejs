const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const common = require('./base')

const schema = new Schema(Object.assign({
  // type:
  // 0-9 reply sb. reply ur topic,
  // 10-19 favorite
  // 20-29 group
  // ----feeds end----
  // 30-39 follow
  // 40-49 mention
  type: { type: Number, required: true },
  senderId: ObjectId, // if null meaning system is the sender
  senderName: String,
  receiverId: { type: ObjectId, required: true },
  receiverName: String,
  topicId: String,
  content: String,
  beRead: { type: Boolean, default: false }
}, common));

schema.index({ receiverId: 1, createAt: -1 })
schema.index({ senderId: 1, createAt: -1 })

module.exports = mongoose.model('message', schema);
