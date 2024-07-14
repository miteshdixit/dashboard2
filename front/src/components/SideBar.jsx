/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { FaHome, FaTachometerAlt, FaTable, FaUsers, FaBars } from 'react-icons/fa';

function SideBar() {
  const [isSidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
  };

  return (
    <div >
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`sidebar d-flex flex-column p-3 bg-light ${isSidebarActive ? 'active' : ''}`}>
        <a to="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
         

        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a to="#" className="nav-link link-dark " aria-current="page">
              <FaHome className="me-2" size={16} />
              Home
            </a>
          </li>
          <li>
            <a to="#" className="nav-link active ">
              <FaTachometerAlt className="me-2" size={16} />
              Dashboard
            </a>
          </li>
          <li>
            <a to="#" className="nav-link link-dark">
              <FaTable className="me-2" size={16} />
              Orders
            </a>
          </li>
       
          <li>
            <a to="#" className="nav-link link-dark">
              <FaUsers className="me-2" size={16} />
              Customers
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>mitesh</strong>
          </a>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
