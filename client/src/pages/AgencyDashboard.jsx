import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddEquipmentModal from '../components/AddEquipmentModal';
import AddInspectionModal from '../components/AddInspectionModal';
import EditResourceModal from '../components/EditResourceModal';
import config from '../config';

const AgencyDashboard = () => {
  const [resources, setResources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState({}); // State to manage visibility of inspection logs

  useEffect(() => {
    const fetchResources = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get(`${config.BASE_URL}/api/resources`, {
            params: { userId }
          });
          setResources(response.data);
        } catch (error) {
          console.error("Error fetching resources:", error);
        }
      }
    };
    fetchResources();
  }, []);

  const handleAddResource = (newResource) => {
    setResources(prevResources => [...prevResources, newResource]);
  };

  const handleAddInspection = (updatedResource) => {
    setResources(prevResources => prevResources.map(resource =>
      resource._id === updatedResource._id ? updatedResource : resource
    ));
    setShowInspectionModal(false);
  };

  const handleEditResource = (updatedResource) => {
    setResources(prevResources => prevResources.map(resource =>
      resource._id === updatedResource._id ? updatedResource : resource
    ));
    setShowEditModal(false);
  };

  // Function to toggle visibility of inspection logs
  const toggleLogsVisibility = (resourceId) => {
    setVisibleLogs(prevState => ({
      ...prevState,
      [resourceId]: !prevState[resourceId] // Toggle the visibility
    }));
  };

  return (
    <div className="agency-content hero p-3 vh-100">
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add Equipment to the Inventory
        <i class="bi bi-journal-plus ms-2"></i>
      </button>

      {resources.length === 0 ? (
        <p>No resources found for this user.</p>
      ) : (
        <div className="row px-3">
          {resources.map((resource) => (
            <div key={resource._id} className="col-12 mb-2">
              <div className="bg-light rounded shadow-sm p-3 border border-light d-flex flex-column justify-content-between">
                <div className="flex-grow-1 text-dark">
                  <h5 className="text-primary mb-1">{resource.name}</h5>
                  <div className='mb-2'><b className='me-1'>Type:</b> {resource.type}</div>
                  <div className='mb-2'><b className='me-1'>Status: </b><span className={`badge fs-5 bg-${resource.status === 'active' ? 'success' : resource.status === 'maintenance' ? 'warning' : resource.status === 'expired' ? 'danger' : 'secondary'}`}>
                    {resource.status}
                  </span></div>
                  {resource.expiryDate && <div className='mb-2'><b className='me-1'>Expiry Date: </b> {new Date(resource.expiryDate).toLocaleDateString()}</div>}
                  <div className='mb-2'><b className='me-1'>Condition:</b> {resource.condition}</div>
                  <div className='mb-2'><b className='me-1'>Vendor:</b> {resource.vendorName}</div>

                  <div className="mt-2 d-flex justify-content-between align-items-center">
                    <div>
                      <button className="btn btn-outline-warning btn-sm " onClick={() => {
                        setSelectedResource(resource);
                        setShowEditModal(true);
                      }}>
                        <i class="bi bi-pencil-square me-2"></i>
                        Edit
                      </button>
                    </div>
                    <div>
                    <button className="btn btn-outline-success btn-sm me-3" onClick={() => {
                      setSelectedResource(resource);
                      setShowInspectionModal(true);
                    }}>
                      <i class="bi bi-plus-square me-2"></i>
                      Add Inspection Log
                    </button>

                    <button className="btn btn-outline-info btn-sm" onClick={() => toggleLogsVisibility(resource._id)}>
                      {visibleLogs[resource._id] ? (
                        <>
                          <i className="bi bi-eye-slash me-1"></i> Hide Inspection Logs
                        </>
                      ) : (
                        <>
                          <i className="bi bi-eye"></i> View Inspection Logs
                        </>
                      )}
                    </button>
                    </div>
                    
                  </div>
                </div>

                {/* Display inspection logs */}
                {visibleLogs[resource._id] && (
                  <ul className="list-group mt-2">
                    <li className="list-group-item active">Inspection Logs:</li>
                    {resource.inspectionLogs.length > 0 ? (
                      resource.inspectionLogs.map((log, index) => (
                        <li key={index} className="list-group-item">
                          <strong>{new Date(log.date).toLocaleDateString()}</strong>: {log.notes}
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">No inspection logs found.</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Equipment Modal */}
      <AddEquipmentModal showModal={showModal} setShowModal={setShowModal} handleAddResource={handleAddResource} />

      {/* Add Inspection Modal */}
      {selectedResource && (
        <AddInspectionModal
          showInspectionModal={showInspectionModal}
          setShowInspectionModal={setShowInspectionModal}
          resource={selectedResource}
          handleAddInspection={handleAddInspection}
        />
      )}

      {/* Edit Resource Modal */}
      {selectedResource && (
        <EditResourceModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          resource={selectedResource}
          handleEditResource={handleEditResource}
        />
      )}
    </div>
  );
};

export default AgencyDashboard;
