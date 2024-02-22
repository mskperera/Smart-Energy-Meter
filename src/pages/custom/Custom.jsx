import React from 'react'
import BottomNav from '../../components/bottommenu/BottomNav'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import './Custom.css'
import CustomKw from './CustomKw'
import CustomCost from './CustomCost'
import Date from './Date'


function Custom() {
    
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
        <div className='date'>
          <Date/>
        </div>
        <div className='page-5'>
          <div className='chart-pick-kw'>
            <CustomKw/>
          </div>
          <div className='chart-pick-cost'>
            <CustomCost/>
          </div>
        </div>
            <BottomNav/>
        </>
      )
}

export default Custom