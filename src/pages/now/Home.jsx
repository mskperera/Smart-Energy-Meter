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


const Home = () => {



  return (
    <div>
        <Navbar/>
        <Menu/>
        <div className='page'>
          <div className='chart-now-kw'>
            <HomeChart data=''/>
          </div>
          <div className='chart-now-cost'>
            <HomeCostChart data=''/>
          </div>
        </div>

        <div className='bottom'>
            <div><Voltage/></div>
            <div><Current/></div>
            <div><Power/></div>
            <div></div>
        </div>
        <BottomNav/>
    </div>
  )
}

export default Home