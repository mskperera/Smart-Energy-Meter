import React from 'react'
import './Week.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import BottomNav from '../../components/bottommenu/BottomNav'
import WeekKw from './WeekKw'


function Week() {
  return (
    <>  
      <Navbar/>
      <nav className='nav-bar'>
            <ul className='nav-bar-links'>
                <Link to={"/home"}><li className='btn btn-primary'>Now</li></Link> 
                <Link to={"/today"}><li className='btn btn-primary'>Today</li></Link>  
                <Link to={"/week"}><li className='btn btn-primary'>Week</li></Link>
                <Link to={"/month"}><li className='btn btn-primary'>Month</li></Link>
            </ul>
   
    </nav>
    <div className='page-2'>
       <WeekKw/>
    </div>
      <BottomNav/>
    </>
  )
}

export default Week