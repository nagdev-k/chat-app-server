const Message = require('../models/message');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  index: (req, res) => {
    const { conversationId } = req.query;
    Message.find({ conversation: new ObjectId(conversationId) })
      .then((prevMessages) => {
        res.send(prevMessages);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    newMessage: (req, res) => {
      const { senderId, conversationId, message } = req.body;
      const newMessage = new Message();
      newMessage.author = senderId;
      newMessage.conversation = conversationId;
      newMessage.message = message;
      newMessage.isFile = false;
      newMessage.save()
        .then((newMessage) => {
          res.send(newMessage);
        });
  },
  uploadImage: (req, res) => {
    const { file } = req;
    const { originalname } = file;
    // console.log('image request-----', req);
    // res.send(file)
    // const { file } = req.file;
    // const { senderId, conversationId, message } = req.body;
    const newMessage = new Message();
    const indexOfHash = originalname.indexOf('-');
    newMessage.author = originalname.substring(0, indexOfHash);
    newMessage.conversation = originalname.substring(indexOfHash+1, (originalname.length-4));
    newMessage.message = req.file.filename;
    newMessage.isFile = true;
    console.log('----newMessage-----', newMessage);
    newMessage.save()
      .then((newMessage) => {
        res.send(newMessage);
      });
  }
}
