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
import KwChartData from './boxdata/KwChartData'

// import AreaChart from './AreaChart'
import CostChartData from './boxdata/CostChartData'

import LineChart from './LineChart'

// import home from '../../assent/home.jpg'



const Home = () => {

  return (
    <div className='home'>
        <Navbar className='navnav'/>
        <Menu className='navnav1'/>
        
    <div className='body'>
        <div className='page'>
          <div className='chart-kw'>
            {/* <Link to={'/service'}><CostChartData/></Link> */}
            <CostChartData/>
            <KwChartData/>
          </div>
          
          <div className='chart-now-kw'>
            <HomeChart data=''/>
          </div>
          <div className='chart-now-cost'>
            <HomeCostChart data=''/>
          </div>

        </div>
          <div className='chart-area d-flex align-items-center justify-content-center'>
            {/* <AreaChart/> */}
            <LineChart/>
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