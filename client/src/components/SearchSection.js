import React from 'react';

const SearchSection = () => {
  return (
    <div className="search_section" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#363636", padding: "40px 0px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="search_taital" style={{ fontSize: "40px", color: "#fefefd", fontWeight: "bold" }}>Search Your Best Cars</h1>
            <p className="search_text" style={{ fontSize: "16px", color: "#fefefd", margin: "0px" }}>This serves as an invitation to embark on a journey to find your dream vehicle.</p>
            {/* search bar section start */}
            <div className="container d-flex justify-content-center">
              <div className="search_bar_section">
                <div className="search_bar_main">
                  <div className="row">
                    <div className="col-md-7 d-flex justify-content-center">
                      <div className="input-group">
                      
                      </div>
                    </div>

                    <div className="col-md-5 d-flex justify-content-center">
                      <div className="input-group">
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* search bar section end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
