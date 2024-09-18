import React from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/DialogBoxes.css';  // Import custom CSS file

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      ariaHideApp={false}
      className="modal-dialog-centered custom-modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirmation</h5>
          <button type="button" className="btn-close" onClick={onRequestClose}></button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary m-2" onClick={onConfirm}>Yes</button>
          <button type="button" className="btn btn-secondary" onClick={onRequestClose}>No</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
