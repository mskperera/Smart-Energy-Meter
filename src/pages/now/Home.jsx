import React, { useEffect, useState } from 'react'
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

import DeviceName from './DeviceName'
import AreaChart from './AreaChart'
import { useSelector } from 'react-redux'
import { MdClose } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'

// import home from '../../assent/home.jpg'



const Home = () => {

  const [device, setDevice] = useState('');
  const [toggleMenu, setToggleMenu] = useState(false);

  const onChangeDeviceHandler=(device)=>{
    setDevice(device);
  }

   const deviceNames=useSelector(state=>state.device.dropDeviceList);
   const defaultSelctedDevie=deviceNames[0]
   useEffect(()=>{
setDevice(defaultSelctedDevie);
   },[deviceNames])


  return (
    <div className='home'>
        <Navbar className='navnav' onChangeDevice={onChangeDeviceHandler}/>
        <Menu className='navnav1'/>
  {device && <div className='body'>
        <div className='device-active'>
          <div className='curcle'></div>
          <div className='device-name'><DeviceName selectedDevice={device || defaultSelctedDevie}/></div>
        </div>
          
        <div className='device-active-2'>
          <div className="dropdown" style={{ marginLeft: '10px' }} >
            <select className="dropdown-line">
              <option value="L1">Line-1</option>
              <option value="L2">Line-2</option>
              <option value="L3">Line-3</option>
              
            </select>
          </div>
          </div>
          
        <div className='page'>
          {/* <div className='chart-kw'>
            
            <CostChartData/>
            <KwChartData/>
            
          </div> */}
          
          <div className='chart-now-kw'>
            <HomeChart data='' selectedDevice={device || defaultSelctedDevie}/>
          </div>
          <div className='chart-now-cost'>
            <HomeCostChart data=''selectedDevice={device  || defaultSelctedDevie}/>
          </div>

        </div>
          <div className='chart-area d-flex align-items-center justify-content-center'>
            {/* <AreaChart/> */}
            <LineChart selectedDevice={device  || defaultSelctedDevie}/>
           
          </div>
        <div className='page-bottom'>
          <div className='vol'><Voltage selectedDevice={device  || defaultSelctedDevie}/></div>
          <div className='vol'><Current selectedDevice={device  || defaultSelctedDevie}/></div>
          <div className='vol'><Power selectedDevice={device  || defaultSelctedDevie}/></div>
          <div className='pow'><Powerfact selectedDevice={device  || defaultSelctedDevie}/></div>
          <div className='pow'><Hertz selectedDevice={device  || defaultSelctedDevie}/></div>
        </div>
    </div>}

        <BottomNav className='bottombar1'/>
      </div>
  )
}

export default Home