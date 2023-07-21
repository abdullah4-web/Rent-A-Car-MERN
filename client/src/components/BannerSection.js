import React from 'react';
import { Link } from 'react-router-dom';

const BannerSection = () => {
  return (
    <div className="banner_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="banner_taital_main">
                    <h1 className="banner_taital">Car Rent <br/><span style={{ color: '#fe5b29' }}>For You</span></h1>
                    <p className="banner_text">Welcome to our car rental service, where your journey begins. Whether you're planning a road trip, a weekend getaway, or simply need a reliable mode of transportation, we've got you covered.</p>
                    <div className="btn_main">
                      <div className="contact_bt"><Link to ="/about">Read More</Link></div>
                      <div className="contact_bt active"><Link to = "/contact">Contact Us</Link></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
