import React from 'react'
import './Week.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import BottomNav from '../../components/bottommenu/BottomNav'
import WeekKw from './WeekKw'
import WeekCost from './WeekCost'


function Week() {
  return (
    <>  
      <Navbar/>
      <nav className='nav-bar'>
            <ul className='nav-bar-links'>
                <Link to={"/home"}><li className='btn btn-sm btn-primary'>Now</li></Link> 
                <Link to={"/today"}><li className='btn btn-sm btn-primary'>Today</li></Link>  
                <Link to={"/week"}><li className='btn btn-sm btn-primary'>Week</li></Link>
                <Link to={"/month"}><li className='btn btn-sm btn-primary'>Month</li></Link>
                <Link to={"/year"}><li className='btn btn-sm btn-primary'>Year</li></Link>
                <Link to={"/custom"}><li className='btn btn-sm btn-primary'>Custom</li></Link>
            </ul>
   
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
    </>
  )
}

export default Week