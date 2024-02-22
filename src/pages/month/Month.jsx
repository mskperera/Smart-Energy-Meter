import React from 'react'
import './Month.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import BottomNav from '../../components/bottommenu/BottomNav'
import MonthKw from './MonthKw'
import MonthCost from './MonthCost'

function Month() {
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

    <div className='page-3'>
      <div className='chart-month-kw'>
        <MonthKw/>
      </div>
      <div className='chart-month-cost'>
        <MonthCost/>
      </div>
    </div>
           <BottomNav/>
    </>
  )
}

export default Month