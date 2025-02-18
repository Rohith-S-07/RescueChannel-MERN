import React from 'react';
// import { BsSearch, BsPinAngleFill, BsBullhornFill, BsPersonXFill } from 'react-icons/bs';

const AgencyChat = () => {
  return (
    <div className="d-flex flex-wrap" style={{ minHeight: '90vh', backgroundColor: '#f8f9fa' }}>
      {/* Left Section - Table and Actions */}
      <div className="col-md-12 p-4">
        {/* Action Buttons */}
        

        {/* Search Bar */}
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search..." />
          <button className="btn btn-primary" type="button">
            {/* <BsSearch /> */}
          </button>
        </div>

      </div>

      {/* - Chatbox */}
      <div className="col-md-6 p-4">
        <div className="card">
          <div className="card-body d-flex flex-column justify-content-between" style={{ height: '100%' }}>
            {/* Chat History */}
            <div>
              <div className="d-flex align-items-start mb-3">
                <img
                  src="https://via.placeholder.com/40"
                  className="rounded-circle me-2"
                  alt="chat-user"
                />
                <div>
                  <strong>NDRF</strong>
                  <small className="d-block text-muted">12:45</small>
                  <div className="alert alert-primary mb-0">4 teams already deployed with medical Assistance!</div>
                </div>
              </div>
              <div className="d-flex align-items-start justify-content-end mb-3">
                <div>
                  <strong>DBPT Volunteers</strong>
                  <small className="d-block text-muted">12:46</small>
                  <div className="alert alert-secondary mb-0">Be Quick!</div>
                </div>
                <img
                  src="https://via.placeholder.com/40"
                  className="rounded-circle ms-2"
                  alt="chat-user"
                />
              </div>
            </div>

            {/* Chat Input */}
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
              />
              <button className="btn btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyChat;
