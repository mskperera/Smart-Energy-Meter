import React from 'react'
import './Month.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import BottomNav from '../../components/bottommenu/BottomNav'
import MonthKw from './MonthKw'

function Month() {
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

    <div className='page-3'>
        <MonthKw/>
    </div>
           <BottomNav/>
    </>
  )
}

export default Month