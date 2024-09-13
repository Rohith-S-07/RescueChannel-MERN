import React from 'react';
import EmergencyTeam from '../assets/images/emergency-team.png'
import TypingAnimation from '../components/TypingAnimation';
import BottomBar from '../components/BottomBar';


const AboutUs = () => {
  return (
    <div className='page-content'>
      <div className="hero row m-2 mb-2 p-4 align-items-center justify-content-center">
        <div className="col-md-6 d-flex ">
          <div>
            <img src={EmergencyTeam} alt="Rescue" className="card-img-top rounded-top" />
            <div className="text-center text-warning text-wrap">
              <TypingAnimation text=' "Unity to be real must stand the severest strain without breaking." - Mahatma Gandhi' />
            </div>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <h2 className="text-3xl text-center custom-heading">Our Main Pillars</h2>
          <h4 className="font-bold text-info">The Power of Unity</h4>
          <p className="text-sm mb-4">
            We firmly believe that unity is the cornerstone of effective disaster response. By bringing together diverse
            agencies and their invaluable expertise, we harness the power of collaboration to make a profound difference
            when it matters most.
          </p>
          <h4 className="font-bold text-info">Streamlining Emergency Response</h4>
          <p className="text-sm">
            Our organization serves as the catalyst for this unified approach, facilitating seamless coordination,
            resource-sharing, and communication among rescue agencies. We believe that streamlining these efforts is the
            key to minimizing response times and saving lives.
          </p>
        </div>
      </div>

      <h2 className="text-center text-2xl font-bold my-4 custom-heading">Frequently Asked Questions</h2>
      <div className="d-flex justify-content-center mb-5 mx-4">
        <div className="flex-1 max-w-5xl space-y-4 w-100">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item accordion-bg">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  What is Rescue Channel?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Rescue Channel is a platform that brings together various rescue agencies under one umbrella to
                  provide rapid and reliable response during calamities and emergencies.
                </div>
              </div>
            </div>

            <div className="accordion-item accordion-bg">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  How does Rescue Channel work?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Rescue Channel facilitates seamless coordination and communication among rescue agencies. It provides
                  a central platform where agencies can share resources, expertise, and information, ensuring a more
                  efficient response to disasters.
                </div>
              </div>
            </div>

            <div className="accordion-item accordion-bg">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  What sets Rescue Channel apart from other emergency response systems?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Rescue Channel's unique strength lies in its ability to unite multiple rescue agencies, fostering
                  collaboration and resource-sharing. This collaborative approach enhances the speed and efficiency of
                  emergency responses, ultimately saving more lives.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default AboutUs;
