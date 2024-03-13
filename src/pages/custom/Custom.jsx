import React, { useState } from 'react'
import BottomNav from '../../components/bottommenu/BottomNav'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import './Custom.css'
import CustomKw from './CustomKw'
import CustomCost from './CustomCost'
import Date from './Date'


function Custom() {

  const [activeTab, setActiveTab] = useState('Now');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
    
    return (
      
        <div className='home'>
          <Navbar/>
          <div className='nav-bar d-flex align-items-center justify-content-center w-100'>
            <div className='back'>
                <ul className='nav-bar-links'>
                    <Link to={"/home"}><li className='btn btn-sm btn-light'>Now</li></Link> 
                    <Link to={"/today"}><li className='btn btn-sm btn-light'>Today</li></Link>  
                    <Link to={"/week"}><li className='btn btn-sm btn-light'>Week</li></Link>
                    <Link to={"/month"}><li className='btn btn-sm btn-light'>Month</li></Link>
                    <Link to={"/year"}><li className='btn btn-sm btn-light'>Year</li></Link>
                    <Link to={"/custom"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}>Custom</li></Link>
                </ul>
              </div>
        </div>
        <div className='page-5'>
          <div className='date'>
            <Date onDateChange={(startDate, endDate) => {
              setSelectedStartDate(startDate);
              setSelectedEndDate(endDate);
            }}/>
          </div>
          <div className='chart-pick-kw'>
            <CustomKw startDate={selectedStartDate} endDate={selectedEndDate}/>
          </div>
          <div className='chart-pick-cost'>
            <CustomCost startDate={selectedStartDate} endDate={selectedEndDate}/>
          </div>
        </div>
            <BottomNav/>
        </div>
      )
}

export default Custom