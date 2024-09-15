import React from 'react';

const VictimsPortal = () => {
  return (
    <div className='agency-content hero d-flex flex-column p-3'>
        <h1 className="display-5 font-weight-bold mb-2">Victims Portal</h1>
        <p className="mb-4">
          Here you can view all the reports of disasters or calamities that the victims have submitted. It is important to note that these reports are <span className="text-danger">not verified</span> by any authority and are only for reference purposes.
        </p>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <h6 className="dropdown-header">Filter By Type</h6>
              <a className="dropdown-item" href="#">
                Medical
              </a>
              <a className="dropdown-item" href="#">
                Fire
              </a>
              <a className="dropdown-item" href="#">
                Earthquake
              </a>
              <a className="dropdown-item" href="#">
                Flood
              </a>
              <a className="dropdown-item" href="#">
                Other
              </a>
            </div>
          </div>

          <input
            type="text"
            className="form-control w-100 ml-3"
            placeholder="Search for a particular report..."
          />
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Medical</h5>
                  <p className="card-text text-muted">20-30 people affected</p>
                </div>
                <p className="card-text">
                  <i className="fas fa-user mr-2"></i> Tharun Kumar
                </p>
                <p className="card-text">
                  <i className="fas fa-phone mr-2"></i> 9638527410
                </p>
                <p className="card-text">
                  <i className="fas fa-map-marker-alt mr-2"></i> R.S Puram, Coimbatore
                </p>
              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Fire</h5>
                  <p className="card-text text-muted">5-10 people affected</p>
                </div>
                <p className="card-text">
                  <i className="fas fa-user mr-2"></i> Dhanush
                </p>
                <p className="card-text">
                  <i className="fas fa-phone mr-2"></i> 9638527410
                </p>
                <p className="card-text">
                  <i className="fas fa-map-marker-alt mr-2"></i> Ramanathapuram, Coimbatore
                </p>
              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Earthquake</h5>
                  <p className="card-text text-muted">40-60 people affected</p>
                </div>
                <p className="card-text">
                  <i className="fas fa-user mr-2"></i> Sriram
                </p>
                <p className="card-text">
                  <i className="fas fa-phone mr-2"></i> 9638527410
                </p>
                <p className="card-text">
                  <i className="fas fa-map-marker-alt mr-2"></i> Ukkadam, Coimbatore
                </p>
              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Flood</h5>
                  <p className="card-text text-muted">80-100 people affected</p>
                </div>
                <p className="card-text">
                  <i className="fas fa-user mr-2"></i> Barani
                </p>
                <p className="card-text">
                  <i className="fas fa-phone mr-2"></i> 9638527410
                </p>
                <p className="card-text">
                  <i className="fas fa-map-marker-alt mr-2"></i> Mettupalayam, Coimbatore
                </p>
              </div>
            </div>
          </div>

        </div>
    </div>
  );
};

export default VictimsPortal;
