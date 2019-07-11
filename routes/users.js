const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');

router.get('/', userController.index);
router.post('/findUser', userController.findUser);

module.exports = router;
