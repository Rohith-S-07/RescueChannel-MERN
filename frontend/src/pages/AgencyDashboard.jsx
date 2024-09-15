import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = ({ posts }) => {
  return (
    <div className="agency-content hero p-3">
      {/* SearchBar */}
      <div className="row p-3">
        <div className="col-md-8 d-flex">
          <form action="/dashboard" method="GET" className="d-flex w-100">
            <input
              type="text"
              className="form-control me-2"
              name="q"
              placeholder="Search your feed..."
            />
            <button type="submit" className="btn btn-outline-secondary me-2">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <Link to="/post/new" className="btn btn-outline-info rounded-pill me-3">
            <i className="fas fa-circle-plus"></i> Post
          </Link>
          <button className="btn btn-ghost">
            <div className="position-relative">
              <i className="fas fa-bell"></i>
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle badge-sm"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="row px-3">
          <div className="col-12 mb-4">
            <Link className="text-decoration-none">
              <div className="bg-light rounded shadow-sm p-4 border border-light hover-shadow">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="text-dark">Title</h3>
                    <p className="text-muted">- User</p>
                    <p className="text-secondary">
                      Post Content
                    </p>
                  </div>
                  <div className="d-flex flex-column justify-content-between align-items-end">
                    <li className="d-flex align-items-center text-muted">
                      <i className="fas fa-spinner me-2"></i>
                      Status
                    </li>
                    <li className="d-flex align-items-center text-muted">
                      <i className="fas fa-location-dot me-2"></i>
                      Location
                    </li>
                    <li className="d-flex align-items-center text-muted">
                      <i className="fas fa-user-group me-2"></i>
                      Manpower
                    </li>
                  </div>
                </div>
              </div>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
