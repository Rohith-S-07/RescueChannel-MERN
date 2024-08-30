import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllAgencies = ({ agencies }) => {
  return (
    <div className=" hero d-flex flex-column p-3">
      {/* Search Bar */}
      <div className="row p-3">
        <div className="col-md-12 d-flex align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search a particular Agency..."
          />
          {/* <div className="dropdown ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="filterDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-bars"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="filterDropdown">
              <li className="text-center fw-bold">Filter By</li>
              <li><a className="dropdown-item" href="#">RO Status</a></li>
              <li><a className="dropdown-item" href="#">Region</a></li>
            </ul>
          </div> */}
          <button className="btn btn-ghost ms-3">
            <div className="position-relative">
              <i className="fas fa-bell"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                <span className="visually-hidden">unread messages</span>
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Agencies List */}
      <div className="row px-3 gy-4">
        {/* {agencies.map((agency, index) => ( */}
          <div className="col-12">
            <div className="bg-light rounded shadow-sm p-4 border">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="text-dark">Agency Name</h3>
                  <p className="text-muted">Agency Locality</p>
                  <p className="text-secondary">
                    Agency About
                  </p>
                </div>
                <div className="d-flex flex-column justify-content-between align-items-end">
                  <p className="d-flex align-items-center text-muted">
                    <i className="fas fa-envelope me-2"></i>
                    Mail id
                  </p>
                  
                  <p className="d-flex align-items-center text-muted">
                    <i className="fas fa-phone me-2"></i>
                    Agency Phone
                  </p>
                </div>
              </div>
            </div>
          </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default AllAgencies;
