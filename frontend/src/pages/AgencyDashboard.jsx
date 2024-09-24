import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  // Sample data for resources used by fire stations
  const resources = [
    {
      id: 1,
      name: "Fire Hose",
      type: "Equipment",
      quantity: 20,
      status: "Available",
    },
    {
      id: 2,
      name: "Ladder Truck",
      type: "Vehicle",
      quantity: 5,
      status: "In Use",
    },
    {
      id: 3,
      name: "Thermal Imaging Camera",
      type: "Equipment",
      quantity: 10,
      status: "Available",
    },
    {
      id: 4,
      name: "Water Tank",
      type: "Equipment",
      quantity: 15,
      status: "Maintenance Required",
    },
  ];

  return (
    <div className="agency-content hero p-3">
      {/* SearchBar */}
      <div className="row p-3">
        
          <form action="/dashboard" method="GET" className="d-flex w-100">
            <input
              type="text"
              className="form-control me-2"
              name="q"
              placeholder="Search your resources..."
            />
            <button type="submit" className="btn btn-outline-info me-2">
              <i className="bi bi-search"></i>
            </button>
          </form>
        
      </div>

      {/* Resource Management */}
      <div className="row px-3">
        {resources.map((resource) => (
          <div key={resource.id} className="col-12 mb-2">
            <div className="bg-light rounded shadow-sm p-2 border border-light d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between w-100">
                <div className="flex-grow-1">
                  <h5 className="text-primary mb-1">{resource.name}</h5>
                  <div className='d-flex justify-content-between w-50'>
                    <span className="text-dark">Type: {resource.type}</span>
                    <span className="text-dark ms-3">Quantity: {resource.quantity}</span>
                    <span className="text-dark ms-3">
                      <i className="bi bi-check-circle text-success"></i> {resource.status}
                    </span>
                  </div>
                </div>
                <div>
                  <Link to={`/edit/${resource.id}`} className="btn btn-warning btn-sm me-2">
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
    </div>
  );
};

export default Dashboard;
