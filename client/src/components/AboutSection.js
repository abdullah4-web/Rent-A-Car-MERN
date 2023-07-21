import React from 'react';
import About from '../images/about-img.png';
import { Link } from 'react-router-dom';
const AboutSection = () => {
  return (
    <div className="about_section layout_padding">
      <div className="container">
        <div className="about_section_2">
          <div className="row">
            <div className="col-md-6">
              <div className="image_iman">
                <img src={About} className="about_img" alt="About" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="about_taital_box">
                <h1 className="about_taital">About <span style={{ color: '#fe5b29' }}>Us</span></h1>
                <p className="about_text">Going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined </p>
                <div className="readmore_btn"><Link to= '/about'>Read More</Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
