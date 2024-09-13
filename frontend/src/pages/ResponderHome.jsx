// src/pages/HomePage.js
import React from 'react';
import ndrf_logo from '../assets/images/ndrf_logo.png';
import ndma_logo from '../assets/images/ndma_logo.png'
import nidm_logo from '../assets/images/nidm_logo.png'
import cdri_logo from '../assets/images/cdri_logo.png'
import TypingAnimation from '../components/TypingAnimation';
import EmergencyImage from '../assets/images/emergency.png';
import BottomBar from '../components/BottomBar';


const ResponderHome = () => {
  return (
    <div className='page-content'>
      <div className="hero row m-2 mb-2 p-4 ">
        <div className="col-md-6 d-flex justify-content-end">
          <img
            src={EmergencyImage}
            alt="Rescue Background"
            className="img-fluid emg-img"
            style={{ height: '100%', width: 'auto', maxHeight: '60vh' }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-3">
          <h1 className="text-bold fs-1 custom-heading">Rescue Channel</h1>
          <div className=" z-20 mt-3 typing-text">
          <TypingAnimation text=" ' Unity is strength... when there is teamwork and collaboration, wonderful things can be achieved.  ' - Mattie Stepanek "/>
          </div>
          <a className="btn btn-danger mt-4 z-20 opacity-80" href="/sos-form">
            In Need of Help?
          </a>
        </div>
      </div>

      <div>
        {/* Our Mission Section */}
        <div className="flex flex-col items-center justify-center hero mt-5 m-2 p-4">
          <h2 className="custom-heading font-bold text-center my-4">Our Mission</h2>
          <p className="text-[min(1rem,2.5vw)] text-center max-w-4xl px-4">
          Our mission at <span className="font-bold custom-text">Rescue Channel</span> is to unify and empower rescue agencies worldwide, ensuring swift, coordinated, 
          and effective responses to emergencies. By fostering collaboration and sharing resources, we can amplify our collective impact and save more lives. In times 
          of crisis, <span className="custom-text">every second counts</span>, and our goal is to be the beacon of hope, guiding and supporting the heroes who risk their lives to 
          save others. We bring together diverse rescue organizations to form a cohesive, powerful network, streamlining communication and resource-sharing to enhance the 
          speed and effectiveness of emergency responses. Our unwavering commitment to saving lives drives everything we do, leveraging the latest technology and best practices 
          to continuously improve our operations and impact.
          </p>
        </div>


        {/* Join Us Section */}
        <div id="joinus" className="flex w-full flex-col align-items-center justify-center hero mt-5 m-2 p-4">
          <h2 className="text-3xl font-bold text-center mb-4 custom-heading">Join Us</h2>
          <p className="text-center px-8 typing-text">
            <TypingAnimation text=' " Alone, we can do so little; together, we can do so much.  — Helen Keller'/>
            
          </p>
          <p className="text-xl text-center px-8 my-4 mb-8 leading-relaxed max-w-5xl">
            We are always looking to expand our network of agencies and are open to working with new agencies. If you are
            interested in working with us, please register your agency by clicking the button below.
          </p>
          <div className="d-flex justify-content-center align-items-center">
            <a href="/signup" className="w-full max-w-md">
              <button className="btn btn-info w-full max-w-md">Register Your Agency</button>
            </a>
          </div>
        </div>        


        {/* Agencies We Work With Section */}
        <div className="flex flex-col items-center justify-center bg-base-200 hero mt-5 m-2 p-4">
          <h2 className="text-3xl font-bold text-center my-4 custom-heading">Agencies We Work With</h2>
          <p className="text-xl text-center my-4 leading-relaxed mx-8 max-w-5xl">
            We work with a number of agencies to ensure that we are able to provide the best possible service to our
            customers. We are always looking to expand our network of agencies and are open to working with new agencies.
          </p>
          <div className="d-flex justify-content-evenly mt-8 flex-wrap">
            <div className="flex flex-col items-center justify-center">
              <img
                src={ndma_logo}
                alt="Agency 1"
                className="w-32 h-32 object-cover logo-size"
              />
              <p className="text-xl mt-4 text-center">NDMA</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src={ndrf_logo}
                alt="Agency 2"
                className="w-32 h-32 object-cover logo-size"
              />
              <p className="text-xl mt-4 text-center">NDRF</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src={nidm_logo}
                alt="Agency 3"
                className="w-32 h-32 logo-size"
              />
              <p className="text-xl mt-4 text-center">NIDM</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src={cdri_logo}
                alt="Agency 4"
                className="w-32 h-32 logo-size"
              />
              <p className="text-xl mt-4 text-center">CDRI</p>
            </div>
          </div>
        </div>

        
      </div>
      <BottomBar/>
    </div>
  );
};

export default ResponderHome;
