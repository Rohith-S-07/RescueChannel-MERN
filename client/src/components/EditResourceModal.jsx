import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import NotificationModal from './NotificationModal';
import ConfirmationModal from './ConfirmationModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/DialogBoxes.css';
import config from '../config';

const EditResourceModal = ({ showEditModal, setShowEditModal, resource, handleEditResource }) => {
    const [status, setStatus] = useState(resource.status);
    const [expiryDate, setExpiryDate] = useState(resource.expiryDate ? new Date(resource.expiryDate).toISOString().split("T")[0] : '');
    const [condition, setCondition] = useState(resource.condition);
    
    const [modalState, setModalState] = useState({
        showNotification: false,
        showConfirmation: false,
        confirmationMessage: ''
    });

    const updateResource = () => {
        setModalState({
            ...modalState,
            confirmationMessage: "Are you sure you want to save changes?",
            showConfirmation: true
        });
    };

    const handleConfirm = () => {
        const updatedData = { status, expiryDate, condition };

        axios.put(`${config.BASE_URL}/api/resources/${resource._id}`, updatedData)
            .then(response => {
                handleEditResource(response.data);
                setModalState({
                    ...modalState,
                    showNotification: true,
                    showConfirmation: false
                });
                setShowEditModal(false); // Close modal after update
            })
            .catch(err => {
                console.error("Error updating resource:", err);
                setModalState({ ...modalState, showConfirmation: false });
            });
    };

    return (
        <>
            <Modal 
                isOpen={showEditModal} 
                onRequestClose={() => setShowEditModal(false)} 
                ariaHideApp={false}
                className="custom-modal" // Keep your custom styling here
                overlayClassName="modal-overlay equipment-modals"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Resource</h5>
                        <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" value={resource.name} disabled />
                        </div>
                        <div className="mb-3">
                            <label>Type</label>
                            <input type="text" className="form-control" value={resource.type} disabled />
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
                            <label>Expiry Date</label>
                            <input type="date" className="form-control" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Condition</label>
                            <input type="text" className="form-control" value={condition} onChange={(e) => setCondition(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger me-3" onClick={() => setShowEditModal(false)}>Cancel</button>
                        <button type="button" className="btn btn-success" onClick={updateResource}><i class="bi bi-pencil-square me-2"></i> Save changes</button>
                    </div>
                </div>
            </Modal>

            <NotificationModal 
                isOpen={modalState.showNotification} 
                onRequestClose={() => setModalState({ ...modalState, showNotification: false })} 
                message="Resource updated successfully!"
            />
            <ConfirmationModal 
                isOpen={modalState.showConfirmation} 
                onRequestClose={() => setModalState({ ...modalState, showConfirmation: false })} 
                onConfirm={handleConfirm} 
                message={modalState.confirmationMessage} 
            />
        </>
    );
};

export default EditResourceModal;
