import React, { useState } from 'react';
import axios from 'axios';

const AddEquipmentModal = ({ showModal, setShowModal, handleAddResource }) => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const userID = localStorage.getItem('userId');

    const addResource = () => {
        if (!userID) {
            console.error('userID not found in localStorage');
            return;
        }
        const newResource = {
            userID, // Include userID in the resource object
            name,
            type,
            quantity,
            inUse: 0
        };
    
        axios.post('http://localhost:5000/api/resources', newResource)
            .then(response => {
                handleAddResource(response.data);
                setShowModal(false);
            })
            .catch(err => console.error("Error adding resource:", err)); // Log the error
    };
    
    return (
        <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Equipment</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label>Type</label>
                            <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Select Type</option>
                                <option value="Equipment">Equipment</option>
                                <option value="Vehicle">Vehicle</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Quantity</label>
                            <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                        <button className="btn btn-primary" onClick={addResource}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEquipmentModal;
