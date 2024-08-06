import React from 'react';
import ChopperHelp from '../assets/images/chopper_help.jpg';
import EmergencyCall from '../assets/images/emergency-call.png';

const SOSFormPage = () => {
  return (

    <div className="hero row m-3 p-4">
        <div className="col-md-6 d-flex justify-content-end">
        <img
          src={EmergencyCall}
          alt="Rescue Background"
          className="img-fluid"
          style={{ opacity: 0.8, height: '100%', width: 'auto', maxHeight: '60vh' }}
        />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-3">
        <h1 className="custom-heading">In an emergency?</h1>
        <p className="fs-6 mb-4">
           Fill out the form below to notify the nearby Rescue Teams. They will be there to help you as soon as possible.
         </p>
         <p className="text-danger font-weight-bold mb-4">
           * Only fill this form in case of an emergency *
         </p>
         <form>
           <div className="mb-3">
             <input
               type="text"
               className="form-control"
               placeholder="Name of the Respondent"
             />
           </div>
           <div className="mb-3">
             <input
               type="text"
               className="form-control"
               placeholder="Phone Number (+91)"
             />
           </div>
           <div className="mb-3 d-flex">
             <select className="form-select me-2">
               <option selected disabled>Type of emergency</option>
               <option>Medical</option>
               <option>Fire</option>
               <option>Earthquake</option>
               <option>Flood</option>
               <option>Other</option>
             </select>
             <select className="form-select">
               <option selected disabled>Apx. number of people affected</option>
               <option>1-5</option>
               <option>5-10</option>
               <option>10-20</option>
               <option>20-50</option>
               <option>50+</option>
             </select>
           </div>
           <button type="submit" className="btn btn-danger w-100">Notify</button>
         </form>
        </div>
      </div>



    // <div className="hero row mt-3 p-4 align-items-center">
 
    //   <div className="col-md-6">
    //     
    //   </div>
    // </div>
    
  );
};

export default SOSFormPage;
