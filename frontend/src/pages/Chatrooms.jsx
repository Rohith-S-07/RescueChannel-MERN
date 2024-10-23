import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatRooms = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sos');
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    const handleEditClick = (report) => {
        setSelectedReport(report);
        setShowEditModal(true);
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        // Add logic to handle the update of the report here

        alert('Report updated successfully!');
        setShowEditModal(false);
    };

    return (
        <div className='agency-content hero d-flex flex-column p-3'>
            <h1 className="text-center text-light mb-3">Chat Rooms</h1>
            <p className="text-muted text-center">
                Here you can see all the reports where your rescue team is currently coordinating with other rescue teams.
            </p>

            <div className="row">
                {reports.map((report) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={report._id}>
                        <div className="card shadow-lg mb-4 border-0">
                            <div className="card-body">
                                <h5 className="card-title">{report.emergencyType}</h5>
                                <p className="card-text">
                                    <strong>Location:</strong> {report.location ? `${report.location.latitude}, ${report.location.longitude}` : 'Location not specified'}
                                </p>
                                <p className="card-text">
                                    <strong>Affected People:</strong> {report.affectedPeople}
                                </p>
                                <p className="card-text">
                                    <strong>Respondent:</strong> {report.respondentName}
                                </p>
                                <p className="card-text">
                                    <strong>Status:</strong> {report.status}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleEditClick(report)}
                                >
                                    Edit Report
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Report</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {selectedReport && (
                                    <form onSubmit={handleEditSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="emergencyType" className="form-label">Emergency Type</label>
                                            <input type="text" className="form-control" id="emergencyType" defaultValue={selectedReport.emergencyType} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="location" className="form-label">Location</label>
                                            <input type="text" className="form-control" id="location" defaultValue={selectedReport.location} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="affectedPeople" className="form-label">Affected People</label>
                                            <input type="number" className="form-control" id="affectedPeople" defaultValue={selectedReport.affectedPeople} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="respondentName" className="form-label">Respondent Name</label>
                                            <input type="text" className="form-control" id="respondentName" defaultValue={selectedReport.respondentName} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="status" className="form-label">Status</label>
                                            <select className="form-select" id="status" defaultValue={selectedReport.status} required>
                                                <option value="in-progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                                <option value="requires-assistance">Requires Assistance</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-success">Update Report</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRooms;
