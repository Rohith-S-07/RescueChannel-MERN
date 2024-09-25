import React from 'react';
import { useState } from 'react';

const ChatRooms = () => {
    const [showCreateRoom, setShowCreateRoom] = useState(false);

    const handleCreateRoom = (event) => {
        event.preventDefault();
        alert('New room created successfully!');
        setShowCreateRoom(false);
    };

    return (
        <div className='agency-content hero d-flex flex-column p-3'>
            <h1 className="text-center text-light mb-3">Rooms</h1>
            <p className="text-muted text-center">
                Here you can see all the rooms where your rescue team is currently coordinating with other rescue teams.
            </p>

            <div className="mt-5">
                {/* Room 1 */}
                <div className="card shadow-lg mb-4 border-0">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex align-items-center">
                                <span className="badge bg-warning me-2"></span>
                                <h5 className="card-title mb-0">DMAD Rescue Team and NIDM Volunteers</h5>
                            </div>
                            <p className="text-danger mb-0">Operation in progress</p>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted">
                            <div className="d-flex flex-column">
                                <p>
                                    <i className="fas fa-map-marker-alt"></i> Location: <span className="fw-bold">Kerala, India</span>
                                </p>
                                <p>
                                    <i className="fas fa-users"></i> No. of People Affected: <span className="fw-bold">100</span>
                                </p>
                                <p>
                                    <i className="fas fa-clock"></i> Total Time Spent: <span className="fw-bold">2h 30m</span>
                                </p>
                            </div>
                            <div className="mt-3 mt-md-0">
                                <a href="/chatroom">
                                    <button className="btn btn-success btn-sm me-2">Enter Room</button>
                                </a>
                                <button className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure you want to end this operation?') && alert('Operation ended successfully!')}>
                                    <i className="fas fa-trash-alt"></i> End Operation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Room 2 */}
                <div className="card shadow-lg mb-4 border-0">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex align-items-center">
                                <span className="badge bg-danger me-2"></span>
                                <h5 className="card-title mb-0">NDRF Rescue Team and CDRI Rescue Team</h5>
                            </div>
                            <p className="text-danger mb-0">Operation requires immediate assistance</p>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted">
                            <div className="d-flex flex-column">
                                <p>
                                    <i className="fas fa-map-marker-alt"></i> Location: <span className="fw-bold">Delhi, India</span>
                                </p>
                                <p>
                                    <i className="fas fa-users"></i> No. of People Affected: <span className="fw-bold">+200</span>
                                </p>
                                <p>
                                    <i className="fas fa-clock"></i> Total Time Spent: <span className="fw-bold">7h 53m</span>
                                </p>
                            </div>
                            <div className="mt-3 mt-md-0">
                                <a href="/chatroom">
                                    <button className="btn btn-success btn-sm me-2">Enter Room</button>
                                </a>
                                <button className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure you want to end this operation?') && alert('Operation ended successfully!')}>
                                    <i className="fas fa-trash-alt"></i> End Operation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create New Room Button */}
            <div className="text-center">
                <button className="btn btn-primary mt-5" onClick={() => setShowCreateRoom(true)}>
                    Create New Room
                </button>
            </div>

            {/* Modal for Create New Room */}
            {showCreateRoom && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New Room</h5>
                                <button type="button" className="btn-close" onClick={() => setShowCreateRoom(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Start a new rescue operation by creating a new room with other rescue teams.</p>
                                <form onSubmit={handleCreateRoom}>
                                    <div className="mb-3">
                                        <label htmlFor="agency" className="form-label fw-bold">Select Agency to Coordinate With</label>
                                        <select className="form-select" id="agency" required>
                                            <option value="DMAD">DMAD</option>
                                            <option value="NIDM">NIDM</option>
                                            <option value="NDRF">NDRF</option>
                                            <option value="CDRI">CDRI</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="location" className="form-label fw-bold">Location of Operation</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="location" placeholder="Enter Location" required />
                                            <button className="btn btn-outline-secondary" type="button">
                                                <i className="fas fa-crosshairs"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success w-100">Create Room</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateRoom(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRooms;
