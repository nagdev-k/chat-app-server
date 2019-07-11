const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'users' },
  conversation: { type: Schema.Types.ObjectId, ref: 'conversations' },
  message: { type: Schema.Types.String, ref: 'conversations' },
  isFile: { type: Schema.Types.Boolean }
});

module.exports = mongoose.model('messages', MessageSchema);
