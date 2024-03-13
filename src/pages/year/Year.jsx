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
        <div className='home'>
          <Navbar/>
          <div className='nav-bar d-flex align-items-center justify-content-center w-100'>
            <div className='back'>
                <ul className='nav-bar-links'>
                    <Link to={"/home"}><li className='btn btn-sm btn-light'>Now</li></Link> 
                    <Link to={"/today"}><li className='btn btn-sm btn-light'>Today</li></Link>  
                    <Link to={"/week"}><li className='btn btn-sm btn-light'>Week</li></Link>
                    <Link to={"/month"}><li className='btn btn-sm btn-light'>Month</li></Link>
                    <Link to={"/year"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}>Year</li></Link>
                    <Link to={"/custom"}><li className='btn btn-sm btn-light'>Custom</li></Link>
                </ul>
            </div>
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
        </div>
      )
}

export default Year