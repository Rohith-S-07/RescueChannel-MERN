import React from 'react';
import { BsSearch, BsPinAngleFill, BsBullhornFill, BsPersonXFill } from 'react-icons/bs';

const AgencyChat = () => {
  return (
    <div className="d-flex flex-wrap" style={{ minHeight: '90vh', backgroundColor: '#f8f9fa' }}>
      {/* Left Section - Table and Actions */}
      <div className="col-md-6 p-4">
        {/* Action Buttons */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <ul className="list-inline">
            <li className="list-inline-item">
              <button className="btn btn-outline-secondary" title="Remove">
                <BsPersonXFill />
              </button>
            </li>
            <li className="list-inline-item">
              <button className="btn btn-outline-secondary" title="Pin Agency">
                <BsPinAngleFill />
              </button>
            </li>
            <li className="list-inline-item">
              <button className="btn btn-outline-secondary" title="Announce">
                <BsBullhornFill />
              </button>
            </li>
          </ul>
        </div>

        {/* Search Bar */}
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search..." />
          <button className="btn btn-primary" type="button">
            <BsSearch />
          </button>
        </div>

        {/* Table for agencies */}
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-light">
              <tr>
                <th>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th>Members</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://via.placeholder.com/40"
                      className="rounded-circle me-2"
                      alt="member"
                    />
                    <div>
                      <strong>CDRI</strong>
                      <p className="mb-0">https://www.cdri.world/</p>
                    </div>
                  </div>
                </td>
                <td>Affected Region 5</td>
                <td>
                  <span className="badge bg-success">Ongoing</span>
                </td>
              </tr>
              {/* You can add more rows like above */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Section - Chatbox */}
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
