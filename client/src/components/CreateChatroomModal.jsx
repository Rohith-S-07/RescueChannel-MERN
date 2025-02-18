import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/DialogBoxes.css'; // Import custom CSS file
import config from '../config';

const CreateChatroomModal = ({ showModal, setShowModal, handleAddChatroom }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime] = useState(new Date().toLocaleString());

    const createChatroom = () => {
        if (!name || !description) {
            console.error('Name and description are required');
            return;
        }

        const newChatroom = {
            name,
            description,
            dateTime,
        };

        // Updated API endpoint
        axios.post(`${config.BASE_URL}/api/chatrooms`, newChatroom)
            .then(response => {
                handleAddChatroom(response.data); // This should now work correctly
                setShowModal(false); // Close modal after adding chatroom
            })
            .catch(err => console.error("Error creating chatroom:", err));
    };

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            ariaHideApp={false}
            className="custom-modal"
            overlayClassName="modal-overlay"
            style={{ content: { width: 'auto', maxWidth: '600px', margin: 'auto' } }}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Create Chatroom</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label>Chatroom Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Date and Time</label>
                        <input
                            type="text"
                            className="form-control"
                            value={dateTime}
                            readOnly
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success me-2" onClick={createChatroom}>Create Chatroom</button>
                    <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateChatroomModal;
