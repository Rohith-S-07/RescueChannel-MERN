import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const ChatComponent = ({ chatroomId }) => {
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const username = localStorage.getItem('userName'); // Retrieve username from local storage

    useEffect(() => {
        fetchMessages();
    }, [chatroomId]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/chatrooms/${chatroomId}`);
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        try {
            const messageData = { chatroomId, sender: username, content: messageContent };
            await axios.post(`${config.BASE_URL}/api/chatrooms/message`, messageData);
            setMessageContent(''); // Clear message input
            fetchMessages(); // Refresh messages
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="col-md-6 p-4">
            <div className="card">
                <div className="card-body d-flex flex-column justify-content-between" style={{ height: '100%' }}>
                    <div className="chat-history">
                        {messages.map((msg, index) => (
                            <div key={index} className={`d-flex align-items-start mb-3 ${msg.sender === username ? 'justify-content-end' : ''}`}>
                                {msg.sender !== username && (
                                    <div>
                                        <strong>{msg.sender}</strong>
                                        <small className="d-block text-muted">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                                    </div>
                                )}
                                <div className={`alert ${msg.sender === username ? 'alert-secondary' : 'alert-primary'} mb-0`}>
                                    {msg.content}
                                </div>
                                {msg.sender === username && (
                                    <div>
                                        <strong>{msg.sender}</strong>
                                        <small className="d-block text-muted">{new Date(msg.timestamp).toLocaleTimeString()}</small>
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
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
