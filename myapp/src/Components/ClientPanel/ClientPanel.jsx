import React, { useState } from 'react';
import './ClientPanel.css'

const ClientPanel = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

  return (
    <div className='ClientPanel'>
       {/* Icon or button to toggle dropdown */}
      <div className="dropdown-icon" onClick={toggleDropdown}>
        <i className="fa fa-user" aria-hidden="true"></i> {/* Example icon */}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <a href="/myorders">My Orders</a>
            </li>
            <li>
              <a href="/myaccount">My Account</a>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ClientPanel
