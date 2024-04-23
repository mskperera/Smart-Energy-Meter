import React, { useState } from 'react'
import BottomNav from '../../components/bottommenu/BottomNav'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import './Custom.css'
import CustomKw from './CustomKw'
import CustomCost from './CustomCost'
import './Date.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Custom() {

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

    
    return (
      
        <div className='home'>
          <Navbar  onChangeDevice={onChangeDeviceHandler}/>
          <div className='nav-bar d-flex align-items-center justify-content-center w-100'>
            <div className='back'>
                <ul className='nav-bar-links'>
                    <Link to={"/home"}><li className='btn btn-sm btn-light'>Now</li></Link> 
                    <Link to={"/today"}><li className='btn btn-sm btn-light'>Today</li></Link>  
                    <Link to={"/week"}><li className='btn btn-sm btn-light'>Week</li></Link>
                    <Link to={"/month"}><li className='btn btn-sm btn-light'>Month</li></Link>
                    <Link to={"/year"}><li className='btn btn-sm btn-light'>Year</li></Link>
                    <Link to={"/custom"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}>Custom</li></Link>
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
            />
         </div>
         
         <button className='btn-search btn btn-sm btn-primary' onClick={handleSearch}>Search</button>
    </div>
          </div>
          
          <div className='chart-pick-kw'>
            <CustomKw selectedDevice={device}   startDate={startDate } endDate={endDate} isSearchLoading={isSearchLoading}/>
          </div>
          <div className='chart-pick-cost'>
            <CustomCost selectedDevice={device} startDate={startDate} endDate={endDate} isSearchLoading={isSearchLoading}/>
          </div>

        </div>
            <BottomNav/>
        </div>
      )
}

export default Custom