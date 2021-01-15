const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: String,
  email: String,
  topics: [String],
  createdAt: Date
})

if (!authorSchema.options.toObject) authorSchema.options.toObject = {}
authorSchema.options.toObject.transform = function(doc, ret) {
  delete ret._id
  delete ret.__v
  if (ret.topics && ret.topics.length === 0) delete ret.topics
  return ret
}

module.exports = mongoose.model('Author', authorSchema)
