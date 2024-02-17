import React from 'react'
import './Today.css'
import Navbar from '../../components/navbar/Navbar'
//import Menu from '../../components/menu/Menu'
import { Link } from 'react-router-dom'
import BottomNav from '../../components/bottommenu/BottomNav'
import TodayKw from './TodayKw'


function Today() {
  return (
    <>
      <Navbar/>
      <div className='nav-bar'>
            <ul className='nav-bar-links'>
                <Link to={"/"}><li className='btn btn-primary'>Now</li></Link> 
                <Link to={"/today"}><li className='btn btn-primary'>Today</li></Link>  
                <Link to={"/week"}><li className='btn btn-primary'>Week</li></Link>
                <Link to={"/month"}><li className='btn btn-primary'>Month</li></Link>
            </ul>
    </div>
    <div className='page-1'>
     <TodayKw/>
    </div>
           <BottomNav/>
    
    </>
  )
}

export default Today