const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const common = require('./base')

const schema = new Schema(Object.assign({
  // pubic
  authorId: { type: ObjectId, required: true },
  topicId: { type: ObjectId, index: true, required: true },
  replyToUsername: String, // other reply's authorId
  replyToTopicPath: String,
  content: { type: String, required: true },
  type: { type: String, default: 'text' }, // md, text
  
  authorInfo: Object,
  topicInfo: Object,
}, common));

schema.index({ topicId: 1 })
schema.index({ authorId: 1, _id:-1 })

module.exports = mongoose.model('reply', schema);
