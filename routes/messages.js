const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message_controllers');
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ dest: '../uploads', storage });

router.get('/', messageController.index);
router.post('/newMessage', messageController.newMessage);
router.post('/uploadImage', upload.single('file'), messageController.uploadImage);

module.exports = router;
