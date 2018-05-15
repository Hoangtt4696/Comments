const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  content: String,
  user: Object,
  topicId: String,
  parentCommentId: Schema.Types.ObjectId
}, {
  timestamps: {}
});

module.exports = mongoose.model('Comment', modelSchema);
