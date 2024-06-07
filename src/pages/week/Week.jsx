import React, { useEffect, useState } from 'react'
import './Week.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import BottomNav from '../../components/bottommenu/BottomNav'
import WeekKw from './WeekKw'
import WeekCost from './WeekCost'
import { useSelector } from 'react-redux'
import DeviceChartWeek from './DeviceChartWeek'


function Week() {

  const [activeTab, setActiveTab] = useState('Now');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [device, setDevice] = useState('');

  const onChangeDeviceHandler=(device)=>{
    setDevice(device);
  }

  const deviceNames=useSelector(state=>state.device.dropDeviceList);
  const defaultSelctedDevie=deviceNames[0]
  useEffect(()=>{
setDevice(defaultSelctedDevie);
  },[deviceNames])


  const [devices, setDevices] = useState([
    {
      date:"2024-06-06T18:30:00Z", day:"06", hour:"18", 
  year:"24",
  month : "06",

  lines:[
    {lineNo:"l1",kwhPerDay:0.12,maxKwh:1934.61, pf: 0.64,current: 0.91, power: 139.6,usageBill: 92339, usageBillPerDay: 13,voltage: 242.5,},
    // {lineNo:"l2",kwhPerHour:0.12,maxKwh:1934.61, pf: 0.64,current: 0.91, power: 139.6,usageBill: 92339, usageBillPerHour: 13,voltage: 242.5,},
    // {lineNo:"l3",kwhPerHour:0.12,maxKwh:1934.61, pf: 0.64,current: 0.91, power: 139.6,usageBill: 92339, usageBillPerHour: 13,voltage: 242.5,},
  ]
    },{
      date:"2024-06-06T18:30:00Z", day:"06", hour:"18", 
  year:"24",
  month : "06",

  lines:[
    {lineNo:"l1",kwhPerDay:0.12,maxKwh:1934.61, pf: 0.64,current: 0.91, power: 139.6,usageBill: 92339, usageBillPerDay: 13,voltage: 242.5,},
    // {lineNo:"l2",kwhPerHour:0.12,maxKwh:1934.61, pf: 0.64,current: 0.91, power: 139.6,usageBill: 92339, usageBillPerHour: 13,voltage: 242.5,},
    // {lineNo:"l3",kwhPerHour:0.12,maxKwh:1934.61, pf: 0.64,current: 0.91, power: 139.6,usageBill: 92339, usageBillPerHour: 13,voltage: 242.5,},
  ]
    },
  ]);

  return (
    <div className='home'>  
      <Navbar  onChangeDevice={onChangeDeviceHandler}/>
      <nav className='nav-bar d-flex align-items-center justify-content-center w-100'>
        <div className='back'>
            <ul className='nav-bar-links'>
                <Link to={"/home"}><li className='btn btn-sm btn-light'>Now</li></Link> 
                <Link to={"/today"}><li className='btn btn-sm btn-light'>Day</li></Link>  
                <Link to={"/week"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}>Week</li></Link>
                <Link to={"/month"}><li className='btn btn-sm btn-light'>Month</li></Link>
                <Link to={"/year"}><li className='btn btn-sm btn-light'>Year</li></Link>
                <Link to={"/custom"}><li className='btn btn-sm btn-light'>Custom</li></Link>
            </ul>
        </div>
    </nav>
    <div className='page-4 body'>
      {/* <div className='chart-week-kw'>
       <WeekKw selectedDevice={device || defaultSelctedDevie}/>
      </div>
      <div className='chart-week-cost'>
        <WeekCost selectedDevice={device || defaultSelctedDevie}/>
      </div> */}
      {devices?.map((device, index) => (
        <div key={index}>
         <DeviceChartWeek
          device={device}
         />
        </div>
      ))}
    </div>
      <BottomNav/>
    </div>
  )
}

export default Week