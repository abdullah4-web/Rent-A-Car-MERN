import React from 'react';
import img1 from '../images/img-1.png';
import img2 from '../images/img-2.png';
import img3 from '../images/img-3.png';


const GallerySection = () => {
  return (
    <div className="gallery_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="gallery_taital">Our best offers</h1>
          </div>
        </div>
        <div className="gallery_section_2">
          <div className="row">
            <div className="col-md-4">
              <div className="gallery_box">
                <div className="gallery_img"><img src={img1} alt="Gallery Image" /></div>
                <h3 className="types_text">Toyota car</h3>
                <p className="looking_text">Start per day $4500</p>
                <div className="read_bt"><a href="/">Book Now</a></div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery_box">
                <div className="gallery_img"><img src={img1} alt="Gallery Image" /></div>
                <h3 className="types_text">Toyota car</h3>
                <p className="looking_text">Start per day $4500</p>
                <div className="read_bt"><a href="/">Book Now</a></div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery_box">
                <div className="gallery_img"><img src={img3} alt="Gallery Image" /></div>
                <h3 className="types_text">Toyota car</h3>
                <p className="looking_text">Start per day $4500</p>
                <div className="read_bt"><a href="/">Book Now</a></div>
              </div>
            </div>
          </div>
        </div>
        <div className="gallery_section_2">
          <div className="row">
            <div className="col-md-4">
              <div className="gallery_box">
                <div className="gallery_img"><img src={img1} alt="Gallery Image" /></div>
                <h3 className="types_text">Toyota car</h3>
                <p className="looking_text">Start per day $4500</p>
                <div className="read_bt"><a href="/">Book Now</a></div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery_box">
                <div className="gallery_img"><img src={img2} alt="Gallery Image" /></div>
                <h3 className="types_text">Toyota car</h3>
                <p className="looking_text">Start per day $4500</p>
                <div className="read_bt"><a href="/">Book Now</a></div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery_box">
                <div className="gallery_img"><img src={img3} alt="Gallery Image" /></div>
                <h3 className="types_text">Toyota car</h3>
                <p className="looking_text">Start per day $4500</p>
                <div className="read_bt"><a href="/">Book Now</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
