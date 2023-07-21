import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChartLine, FaCar, FaSignOutAlt } from 'react-icons/fa';
import './AdminNavbar.css';
import { RentContext } from '../Pages/RentContext';

const AdminNavbar = () => {
  const { logout } = useContext(RentContext);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
  };

  return (
    <nav className="admin-navbar">
      <ul className="admin-navbar__link-list">
        <li>
          <Link to="/" className="admin-navbar__link">
            <FaHome className="admin-navbar__link-icon" />
            <span className="admin-navbar__link-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/dashboard" className="admin-navbar__link">
            <FaChartLine className="admin-navbar__link-icon" />
            <span className="admin-navbar__link-text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/addcar" className="admin-navbar__link">
            <FaCar className="admin-navbar__link-icon" />
            <span className="admin-navbar__link-text">Add Car</span>
          </Link>
        </li>
        <li>
          <Link to="/showcars" className="admin-navbar__link">
            <FaCar className="admin-navbar__link-icon" />
            <span className="admin-navbar__link-text">Show Cars</span>
          </Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout} className="admin-navbar__link">
            <FaSignOutAlt className="admin-navbar__link-icon" />
            <span className="admin-navbar__link-text">Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
