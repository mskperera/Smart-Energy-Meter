import React from 'react'
import './Home.css'
import Navbar from '../../components/navbar/Navbar'
import Menu from '../../components/menu/Menu'
import BottomNav from '../../components/bottommenu/BottomNav'
import HomeChart from './HomeChart'
import HomeCostChart from './HomeCostChart'
import Voltage from './Voltage'
import Current from './Current'
import Power from './Power'
import Hertz from './Hertz'
import Powerfact from './Powerfact'
// import { Link } from 'react-router-dom'



const Home = () => {

  return (
    <>
        <Navbar/>
        <Menu/>
        {/* <div className='nav-bar'>
            <ul className='nav-bar-links'>
                <Link to={"/home"}><li className='btn btn-sm btn-primary'>Now</li></Link> 
                <Link to={"/today"}><li className='btn btn-sm btn-primary'>Today</li></Link>  
                <Link to={"/week"}><li className='btn btn-sm btn-primary'>Week</li></Link>
                <Link to={"/month"}><li className='btn btn-sm btn-primary'>Month</li></Link>
                <Link to={"/year"}><li className='btn  btn-sm btn-primary'>Year</li></Link>
                <Link to={"/custom"}><li className='btn btn-sm btn-primary'>Custom</li></Link>
            </ul>
    </div> */}
        <div className='page'>
          <div className='chart-now-kw'>
            <HomeChart data=''/>
          </div>
          <div className='chart-now-cost'>
            <HomeCostChart data=''/>
          </div>

        </div>
        <div className='page-bottom'>
          <div className='vol'><Voltage/></div>
          <div className='vol'><Current/></div>
          <div className='vol'><Power/></div>
          <div className='bottom-3'>
                <Hertz/>
                <Powerfact/>
          </div>
        </div>

        <BottomNav className="bar1"/>
      </>
  )
}

export default Home