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


function Today() {

  const [activeTab, setActiveTab] = useState('Now');
  const selectedDevice=useSelector(state=>state.device.selectedDevice);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [startDate, setStartDate] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);


  const handleStartDateChange = (date) => {
    setStartDate(date);
  };


  const handleSearch = () => {
    loadChartData(selectedDevice.id);

  };





useEffect(()=>{
  const todayUtc = moment(); 
  console.log('todayUtc---2222', todayUtc.format('yyyy-MM-DD'));
  setStartDate(todayUtc.format('yyyy-MM-DD'));
},[])



const loadChartData = async (deviceId) => {



  const utcOffSet= moment().utcOffset();


  const startOfDay = startDate;//"2024-06-06"; 

const startOfDayUtc = moment(startOfDay).startOf('day').subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
const endOfDayUtc = moment(startOfDay).endOf('day').subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');


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

const [devices, setDevices] = useState(
  
//   [
//     {
//         deviceId: 4,
//         lines: [
//             {
//                 lineNo: "L1",
//                 days: [
//                     {
//                         year: 2024,
//                         month: 3,
//                         day: "22",
//                         date: "2024-05-22T01:00:00Z",
//                         hour: "01",
//                         maxKwh: 973.31,
//                         usageBill: 44032.54,
//                         voltage: 244.8,
//                         current: 17.75,
//                         power: 4075.6,
//                         pf: 1
//                     },
//                     {
//                           year: 2024,
//                         month: 3,
//                         day: "22",
//                         date: "2024-05-22T01:00:00Z",
//                         hour: "02",
//                         maxKwh: 1428.17,
//                         usageBill: 64196.24,
//                         voltage: 245.4,
//                         current: 20.08,
//                         power: 4607,
//                         pf: 1
//                     },
//                     {
//                       year: 2024,
//                       month: 3,
//                       day: "22",
//                       date: "2024-05-22T01:00:00Z",
//                       hour: "03",
//                         maxKwh: 1794.49,
//                         usageBill: 80518.77,
//                         voltage: 247.3,
//                         current: 20.14,
//                         power: 4586.2,
//                         pf: 1
//                     }
//                 ]
//             },
//             {
//                 lineNo: "L2",
//                 days: [
//                     {
//                       year: 2024,
//                       month: 3,
//                       day: "22",
//                       date: "2024-05-22T01:00:00Z",
//                       hour: "04",
//                         maxKwh: null,
//                         usageBill: null,
//                         voltage: null,
//                         current: null,
//                         power: null,
//                         pf: null
//                     },
//                     {
//                       year: 2024,
//                       month: 3,
//                       day: "22",
//                       date: "2024-05-22T01:00:00Z",
//                       hour: "05",
//                       maxKwh: null,
//                       usageBill: null,
//                       voltage: null,
//                       current: null,
//                       power: null,
//                       pf: null
//                     },
//                     {
//                       year: 2024,
//                       month: 3,
//                       day: "22",
//                       date: "2024-05-22T01:00:00Z",
//                       hour: "06",
//                       maxKwh: null,
//                       usageBill: null,
//                       voltage: null,
//                       current: null,
//                       power: null,
//                       pf: null
//                     }
//                 ]
//             },
//             {
//                 "lineNo": "L3",
//                 days: [
//                   {
//                     year: 2024,
//                     month: 3,
//                     day: "22",
//                     date: "2024-05-22T01:00:00Z",
//                     hour: "07",
//                       maxKwh: null,
//                       usageBill: null,
//                       voltage: null,
//                       current: null,
//                       power: null,
//                       pf: null
//                   },
//                   {
//                     year: 2024,
//                     month: 3,
//                     day: "22",
//                     date: "2024-05-22T01:00:00Z",
//                     hour: "08",
//                     maxKwh: null,
//                     usageBill: null,
//                     voltage: null,
//                     current: null,
//                     power: null,
//                     pf: null
//                   },
//                   {
//                     year: 2024,
//                     month: 3,
//                     day: "22",
//                     date: "2024-05-22T01:00:00Z",
//                     hour: "09",
//                     maxKwh: null,
//                     usageBill: null,
//                     voltage: null,
//                     current: null,
//                     power: null,
//                     pf: null
//                   }
//               ]
//             }
//         ]
//     },
//     {
//         deviceId: 38,
//         lines: [
//           {
//               lineNo: "L1",
//               days: [
//                   {
//                       year: 2024,
//                       month: 3,
//                       day: "22",
//                       date: "2024-05-22T01:00:00Z",
//                       hour: "01",
//                       maxKwh: 973.31,
//                       kwhPerHour: 0.07,
//                       usageBillPerHour: 9,

//                       usageBill: 44032.54,
//                       voltage: 244.8,
//                       current: 17.75,
//                       power: 4075.6,
//                       pf: 1
//                   },
//                   {
//                         year: 2024,
//                       month: 3,
//                       day: "22",
//                       date: "2024-05-22T01:00:00Z",
//                       hour: "02",
//                       maxKwh: 1428.17,
//                       kwhPerHour: 0.07,
//                       usageBillPerHour: 9,

//                       usageBill: 64196.24,
//                       voltage: 245.4,
//                       current: 20.08,
//                       power: 4607,
//                       pf: 1
//                   },
//                   {
//                     year: 2024,
//                     month: 3,
//                     day: "22",
//                     date: "2024-05-22T01:00:00Z",
//                     hour: "03",
//                       maxKwh: 1794.49,
//                       kwhPerHour: 0.07,
//                       usageBillPerHour: 9,
//                       usageBill: 80518.77,
//                       voltage: 247.3,
//                       current: 20.14,
//                       power: 4586.2,
//                       pf: 1
//                   }
//               ]
//           },
//           {
//               lineNo: "L2",
//               days: [
//                   {
//                     year: 2024,
//                     month: 3,
//                     day: "22",
//                     date: "2024-05-22T01:00:00Z",
//                     hour: "04",
//                       maxKwh: null,
//                       kwhPerHour: 0.07,
//                       usageBillPerHour: 9,
//                       usageBill: null,
//                       voltage: null,
//                       current: null,
//                       power: null,
//                       pf: null
//                   },
//                   {
//                     year: 2024,
//                     month: 3,
//                     day: "22",
//                     date: "2024-05-22T01:00:00Z",
//                     hour: "05",
//                     maxKwh: null,
//                     kwhPerHour: 0.07,
//                     usageBillPerHour: 9,
//                     usageBill: null,
//                     voltage: null,
//                     current: null,
//                     power: null,
//                     pf: null
//                   },
//                   {
//                     year: 2024,
//                     month: 3,
//                     day: "22",
//                     date: "2024-05-22T01:00:00Z",
//                     hour: "06",
//                     maxKwh: null,
//                     kwhPerHour: 0.07,
//                     usageBillPerHour: 9,
//                     usageBill: null,
//                     voltage: null,
//                     current: null,
//                     power: null,
//                     pf: null
//                   }
//               ]
//           },
//           {
//               "lineNo": "L3",
//               days: [
//                 {
//                   year: 2024,
//                   month: 3,
//                   day: "22",
//                   date: "2024-05-22T01:00:00Z",
//                   hour: "07",
//                     maxKwh: null,
//                     usageBill: null,
//                     voltage: null,
//                     current: null,
//                     power: null,
//                     pf: null
//                 },
//                 {
//                   year: 2024,
//                   month: 3,
//                   day: "22",
//                   date: "2024-05-22T01:00:00Z",
//                   hour: "08",
//                   maxKwh: null,
//                   usageBill: null,
//                   voltage: null,
//                   current: null,
//                   power: null,
//                   pf: null
//                 },
//                 {
//                   year: 2024,
//                   month: 3,
//                   day: "22",
//                   date: "2024-05-22T01:00:00Z",
//                   hour: "09",
//                   maxKwh: null,
//                   usageBill: null,
//                   voltage: null,
//                   current: null,
//                   power: null,
//                   pf: null
//                 }
//             ]
//           }
//       ]
//     }
// ]

);

  return (
    <div className='home'>
        <Navbar />
      
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
          <div className='body'>

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
         <button className='btn-search btn btn-sm btn-primary' onClick={handleSearch}>Search</button>
         </div>
          </div>
            {devices?.map((device, index) => (
              <div key={index}>
                  <h3>{device.deviceName}</h3>
                  <DeviceChart  
                  device={device}
                  className="device-name-state"
                  isSearchLoading={isSearchLoading}
                  />
          
              </div>
            ))}
          </div>
            <BottomNav/>
    
    </div>
  )
}

export default Today