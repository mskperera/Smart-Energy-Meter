import React, { useState } from 'react'
import './Month.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import BottomNav from '../../components/bottommenu/BottomNav'
import MonthKw from './MonthKw'
import MonthCost from './MonthCost'

function Month() {

  const [activeTab, setActiveTab] = useState('Now');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='home'>
      <Navbar/>
      <div className='nav-bar d-flex align-items-center justify-content-center w-100'>
        <div className='back'>
            <ul className='nav-bar-links'>
                <Link to={"/home"}><li className='btn btn-sm btn-light'>Now</li></Link> 
                <Link to={"/today"}><li className='btn btn-sm btn-light'>Today</li></Link>  
                <Link to={"/week"}><li className='btn btn-sm btn-light'>Week</li></Link>
                <Link to={"/month"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}>Month</li></Link>
                <Link to={"/year"}><li className='btn btn-sm btn-light'>Year</li></Link>
                <Link to={"/custom"}><li className='btn btn-sm btn-light'>Custom</li></Link>
            </ul>
          </div>
    </div>

    <div className='page-3'>
      <div className='chart-month-kw'>
        <MonthKw/>
      </div>
      <div className='chart-month-cost'>
        <MonthCost/>
      </div>
    </div>
           <BottomNav/>
    </div>
  )
}

export default Month