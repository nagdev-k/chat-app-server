

const ConversationSchema = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
});

module.exports = mongoose.model('conversations', ConversationSchema)

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'users' },
  conversation: { type: Schema.Types.ObjectId, ref: 'conversations' },
});

module.exports = mongoose.model('messages', MessageSchema);
