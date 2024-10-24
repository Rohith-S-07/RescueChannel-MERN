import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateChatroomModal from '../components/CreateChatroomModal';
import Chat from '../components/Chat';
import { BsPlusCircle } from 'react-icons/bs'; // Optional: for chatroom creation button

const Chatrooms = () => {
    const [chatrooms, setChatrooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeChatroom, setActiveChatroom] = useState(null); // State for the active chatroom

    useEffect(() => {
        fetchChatrooms();
    }, []);

    const fetchChatrooms = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/chatrooms');
            setChatrooms(response.data);
        } catch (error) {
            console.error('Error fetching chatrooms:', error);
        }
    };

    const handleAddChatroom = (newChatroom) => {
        setChatrooms((prevChatrooms) => [...prevChatrooms, newChatroom]);
        setShowModal(false); // Close the modal after adding the chatroom
    };

    const handleJoinChatroom = (chatroom) => {
        setActiveChatroom(chatroom); // Set the active chatroom
    };

    return (
        <div className="agency-content hero d-flex flex-column p-3">
            <h1 className="text-center text-light mb-3">Chat Rooms</h1>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                <BsPlusCircle /> Create Chatroom
            </button>

            {/* Show the active chatroom if one is selected */}
            {activeChatroom ? (
                <Chat chatroom={activeChatroom} setActiveChatroom={setActiveChatroom} />
            ) : (
                <div className="mt-3">
                    {chatrooms.map(chatroom => (
                        <div key={chatroom._id} className="card my-2">
                            <div className="card-body">
                                <h5 className="card-title">{chatroom.name}</h5>
                                <p className="card-text">{chatroom.description}</p>
                                <button className="btn btn-info" onClick={() => handleJoinChatroom(chatroom)}>
                                    Join
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CreateChatroomModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                handleAddChatroom={handleAddChatroom} // Pass the function as a prop
            />
        </div>
    );
};

export default Chatrooms;
