import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmergencyCall from '../assets/images/emergency-call.png';
import NotificationModal from '../components/NotificationModal';

const SOSFormPage = () => {
  const [respondentName, setRespondentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emergencyType, setEmergencyType] = useState('');
  const [affectedPeople, setAffectedPeople] = useState('');
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/sos', {
        respondentName,
        phoneNumber,
        emergencyType,
        affectedPeople: Number(affectedPeople),
        location: { latitude, longitude }, // Include location data
      });
      setNotificationMessage('SOS report submitted successfully');
      setIsNotificationModalOpen(true);
      setRespondentName('');
      setPhoneNumber('');
      setEmergencyType('');
      setAffectedPeople('');
    } catch (error) {
      console.error('Error reporting SOS:', error);
      setNotificationMessage('Error reporting SOS');
      setIsNotificationModalOpen(true);
    }
  };

  return (
    <div className="hero row m-3 p-4">
      <div className="col-md-6 d-flex justify-content-end">
        <img
          src={EmergencyCall}
          alt="Rescue Background"
          className="img-fluid"
          style={{ opacity: 0.8, height: '100%', width: 'auto', maxHeight: '60vh' }}
        />
      </div>
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-3">
        <h1 className="custom-heading">In an emergency?</h1>
        <p className="fs-6 mb-4">
          Fill out the form below to notify the nearby Rescue Teams. They will be there to help you as soon as possible.
        </p>
        <p className="text-danger font-weight-bold mb-4">
          * Only fill this form in case of an emergency *
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name of the Respondent"
              value={respondentName}
              onChange={(e) => setRespondentName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number (+91)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 d-flex">
            <select
              className="form-select me-2"
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select type of emergency
              </option>
              <option value="Medical">Medical</option>
              <option value="Fire">Fire</option>
              <option value="Earthquake">Earthquake</option>
              <option value="Flood">Flood</option>
            </select>
            <select
              className="form-select"
              value={affectedPeople}
              onChange={(e) => setAffectedPeople(e.target.value)}
              required
            >
              <option value="" disabled>
                Apx. number of people affected
              </option>
              <option value="1">1</option>
              <option value="2">2+</option>
              <option value="5">5+</option>
              <option value="10">10+</option>
              <option value="20">20+</option>
              <option value="50">50+</option>
              <option value="100">100+</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success">
              Notify
            </button>
          </div>
        </form>
      </div>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onRequestClose={() => setIsNotificationModalOpen(false)}
        message={notificationMessage}
      />
    </div>
  );
};

export default SOSFormPage;
