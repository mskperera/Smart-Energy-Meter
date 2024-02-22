import React from 'react'
import './Today.css'
import Navbar from '../../components/navbar/Navbar'
//import Menu from '../../components/menu/Menu'
import { Link } from 'react-router-dom'
import BottomNav from '../../components/bottommenu/BottomNav'
import TodayKw from './TodayKw'
import TodayCost from './TodayCost'


function Today() {
  return (
    <>
      <Navbar/>
      <div className='nav-bar'>
            <ul className='nav-bar-links'>
                <Link to={"/home"}><li className='btn btn-sm btn-primary'>Now</li></Link> 
                <Link to={"/today"}><li className='btn btn-sm btn-primary'>Today</li></Link>  
                <Link to={"/week"}><li className='btn btn-sm btn-primary'>Week</li></Link>
                <Link to={"/month"}><li className='btn btn-sm btn-primary'>Month</li></Link>
                <Link to={"/year"}><li className='btn btn-sm btn-primary'>Year</li></Link>
                <Link to={"/custom"}><li className='btn btn-sm btn-primary'>Custom</li></Link>
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