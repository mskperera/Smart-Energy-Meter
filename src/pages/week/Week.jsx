import React, { useState } from 'react'
import './Week.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import BottomNav from '../../components/bottommenu/BottomNav'
import WeekKw from './WeekKw'
import WeekCost from './WeekCost'


function Week() {

  const [activeTab, setActiveTab] = useState('Now');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div className='home'>  
      <Navbar/>
      <nav className='nav-bar d-flex align-items-center justify-content-center w-100'>
        <div className='back'>
            <ul className='nav-bar-links'>
                <Link to={"/home"}><li className='btn btn-sm btn-light'>Now</li></Link> 
                <Link to={"/today"}><li className='btn btn-sm btn-light'>Today</li></Link>  
                <Link to={"/week"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}>Week</li></Link>
                <Link to={"/month"}><li className='btn btn-sm btn-light'>Month</li></Link>
                <Link to={"/year"}><li className='btn btn-sm btn-light'>Year</li></Link>
                <Link to={"/custom"}><li className='btn btn-sm btn-light'>Custom</li></Link>
            </ul>
        </div>
    </nav>
    <div className='page-2'>
      <div className='chart-week-kw'>
       <WeekKw/>
      </div>
      <div className='chart-week-cost'>
        <WeekCost/>
      </div>
    </div>
      <BottomNav/>
    </div>
  )
}

export default Week