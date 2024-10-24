const Chatroom = require('../models/chatroomModel');
const Message = require('../models/messageModel');

// Create a new chatroom
exports.createChatroom = async (req, res) => {
    try {
        const { name, description, participants = [] } = req.body; // Ensure participants is optional
        const chatroom = new Chatroom({ name, description, participants });
        await chatroom.save();
        res.status(201).json(chatroom);
    } catch (error) {
        console.error('Error creating chatroom:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Send a message in a chatroom
exports.sendMessage = async (req, res) => {
    try {
        const { chatroomId, sender, content } = req.body;
        const chatroom = await Chatroom.findById(chatroomId);

        if (!chatroom) {
            return res.status(404).json({ message: 'Chatroom not found' });
        }

        // Create a new message instance
        const newMessage = new Message({ sender, content });
        await newMessage.save(); // Save the message

        // Push the message ID to the chatroom's messages array
        chatroom.messages.push(newMessage._id);
        await chatroom.save(); // Save the updated chatroom

        res.status(200).json(chatroom);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Get all chatrooms
exports.getChatrooms = async (req, res) => {
    try {
        const chatrooms = await Chatroom.find();
        res.status(200).json(chatrooms);
    } catch (error) {
        console.error('Error fetching chatrooms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Get all messages for a specific chatroom
exports.getMessages = async (req, res) => {
    try {
        const chatroom = await Chatroom.findById(req.params.chatroomId).populate('messages');
        if (!chatroom) {
            return res.status(404).json({ message: 'Chatroom not found' });
        }
        res.status(200).json(chatroom.messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
