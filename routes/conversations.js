const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation_controller');

router.get('/', conversationController.index);
router.get('/findChats', conversationController.findChats);

module.exports = router;
