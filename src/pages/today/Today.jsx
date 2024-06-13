import React, { useEffect, useState } from 'react'
import './Today.css'
import Navbar from '../../components/navbar/Navbar'
//import Menu from '../../components/menu/Menu'
import { Link } from 'react-router-dom'
import BottomNav from '../../components/bottommenu/BottomNav'
// import TodayKw from './TodayKw'
// import TodayCost from './TodayCost'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DeviceChart from './DeviceChart'
import { getEngergyUsageKwhByDateRange } from '../../action/device'
import TodayCost from './TodayCost'
import TodayKw from './TodayKw'
import moment from 'moment'
import { useSessionDate } from '../../context/SessionDateContext'


function Today() {

  const [activeTab, setActiveTab] = useState('Now');
  const selectedDevice=useSelector(state=>state.device.selectedDevice);

  const { sessionDate } = useSessionDate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [startDate, setStartDate] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);


  const handleStartDateChange = (date) => {
    setStartDate(date);
  };


  const handleSearch = () => {
    loadChartData(selectedDevice.id,startDate);

  };


useEffect(()=>{
  const todayUtc = moment(); 
  console.log('todayUtc---2222', todayUtc.format('yyyy-MM-DD'));
  setStartDate(todayUtc.format('yyyy-MM-DD'));
},[])

useEffect(()=>{
  if(startDate && selectedDevice )
  loadChartData(selectedDevice.id,startDate);
},[startDate,selectedDevice])


const loadChartData = async (deviceId,startDay) => {



  const utcOffSet= moment().utcOffset();


 // const startOfDay = startDate;//"2024-06-06"; 

const startOfDayUtc = moment(startDay).startOf('day').subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
const endOfDayUtc = moment(startDay).endOf('day').subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');


  console.log('startOfDayUtc---2222', startOfDayUtc);
  console.log('endOfDayUtc---2222', endOfDayUtc);
  const payload = {
        deviceId:deviceId,
        mesurementUnitId:1,
        frequencyId:1,
        startDate: startOfDayUtc,
        endDate: endOfDayUtc,
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
                  <Link to={"/home"}><li className='btn btn-sm btn-light'>Live</li></Link> 
                  <Link to={"/today"}><li className={`btn btn-sm btn-primary ${activeTab === 'Now' ? 'active' : ''}`}
                  onClick={() => handleTabClick('Now')}>Day</li></Link>  
                  <Link to={"/week"}><li className='btn btn-sm btn-light'>Week</li></Link>
                  <Link to={"/month"}><li className='btn btn-sm btn-light'>Month</li></Link>
                  <Link to={"/year"}><li className='btn btn-sm btn-light'>Year</li></Link>
                  <Link to={"/custom"}><li className='btn btn-sm btn-light'>Custom</li></Link>
              </ul>
          </div>
      </div>
          <div className='body'>
            {/* <div className="session-name">
              <h5>Session Date : {sessionDate}</h5>
            </div> */}
          <div className='date'>
          <div className='picker'>
        <div>
            <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                placeholderText="Start Date"
                dateFormat='dd MMM yyyy'
            />
        </div>    
         {/* <button className='btn-search btn btn-sm btn-primary' onClick={handleSearch}>Search</button> */}
         </div>
          </div>
            {devices.length >0 && devices?.map((device, index) => (
              <div key={index}>
                  {/* <h4>{device.deviceName}</h4> */}
                  <DeviceChart  
                  device={device}
                  className="device-name-state"
                  isSearchLoading={isSearchLoading}
                  chartFrequencty="hours"
                  />
          
              </div>
            ))}
          </div>
            <BottomNav/>
    
    </div>
  )
}

export default Today