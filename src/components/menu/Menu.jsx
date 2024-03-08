import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = () => {

  const [activeTab, setActiveTab] = useState('Now');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    // <div className='row'>
      <div className='nav-bar d-flex align-items-center justify-content-center w-100'>
        <div className='back'>
              <ul className='nav-bar-links'>
                  <Link to={"/home"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                  onClick={() => handleTabClick('Now')}>Now</li></Link> 
                  <Link to={"/today"}><li className='btn btn-sm btn-info bg-transparent'>Today</li></Link>  
                  <Link to={"/week"}><li className='btn btn-sm btn-info bg-transparent'>Week</li></Link>
                  <Link to={"/month"}><li className='btn btn-sm btn-info bg-transparent'>Month</li></Link>
                  <Link to={"/year"}><li className='btn btn-sm btn-info bg-transparent'>Year</li></Link>
                  <Link to={"/custom"}><li className='btn btn-sm btn-info bg-transparent'>Custom</li></Link>
              </ul>

        </div>
      </div>
    // </div>
  )
}

export default Menu