import React, { useEffect, useState } from 'react'
import './Year.css'
import { Link } from 'react-router-dom'
import BottomNav from '../../components/bottommenu/BottomNav'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getEngergyUsageKwhByDateRange } from '../../action/device'

import moment from 'moment'
import DeviceCharts from '../today/DeviceChart'
import { ThreeDots } from 'react-loader-spinner'
import { useSessionDate } from '../../context/SessionDateContext'
import { getBillingSessionNameCurrentByDeviceId } from '../../action/billingSession'
import { IoMdArrowDropdown } from 'react-icons/io'


function Year() {

  const [activeTab, setActiveTab] = useState('Year');
  const selectedDevice=useSelector(state=>state.device.selectedDevice);

  // const {sessionDate, numberOfDays} = useSessionDate();
  const { sessionDate, setSessionDate, numberOfDays, setNumberOfDays } = useSessionDate();


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Session') {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsDropdownOpen(false);
    }
  };


  const [isSearchLoading, setIsSearchLoading] = useState(false);


  const [selectedDate, setSelectedDate] = useState(moment().format('yyyy-MM-DD')); // Initialize with the current date

  const handleMonthChange = (date) => {
      setSelectedDate(date); // Update state with the new date
      console.log('Selected Month:',date); 
  };



useEffect(()=>{
  if(selectedDate && selectedDevice )
  loadChartData(selectedDevice.id,selectedDate);
},[selectedDate,selectedDevice])


const loadChartData = async (deviceId,year) => {
  setIsSearchLoading(true);

  const utcOffset = moment().utcOffset();

 
  // Create start and end of year moments
  const startOfYear = moment(year).startOf('year');
  const endOfYear = moment(year).endOf('year');


  const startOfYearUtc = startOfYear.subtract(utcOffset, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
  const endOfYearUtc = endOfYear.subtract(utcOffset, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');

  // Log the UTC start and end of the year
  console.log('startOfYearUtc', startOfYearUtc);
  console.log('endOfYearUtc', endOfYearUtc);


  const payload = {
        deviceId:deviceId,
        mesurementUnitId:1,
        frequencyId:4,
        startDate: startOfYearUtc,
        endDate: endOfYearUtc,
  };
  const result = await getEngergyUsageKwhByDateRange(payload);

  console.log('result---payload', payload);
  console.log('result---2222', result.data);
  setDevices(result.data);

  setIsSearchLoading(false);
}

const [devices, setDevices] = useState([]);


useEffect(() => {
  if (selectedDevice) {
    const deviceId = selectedDevice.id;
    loadCurrentBillingSessionInfoByDeviceId(deviceId);
  }
}, [selectedDevice]);

const loadCurrentBillingSessionInfoByDeviceId = async (deviceId) => {
  const result = await getBillingSessionNameCurrentByDeviceId(deviceId);
  const billingSessionInfo = result.data;
  console.log('Current-BillingSession-Info-By-DeviceId', billingSessionInfo);

  if (billingSessionInfo && billingSessionInfo.data && billingSessionInfo.data.length > 0) {
    const session = billingSessionInfo.data[0];
    if (session.startDate) {
      setSessionDate(new Date(session.startDate).toLocaleString());
    }
    if (session.numberOfDays) {
      setNumberOfDays(session.daysElapsed);
    }
  }
};

  return (
    <div className='home'>
        {/* <Navbar /> */}
      
        <div className='nav-bar d-flex align-items-center justify-content-center w-100'>
        <div className='back'>
       <ul className='nav-bar-links'>
            <Link to={"/home"}>
              <li
             
                className={`btn btn-sm  ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}
              >
                Live
              </li>
            </Link>
            <Link to={"/today"}>
              <li
             
                className={`btn btn-sm  ${activeTab === 'Day' ? 'active' : ''}`}
                onClick={() => handleTabClick('Day')}
              >
                Day
              </li>
            </Link>
            <Link to={"/week"}>
              <li
              
                className={`btn btn-sm  ${activeTab === 'Week' ? 'active' : ''}`}
                onClick={() => handleTabClick('Week')}
              >
                Week
              </li>
            </Link>
            <li
            
              className={`btn btn-sm  ${activeTab === 'Session' ? 'active' : ''}`}
              onClick={() => handleTabClick('Session')}
            >
              Session<IoMdArrowDropdown size={20}/>
              <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <Link to={"/month"} className='dropdown-item' onClick={() => handleTabClick('Session')}>
                  Session
                </Link>
                <Link to={"/monthactive"} className='dropdown-item' onClick={() => handleTabClick('Month')}>
                  Month
                </Link>
              </div>
            </li>
            <Link to={"/year"}>
              <li
              
                className={`btn btn-sm btn-primary ${activeTab === 'Year' ? 'active' : ''}`}
                onClick={() => handleTabClick('Year')}
              >
                Year
              </li>
            </Link>
            <Link to={"/custom"}>
              <li
              
                className={`btn btn-sm  ${activeTab === 'Custom' ? 'active' : ''}`}
                onClick={() => handleTabClick('Custom')}
              >
                Custom
              </li>
            </Link>
          </ul>
        </div>
      </div>
          <div className='body'>
            {/* <div className="session-name">
              <h6>Session Date :<b> {sessionDate}</b></h6>
              <p>Days Elapsed : <b>{numberOfDays}</b></p>
            </div> */}
          <div className='date'>
          <div className='picker'>
          <div className='picker-year'>
            <DatePicker
                selected={selectedDate} 
                onChange={handleMonthChange}
                dateFormat="yyyy"
                showYearPicker
                placeholderText="Select Year"
            />
        </div>   
         {/* <button className='btn-search btn btn-sm btn-primary' onClick={handleSearch}>Search</button> */}
         </div>
          </div>
          {isSearchLoading?(
          // <p className="loading-message">Loading please wait...</p>
          <div className="d-flex align-items-center justify-content-center">
          <ThreeDots
              height={100}
              width={100}
              color="#36A2EB"
              ariaLabel="loading"
              secondaryColor="#36A2EB"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
          ):(
            devices.length >0 && devices?.map((device, index) => (
              <div key={index}>
                  {/* <h4>{device.deviceName}</h4> */}
                  <DeviceCharts 
                  device={device}
                  className="device-name-state"
                  isSearchLoading={isSearchLoading}
                  chartFrequencty="months"
                  />
          
              </div>
            ))
          )}
            
          </div>
            <BottomNav/>
    
    </div>
  )
}

export default Year;