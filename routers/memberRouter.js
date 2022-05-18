const express = require('express');
const router = express.Router();
const signupController = require('../controllers/memberController');
const chatroomController = require('../controllers/chatroomController');
const msgController = require('../controllers/messageController');

router.post('/signup', signupController.signup);
router.post('/login', signupController.login);

router.post('/createChatroom', chatroomController.createChatroom);
router.post('/addChatroom', chatroomController.addChatroom);


router.post('/getMessage', msgController);

module.exports = router;
