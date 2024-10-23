import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/DialogBoxes.css';  // Import custom CSS file

const AddInspectionModal = ({ showInspectionModal, setShowInspectionModal, resource, handleAddInspection }) => {
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    const addInspectionLog = () => {
        if (!date || !notes) {
            alert("Please fill in all fields.");
            return;
        }

        const inspectionLog = { date, notes };

        axios.post(`http://localhost:5000/api/resources/${resource._id}/inspection`, inspectionLog)
            .then(response => {
                handleAddInspection(response.data);  // Update the resource with new logs
                setShowInspectionModal(false); // Close modal after adding inspection
            })
            .catch(err => console.error("Error adding inspection log:", err));
    };

    return (
        <Modal 
            isOpen={showInspectionModal} 
            onRequestClose={() => setShowInspectionModal(false)} 
            ariaHideApp={false}
            className="custom-modal"
            overlayClassName="modal-overlay inspection-modals"
            style={{ content: { width: 'auto', maxWidth: '600px', margin: 'auto' } }}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add Inspection Log for {resource.name}</h5>
                    <button type="button" className="btn-close" onClick={() => setShowInspectionModal(false)}></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label>Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label>Notes</label>
                        <textarea 
                            className="form-control" 
                            rows="3" 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)} 
                        ></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger me-3" onClick={() => setShowInspectionModal(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={addInspectionLog}><i class="bi bi-plus-square me-2"></i> Add Inspection Log</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddInspectionModal;