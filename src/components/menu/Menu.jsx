import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('Now');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Session') {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className='navnav1 nav-bar d-flex align-items-center justify-content-center w-100'>
      <div className='back'>
        <ul className='nav-bar-links'>
          <Link to={"/home"}>
            <li
              style={{backgroundColor: '#00bbf0'}}
              className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
              onClick={() => handleTabClick('Now')}
            >
              Live
            </li>
          </Link>
          <Link to={"/today"}>
            <li
              style={{backgroundColor: '#3b3b3b'}} //btn-light
              className={`btn btn-sm  ${activeTab === 'Day' ? 'active' : ''}`}
              onClick={() => handleTabClick('Day')}
            >
              Day
            </li>
          </Link>
          <Link to={"/week"}>
            <li
              style={{backgroundColor: '#3b3b3b'}}
              className={`btn btn-sm  ${activeTab === 'Week' ? 'active' : ''}`}
              onClick={() => handleTabClick('Week')}
            >
              Week
            </li>
          </Link>
          <li
            style={{backgroundColor: '#3b3b3b'}}
            className={`btn btn-sm  ${activeTab === 'Session' ? 'active' : ''}`}
            onClick={() => handleTabClick('Session')}
          >
            Session<IoMdArrowDropdown size={20} className='icon-drop-month'/>
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <Link to={"/month"} className='dropdown-item' onClick={() => handleTabClick('Session')}>
                Session
              </Link>
              <Link to={"/monthactive"} className='dropdown-item' onClick={() => handleTabClick('Month')}>
                Month
              </Link>
            </div>
          </li>
          <Link to={"/year"}>
            <li
              style={{backgroundColor: '#3b3b3b'}}
              className={`btn btn-sm  ${activeTab === 'Year' ? 'active' : ''}`}
              onClick={() => handleTabClick('Year')}
            >
              Year
            </li>
          </Link>
          <Link to={"/custom"}>
            <li
              style={{backgroundColor: '#3b3b3b'}}
              className={`btn btn-sm  ${activeTab === 'Custom' ? 'active' : ''}`}
              onClick={() => handleTabClick('Custom')}
            >
              Custom
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
