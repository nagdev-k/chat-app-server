const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
});

module.exports = mongoose.model('conversation', ConversationSchema);
