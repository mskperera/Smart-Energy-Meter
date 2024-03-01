import React, { useState } from 'react'
import './Year.css'
import Navbar from '../../components/navbar/Navbar'
import { Link } from 'react-router-dom'
import BottomNav from '../../components/bottommenu/BottomNav'
import YearCost from './YearCost'
import YearKw from './YearKw'


function Year() {

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
                    <Link to={"/today"}><li className='btn btn-sm btn-info'>Today</li></Link>  
                    <Link to={"/week"}><li className='btn btn-sm btn-info'>Week</li></Link>
                    <Link to={"/month"}><li className='btn btn-sm btn-info'>Month</li></Link>
                    <Link to={"/year"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}>Year</li></Link>
                    <Link to={"/custom"}><li className='btn btn-sm btn-info'>Custom</li></Link>
                </ul>
        </div>
    
        <div className='page-4'>
          <div className='chart-year-kw'>
             <YearKw/>
          </div>
          <div className='chart-year-cost'>
             <YearCost/>
          </div>
        </div>
               <BottomNav/>
        </>
      )
}

export default Year