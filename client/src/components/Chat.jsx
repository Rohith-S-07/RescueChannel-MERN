import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; // Importing a user icon
import config from '../config';

const Chat = ({ chatroom, setActiveChatroom }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userName = localStorage.getItem('userName'); // Get the sender name from localStorage

    useEffect(() => {
        fetchMessages();
    }, [chatroom]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/chatrooms/${chatroom._id}/messages`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                await axios.post(`${config.BASE_URL}/api/chatrooms/message`, {
                    chatroomId: chatroom._id,
                    sender: userName, // Use the sender name from localStorage
                    content: newMessage
                });
                setNewMessage(''); // Clear the input field
                fetchMessages(); // Refresh messages after sending
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="row p-4">
            <div className="hero p-3">
                <div className="card-body d-flex flex-column justify-content-between" style={{ height: '100%' }}>
                    <button className="btn btn-secondary mb-3" onClick={() => setActiveChatroom(null)}>
                        Back to Chat Rooms
                    </button>
                    <h2 className="text-center text-light mb-3">{chatroom.name}</h2>
                    <div className="chat-history" style={{ height: '300px', overflowY: 'scroll' }}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`d-flex align-items-start mb-3 ${msg.sender === userName ? 'justify-content-end' : ''}`}>
                                {msg.sender !== userName && (
                                    <div className="d-flex align-items-start me-2">
                                        <FaUserCircle size={24} className="text-muted" />
                                        <div className="ms-2">
                                            <strong className="text-primary">{msg.sender}</strong>
                                            <small className="d-block text-muted text-end">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                                        </div>
                                    </div>
                                )}
                                <div className={`alert ${msg.sender === userName ? 'alert-secondary' : 'alert-primary'} mb-0 text-center`} style={{ width: '70%' }}>
                                    {msg.content}
                                </div>
                                {msg.sender === userName && (
                                    <div className="d-flex align-items-start ms-2">
                                        <div className="me-2">
                                            <strong className="text-success">{msg.sender}</strong>
                                            <small className="d-block text-muted text-end">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                                        </div>
                                        <FaUserCircle size={24} className="text-muted" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="input-group mt-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
