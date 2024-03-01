import React, { useState } from 'react'
import './Today.css'
import Navbar from '../../components/navbar/Navbar'
//import Menu from '../../components/menu/Menu'
import { Link } from 'react-router-dom'
import BottomNav from '../../components/bottommenu/BottomNav'
import TodayKw from './TodayKw'
import TodayCost from './TodayCost'


function Today() {

  const [activeTab, setActiveTab] = useState('Now');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar/>
      <div className='nav-bar'>
            <ul className='nav-bar-links'>
                <Link to={"/home"}><li className='btn btn-sm btn-info'>Now</li></Link> 
                <Link to={"/today"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}>Today</li></Link>  
                <Link to={"/week"}><li className='btn btn-sm btn-info'>Week</li></Link>
                <Link to={"/month"}><li className='btn btn-sm btn-info'>Month</li></Link>
                <Link to={"/year"}><li className='btn btn-sm btn-info'>Year</li></Link>
                <Link to={"/custom"}><li className='btn btn-sm btn-info'>Custom</li></Link>
            </ul>
    </div>
    <div className='page-1'>
      <div className='chart-today-kw'>
        <TodayKw/>
      </div>
      <div className='chart-today-cost'>
        <TodayCost/>
      </div>
    </div>
           <BottomNav/>
    
    </>
  )
}

export default Today