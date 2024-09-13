import React from 'react';
import contactus from '../assets/images/contactus.png'
import BottomBar from '../components/BottomBar';

const ContactUs = () => {
  return (
    
    <div>
      <div className=" page-content hero row m-2 mb-2 p-4">
        <img
          src={contactus}
          alt="Pomodoro"
          className="col-md-6 px-5  max-w-lg md:px-0"
        />
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h1 className="custom-heading">Want to Contact Us?</h1>
          <p className="text-start mb-4">
            We are always ready to help you. If you have any queries or suggestions, feel free to type them below.
          </p>
          <form className="d-flex flex-column align-items-center w-100" method="" action="">
            <div className="d-flex align-items-center justify-between mb-4 w-100">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="form-control w-75 mr-2"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="form-control w-100 ml-2"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control w-100 mb-4"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message (Feel free to thoroughly explain your query or suggestion here.)"
              className="form-control w-100 mb-4"
            ></textarea>
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
    </div>
    <BottomBar/>
    </div>
      
    
  );
};

export default ContactUs;
