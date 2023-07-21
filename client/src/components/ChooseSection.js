import React from 'react';
import Icon1 from '../images/icon-1.png';
import Icon2 from '../images/icon-2.png';
import Icon3 from '../images/icon-3.png';

const ChooseSection = () => {
  return (
    <div className="choose_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="choose_taital">WHY CHOOSE US</h1>
          </div>
        </div>
        <div className="choose_section_2">
          <div className="row">
            <div className="col-sm-4">
              <div className="icon_1"><img src={Icon1} alt="Icon 1" /></div>
              <h4 className="safety_text">SAFETY & SECURITY</h4>
              <p className="ipsum_text">variations of passages of Lorem Ipsum available, but the majority have</p>
            </div>
            <div className="col-sm-4">
              <div className="icon_1"><img src={Icon2}  alt="Icon 2" /></div>
              <h4 className="safety_text">Online Booking</h4>
              <p className="ipsum_text">variations of passages of Lorem Ipsum available, but the majority have</p>
            </div>
            <div className="col-sm-4">
              <div className="icon_1"><img src={Icon3}  alt="Icon 3" /></div>
              <h4 className="safety_text">Best Drivers</h4>
              <p className="ipsum_text">variations of passages of Lorem Ipsum available, but the majority have</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSection;
