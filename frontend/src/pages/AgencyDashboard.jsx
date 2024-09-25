import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddEquipmentModal from '../components/AddEquipmentModal';

const AgencyDashboard = () => {
  const [resources, setResources] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchResources = async () => {
      const userId = localStorage.getItem('userId');
      
      if (userId) {
        try {
          const response = await axios.get('http://localhost:5000/api/resources', {
            params: { userId }  // Pass userId as a query parameter
          });
          setResources(response.data); // Store the resources in state
        } catch (error) {
          console.error("Error fetching resources:", error);
        }
      } else {
        console.error("userId not found in localStorage");
      }
    };
  
    fetchResources();
  }, []);  

  // Handler to add a new resource to the list
  const handleAddResource = (newResource) => {
    setResources(prevResources => [...prevResources, newResource]);
  };

  return (
    <div className="agency-content hero p-3 vh-100">
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add Equipment
      </button>

      {/* Render your resources */}
      {resources.length === 0 ? (
        <p>No resources found for this user.</p>
      ) : (
        <div className="row px-3">
          {resources.map((resource) => (
            <div key={resource._id} className="col-12 mb-2">
              <div className="bg-light rounded shadow-sm p-2 border border-light d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between w-100">
                  <div className="flex-grow-1">
                    <h5 className="text-primary mb-1">{resource.name}</h5>
                    <div className="d-flex justify-content-between w-50">
                      <span className="text-dark">Type: {resource.type}</span>
                      <span className="text-dark ms-3">Total: {resource.quantity}</span>
                      <span className="text-dark ms-3">In Use: {resource.inUse}</span>
                      <span className="text-dark ms-3">
                        Available: {resource.quantity - resource.inUse}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Link to={`/edit/${resource._id}`} className="btn btn-warning btn-sm me-2">
                      <i className="bi bi-pencil"></i> Edit
                    </Link>
                    <button className="btn btn-danger btn-sm">
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Include the Add Equipment Modal */}
      <AddEquipmentModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        handleAddResource={handleAddResource} 
      />
    </div>
  );
};

export default AgencyDashboard;
