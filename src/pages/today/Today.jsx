import React, { useEffect, useState } from 'react'
import './Today.css'
import Navbar from '../../components/navbar/Navbar'
//import Menu from '../../components/menu/Menu'
import { Link } from 'react-router-dom'
import BottomNav from '../../components/bottommenu/BottomNav'
import TodayKw from './TodayKw'
import TodayCost from './TodayCost'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Today() {

  const [activeTab, setActiveTab] = useState('Now');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
 
  const [isSearchLoading, setIsSearchLoading] = useState(false);


  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSearch = () => {
   setIsSearchLoading(!isSearchLoading);
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

// const defSelecedDevice=localStorage.getItem('selectedDevice');
// console.log('defSelecedDevice',defSelecedDevice)
// const deviceNames=useSelector(state=>state.device.dropDeviceList);
// const defaultSelctedDevie= defSelecedDevice || deviceNames[0]
// useEffect(()=>{
// setDevice(defaultSelctedDevie);
// },[deviceNames])

  return (
    <div className='home'>
        <Navbar onChangeDevice={onChangeDeviceHandler}/>
      
        <div className='nav-bar d-flex align-items-center justify-content-center w-100'>
          <div className='back'>

              <ul className='nav-bar-links'>
                  <Link to={"/home"}><li className='btn btn-sm btn-light'>Now</li></Link> 
                  <Link to={"/today"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                  onClick={() => handleTabClick('Now')}>Day</li></Link>  
                  <Link to={"/week"}><li className='btn btn-sm btn-light'>Week</li></Link>
                  <Link to={"/month"}><li className='btn btn-sm btn-light'>Month</li></Link>
                  <Link to={"/year"}><li className='btn btn-sm btn-light'>Year</li></Link>
                  <Link to={"/custom"}><li className='btn btn-sm btn-light'>Custom</li></Link>
              </ul>
          </div>
      </div>
        <div className='page-5 body icon'>

        <div className='date'>
          <div className='picker'>
        <div>
            <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                dateFormat='dd MMM yyyy'
            />
        </div>
        
         <div>
            <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                dateFormat='dd MMM yyyy'
            />
         </div>
         
         <button className='btn-search btn btn-sm btn-primary' onClick={handleSearch}>Search</button>
         </div>
          </div>

          <div className='chart-custom'>
            {/* <div className='chart-today-kw'> */}
            <div className='chart-pick-kw'>
              <TodayKw selectedDevice={device || defaultSelctedDevie} startDate={startDate } endDate={endDate} isSearchLoading={isSearchLoading}/>
            </div>
            {/* <div className='chart-today-cost'> */}
            <div className='chart-pick-cost'>
              <TodayCost selectedDevice={device || defaultSelctedDevie} startDate={startDate} endDate={endDate} isSearchLoading={isSearchLoading}/>
            </div>
         </div>


        </div>
            <BottomNav/>
    
    </div>
  )
}

export default Today