import React, { useEffect, useState } from 'react'
import './Month.css'
import Navbar from '../../components/navbar/Navbar'
//import Menu from '../../components/menu/Menu'
import { Link } from 'react-router-dom'
import BottomNav from '../../components/bottommenu/BottomNav'
// import TodayKw from './TodayKw'
// import TodayCost from './TodayCost'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getEngergyUsageKwhByDateRange } from '../../action/device'

import moment from 'moment'
import DeviceCharts from '../today/DeviceChart'


function Month() {

  const [activeTab, setActiveTab] = useState('Now');
  const selectedDevice=useSelector(state=>state.device.selectedDevice);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const [isSearchLoading, setIsSearchLoading] = useState(false);


  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with the current date

  const handleMonthChange = (date) => {
      setSelectedDate(date); // Update state with the new date
      console.log('Selected Month:', moment(date).format('MMMM YYYY')); 
  };


useEffect(()=>{
  setSelectedDate(moment());
},[])

useEffect(()=>{
  if(selectedDate && selectedDevice )
  loadChartData(selectedDevice.id,selectedDate);
},[selectedDate,selectedDevice])


const loadChartData = async (deviceId,selecedDate) => {

  const utcOffSet= moment().utcOffset();

  const year=moment(selecedDate).year();
  const month=moment(selecedDate).month()+1;

    const startOfMonth = moment(`${year}-${month}`, 'YYYY-M').startOf('month');
    
    const endOfMonth = moment(`${year}-${month}`, 'YYYY-M').endOf('month');
    
    const startOfMonthUtc = startOfMonth.subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
    const endOfMonthUtc = endOfMonth.subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
  
    console.log('startOfMonthUtc',startOfMonthUtc);
    
    console.log('endOfMonthUtc',endOfMonthUtc);

  const payload = {
        deviceId:deviceId,
        mesurementUnitId:1,
        frequencyId:3,
        startDate: startOfMonthUtc,
        endDate: endOfMonthUtc,
  };
  const result = await getEngergyUsageKwhByDateRange(payload);

  console.log('result---2222', result.data);
  setDevices(result.data);

  setIsSearchLoading(!isSearchLoading);
}

const [devices, setDevices] = useState([]);

  return (
    <div className='home'>
        {/* <Navbar /> */}
      
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
          <div className='body'>

          <div className='date'>
          <div className='picker'>
          <div>
            <DatePicker
        selected={moment(selectedDate).format("yyyy-MM")} 
                onChange={handleMonthChange}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                placeholderText="Select Month"
            />
        </div>   
         {/* <button className='btn-search btn btn-sm btn-primary' onClick={handleSearch}>Search</button> */}
         </div>
          </div>
            {devices.length >0 && devices?.map((device, index) => (
              <div key={index}>
                  <h3>{device.deviceName}</h3>
                  <DeviceCharts 
                  device={device}
                  className="device-name-state"
                  isSearchLoading={isSearchLoading}
                  chartFrequencty="days"
                  />
          
              </div>
            ))}
          </div>
            <BottomNav/>
    
    </div>
  )
}

export default Month;