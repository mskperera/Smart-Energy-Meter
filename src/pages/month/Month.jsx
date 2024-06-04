import React, { useEffect, useState } from 'react'
import './Month.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import BottomNav from '../../components/bottommenu/BottomNav'
import MonthKw from './MonthKw'
import MonthCost from './MonthCost'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Month() {

  const [activeTab, setActiveTab] = useState('Now');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
 
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // const [search, setSearch] = useState(null);

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

  return (
    <div className='home'>
      <Navbar onChangeDevice={onChangeDeviceHandler}/>
      <div className='nav-bar d-flex align-items-center justify-content-center w-100'>
        <div className='back'>
            <ul className='nav-bar-links'>
                <Link to={"/home"}><li className='btn btn-sm btn-light'>Now</li></Link> 
                <Link to={"/today"}><li className='btn btn-sm btn-light'>Day</li></Link>  
                <Link to={"/week"}><li className='btn btn-sm btn-light'>Week</li></Link>
                <Link to={"/month"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}>Month</li></Link>
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

              <div className='chart-pick-kw'>
                <MonthKw  selectedDevice={device || defaultSelctedDevie} startDate={startDate} endDate={endDate} isSearchLoading={isSearchLoading}/>
              </div>
              <div className='chart-pick-cost'>
                <MonthCost selectedDevice={device || defaultSelctedDevie} startDate={startDate} endDate={endDate} isSearchLoading={isSearchLoading}/>
              </div>
          </div>
      
    </div>
           <BottomNav/>
    </div>
  )
}

export default Month