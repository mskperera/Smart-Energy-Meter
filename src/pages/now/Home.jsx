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

import AreaChart from './AreaChart'
// import home from '../../assent/home.jpg'
// import { Link } from 'react-router-dom'



const Home = () => {

  return (
    <div className='home'>
        <Navbar className='navnav'/>
        <Menu className='navnav1'/>
        
    <div className='body2'>
        <div className='page'>
          <div className='chart-now-kw'>
            <HomeChart data=''/>
          </div>
          <div className='chart-now-cost'>
            <HomeCostChart data=''/>
          </div>
          {/* <div className='chart-area'>
            <AreaChart/>
          </div> */}
        </div>
        <div className='page-bottom'>
          <div className='vol'><Voltage/></div>
          <div className='vol'><Current/></div>
          <div className='vol'><Power/></div>
          <div className='pow'><Powerfact/></div>
          <div className='pow'><Hertz/></div>
        </div>
    </div>

        <BottomNav className='bottombar1'/>
      </div>
  )
}

export default Home