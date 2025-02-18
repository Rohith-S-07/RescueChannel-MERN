import React, { useState } from 'react';
import Modal from 'react-modal';
import NotificationModal from './NotificationModal'; // Import your notification modal
import ConfirmationModal from './ConfirmationModal'; // Import your confirmation modal
import axios from 'axios';
import config from '../config';

const EditStatusModal = ({ showModal, setShowModal, report, handleUpdate }) => {
    const [status, setStatus] = useState(report ? report.status : 'pending');
    const [modalState, setModalState] = useState({
        showNotification: false,
        showConfirmation: false,
        confirmationMessage: ''
    });
    const agencyName = localStorage.getItem('userName') || 'Agency Name';

    const handleEditClick = () => {
        if (status === 'completed' && !report.completedByAgency) {
            setModalState({
                ...modalState,
                confirmationMessage: "Are you sure you want to mark this as completed?",
                showConfirmation: true
            });
        } else {
            updateReport();
        }
    };

    const handleConfirm = () => {
        updateReport();
    };

    const updateReport = () => {
        const updatedData = { status, completedByAgency: status === 'completed' ? agencyName : null };

        axios.put(`${config.BASE_URL}/api/sos/${report._id}`, updatedData)
            .then(response => {
                handleUpdate(response.data);
                setModalState({
                    ...modalState,
                    showNotification: true,
                    showConfirmation: false
                });
                setShowModal(false);
            })
            .catch(err => {
                console.error("Error updating report:", err);
                setModalState({ ...modalState, showConfirmation: false });
            });
    };

    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                ariaHideApp={false}
                className="custom-modal"
                overlayClassName="modal-overlay"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-primary">Edit Report Status</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="statusSelect">Status</label>
                            <select
                                id="statusSelect"
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pending" disabled>Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger me-2" onClick={() => setShowModal(false)}>Cancel</button>
                        <button className="btn btn-success" onClick={handleEditClick}>Save Changes</button>
                    </div>
                </div>
            </Modal>

            <NotificationModal
                showModal={modalState.showNotification}
                setShowModal={() => setModalState({ ...modalState, showNotification: false })}
                message="Report status updated successfully!"
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

export default EditStatusModal;
