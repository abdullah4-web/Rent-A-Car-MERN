import client1 from '../images/client-img1.png';
import client2 from '../images/client-img2.png';
import quick from '../images/quick-icon.png';

const ClientSection = () => {
  return (
   
    <div className="client_section layout_padding">
  <div className="container">
    <div id="custom_slider" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row">
            <div className="col-md-12">
              <h1 className="client_taital">What Says Customers</h1>
            </div>
          </div>
          <div className="client_section_2">
            <div className="row">
              <div className="col-md-6">
                <div className="client_taital_box">
                  <div className="client_img"><img src={client1} /></div>
                  <h3 className="moark_text">Hannery</h3>
                  <p className="client_text">It is a long established fact that a reader will be distracted by the readable content of a page</p>
                </div>
                <div className="quick_icon"><img src={quick}/></div>
              </div>
              <div className="col-md-6">
                <div className="client_taital_box">
                  <div className="client_img"><img src={client2} /></div>
                  <h3 className="moark_text">Channery</h3>
                  <p className="client_text">It is a long established fact that a reader will be distracted by the readable content of a page</p>
                </div>
                <div className="quick_icon"><img src={quick}/></div>
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

export default ClientSection;