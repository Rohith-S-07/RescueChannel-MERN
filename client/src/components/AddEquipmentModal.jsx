import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/DialogBoxes.css';  // Import custom CSS file
import config from '../config';

const AddEquipmentModal = ({ showModal, setShowModal, handleAddResource }) => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('active');
    const [expiryDate, setExpiryDate] = useState('');
    const [condition, setCondition] = useState('Good');
    const [vendorName, setVendorName] = useState('');
    const userID = localStorage.getItem('userId');

    const addResource = () => {
        if (!userID) {
            console.error('userID not found in localStorage');
            return;
        }

        const newResource = {
            userID,  // Include userID in the resource object
            name,
            type,
            status,
            expiryDate: expiryDate || null,  // If no expiry date, pass null
            condition,
            vendorName
        };

        axios.post(`${config.BASE_URL}/api/resources`, newResource)
            .then(response => {
                handleAddResource(response.data);
                setShowModal(false); // Close modal after adding resource
            })
            .catch(err => console.error("Error adding resource:", err));  // Log the error
    };

    return (
        <Modal 
            isOpen={showModal} 
            onRequestClose={() => setShowModal(false)} 
            ariaHideApp={false}
            className="custom-modal" // Keep your custom styling here
            overlayClassName="modal-overlay equipment-modals"
            style={{ content: { width: 'auto', maxWidth: '600px', margin: 'auto' } }} // Adjust width as needed
        >
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
                        <label>Status</label>
                        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="active">Active</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="expired">Expired</option>
                            <option value="retired">Retired</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Condition</label>
                        <input type="text" className="form-control" value={condition} onChange={(e) => setCondition(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label>Expiry Date <span className='text-primary small'>optional</span></label>
                        <input type="date" className="form-control" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        
                    </div>
                    <div className="mb-3">
                        <label>Vendor Name</label>
                        <input type="text" className="form-control" value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger me-3" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={addResource}><i class="bi bi-plus-square me-2"></i> Add</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddEquipmentModal;
