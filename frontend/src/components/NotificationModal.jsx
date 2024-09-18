import React, { useEffect } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/DialogBoxes.css';

const NotificationModal = ({ isOpen, onRequestClose, message }) => {

  // Close the modal after 3 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onRequestClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="custom-notification-modal"
      overlayClassName="custom-notification-overlay"
    >
      <div className="notification-content">
        <p>{message}</p>
        <button className="btn btn-primary btn-sm" onClick={onRequestClose}>OK</button>
      </div>
    </Modal>
  );
};

export default NotificationModal;
