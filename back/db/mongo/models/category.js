const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const common = require('./base')

const schema = new Schema(Object.assign({
  // public
  name: { type: String, unique: true, required: true },
  authorId: { type: ObjectId, required: true },
  path: { type: String, unique: true, required: true },
  summary: { type: String }
}, common));

module.exports = mongoose.model('category', schema);
