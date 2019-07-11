const Conversation = require('../models/conversation');
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  index: (req, res) => {
    const { senderId, recieverId } = req.query;
    console.log(senderId, recieverId);

    Conversation.find({
      members: { $all: [ ObjectId(senderId), ObjectId(recieverId)] }
    })
      .then((conversation) => {
        if (conversation.length == 0) {
          const newConversation = new Conversation();
          newConversation.members = [senderId, recieverId];
          newConversation.save()
            .then((conversation) => {
              res.send(conversation);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.send(conversation);
        }
      });
  },
  findChats: (req, res) => {
    const { senderId } = req.query;
    console.log(senderId);

    Conversation.find({
      members: { $in: [ ObjectId(senderId)] }
    })
      .then((conversation) => {
        const receivers = [];
        if (conversation.length !== 0) {
          conversation.map((users) => {
            let receiver = '';
            if (users.members[1].toString() !== senderId.toString()) {
              receiver = users.members[1];
            } else {
              receiver = users.members[0];
            }
            User.find(receiver)
            .then((user) => {
              receivers.push(user[0]);
              if (conversation.length === receivers.length) {
                res.send(receivers)
              }
            });
          });
        } else {
          res.send(conversation);
        }

      });
  }
}
