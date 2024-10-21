import React, { useState } from 'react';
import axios from 'axios';
import contactus from '../assets/images/contactus.png';
import BottomBar from '../components/BottomBar';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    subject: '',
    query_type: '',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contactus', formData);
      if (response.data.success) {
        setStatusMessage('Thanks for reaching out! We will look into your request and follow up with you within 2-5 working days.');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          subject: '',
          query_type: '',
          message: ''
        });
      } else {
        setStatusMessage('Something went wrong, please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatusMessage('There was an error, please try again.');
    }
  };

  return (
    <div>
      <div className="page-content hero row m-2 mb-2 p-4">
        <h1 className="custom-heading text-center">Want to Contact Us?</h1>
        <p className="text-start mb-2 text-center">
          We are always ready to help. Please feel free to share your queries or feedback below.
        </p>
        <img
          src={contactus}
          alt="Contact Us"
          className="col-md-6 p-5 max-w-lg md:px-0"
        />
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <form className="d-flex flex-column align-items-center w-100" onSubmit={handleSubmit}>
            {/* First Name and Last Name */}
            <div className="d-flex align-items-center justify-content-between mb-2 w-100">
              <div className="w-50 me-4">
                <label htmlFor="first_name"><i className="bi bi-person-fill me-1"></i> First Name</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  className="form-control mt-1"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-50 ml-2">
                <label htmlFor="last_name"><i className="bi bi-person-fill"></i> Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  className="form-control mt-1"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Email and Phone on the same row */}
            <div className="d-flex align-items-center justify-content-between mb-2 w-100">
              <div className="w-50 me-4">
                <label htmlFor="email"><i className="bi bi-envelope-fill"></i> Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="form-control mt-1"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-50 ml-2">
                <label htmlFor="phone"><i className="bi bi-telephone-fill"></i> Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  className="form-control mt-1"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="mb-2 w-100">
              <label htmlFor="subject"><i className="bi bi-chat-left-text-fill"></i> Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Subject"
                className="form-control mt-1"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>

            {/* Query Type */}
            <div className="mb-2 w-100">
              <label htmlFor="query_type"><i className="bi bi-question-circle-fill"></i> Query Type</label>
              <select
                name="query_type"
                id="query_type"
                className="form-control mt-1"
                value={formData.query_type}
                onChange={handleInputChange}
              >
                <option value="">-- Select Query Type --</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
                <option value="technical_issue">Technical Issue</option>
                <option value="agency_complaint">Complaint about an Agency</option>
              </select>
            </div>

            {/* Message */}
            <div className="mb-4 w-100">
              <label htmlFor="message"><i className="bi bi-pencil-fill"></i> Message</label>
              <textarea
                name="message"
                id="message"
                rows="5"
                placeholder="Your Message (Feel free to thoroughly explain your query or suggestion here.)"
                className="form-control mt-1"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="btn btn-success w-100" type="submit">Submit</button>
          </form>

          {/* Status message */}
          {statusMessage && <div className="mt-4 alert alert-info w-100">{statusMessage}</div>}
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default ContactUs;
