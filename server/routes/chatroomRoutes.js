const express = require('express');
const router = express.Router();
const chatroomController = require('../controllers/chatroomController');

// Create a new chatroom
router.post('/', chatroomController.createChatroom);

// Send a message in a chatroom
router.post('/message', chatroomController.sendMessage);

// Get all chatrooms
router.get('/', chatroomController.getChatrooms);

// Get messages for a specific chatroom
router.get('/:chatroomId/messages', chatroomController.getMessages);


module.exports = router;
