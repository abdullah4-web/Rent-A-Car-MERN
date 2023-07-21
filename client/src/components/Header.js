import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import { useMediaQuery } from 'react-responsive';
import { RentContext } from '../Pages/RentContext';
import './Header.css';

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isNavOpen, setNavOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const { state, logout } = useContext(RentContext);
  const { user } = state;

  const isAdmin = user && user.isAdmin;

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    closeNav();
  };

  return (
    <>
      <div className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Logo" />
            </Link>
            {isMobile && (
              <button
                className={`navbar-toggler custom-toggler ${isNavOpen ? 'open' : ''}`}
                type="button"
                onClick={toggleNav}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            )}
            <div
              className={`collapse navbar-collapse ${isMobile ? (isNavOpen ? 'show' : '') : 'show'}`}
              id="navbarSupportedContent"
            >
              <ul className={`navbar-nav ml-auto ${isMobile ? 'mobile-nav' : ''}`}>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={closeNav}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about" onClick={closeNav}>
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/services" onClick={closeNav}>
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/vehicles" onClick={closeNav}>
                    Vehicles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/client" onClick={closeNav}>
                    Client
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact" onClick={closeNav}>
                    Contact
                  </Link>
                </li>
                {user ? (
                  <>
                    {!isAdmin && (
                      <li className={`nav-item ${isAdmin ? 'dropdown' : ''}`}>
                        <Link
                          className={`nav-link ${isAdmin ? 'dropdown-toggle' : ''}`}
                          to="#"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded={isDropdownOpen ? 'true' : 'false'}
                          onClick={toggleDropdown}
                        >
                          {user.name}
                        </Link>
                        <div
                          className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                          aria-labelledby="navbarDropdown"
                          onClick={closeDropdown}
                        >
                          <Link className="dropdown-item" to="/userprofile" onClick={closeNav}>
                            Profile 
                          </Link>
                          <Link className="dropdown-item" to="/allbookings" onClick={closeNav}>
                            All Bookings
                          </Link>
                          {/* Add more links for user-specific pages */}
                        </div>
                      </li>
                    )}
                    {isAdmin && (
                      <li className={`nav-item ${isAdmin ? 'dropdown' : ''}`}>
                        <Link
                          className={`nav-link ${isAdmin ? 'dropdown-toggle' : ''}`}
                          to="#"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded={isDropdownOpen ? 'true' : 'false'}
                          onClick={toggleDropdown}
                        >
                          Admin
                        </Link>
                        <div
                          className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                          aria-labelledby="navbarDropdown"
                          onClick={closeDropdown}
                        >
                          <Link className="dropdown-item" to="/admin/dashboard" onClick={closeNav}>
                            Dashboard
                          </Link>
                          <Link className="dropdown-item" to="/addcar" onClick={closeNav}>
                            Add Car
                          </Link>
                          <Link className="dropdown-item" to="/showcars" onClick={closeNav}>
                            Show Cars 
                          </Link>
                          <Link className="dropdown-item" to="/showcars" onClick={closeNav}>
                            Edit Cars 
                          </Link>
                          <Link className="dropdown-item" to="/userbookedcars" onClick={closeNav}>
                            All Bookings
                          </Link>
                          
                          <Link className="dropdown-item" to="/userlist" onClick={closeNav}>
                            User List
                          </Link>
                        </div>
                      </li>
                    )}
                    <li className="nav-item">
                      <Link className="nav-link" to="/" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login" onClick={closeNav}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register" onClick={closeNav}>
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              <form className="form-inline my-2 my-lg-0"></form>
            </div>
          </nav>
        </div>
      </div>

      {!isMobile && (
        <div className="call_text_main">
          <div className="container">
            <div className="call_taital">
              <div className="call_text">
                <Link to="#">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span className="padding_left_15">Hangu KPK Pakistan </span>
                </Link>
              </div>
              <div className="call_text">
                <Link to="#">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span className="padding_left_15">(+92) 3329530330</span>
                </Link>
              </div>
              <div className="call_text">
                <Link to="#">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span className="padding_left_15">sami@gmail.com</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
