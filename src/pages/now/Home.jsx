import React from 'react'
import './Home.css'
import Navbar from '../../components/navbar/Navbar'
import Menu from '../../components/menu/Menu'
import BottomNav from '../../components/bottommenu/BottomNav'
import HomeChart from './HomeChart'
import HomeCostChart from './HomeCostChart'


const Home = () => {
  return (
    <div>
        <Navbar/>
        <Menu/>
        <div className='page'>
          <div className='chart-now-kw'>
            <HomeChart/>
          </div>
          <div className='chart-now-cost'>
            <HomeCostChart/>
          </div>
        </div>
        <BottomNav/>
    </div>
  )
}

export default Home