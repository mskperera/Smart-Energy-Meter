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


// useEffect(() => {
//   if (device) {
//     const deviceId = device || defaultSelctedDevie;
//     loadChartData(deviceId.id);
//   }
  
// }, [device]);


// useEffect(() => {
//     loadChartData();
//     const intervalId = setInterval(() => {
//     loadChartData();
// }, 4000);

//   return () => clearInterval(intervalId);
// }, [device]);

// const defSelecedDevice=localStorage.getItem('selectedDevice');
// console.log('defSelecedDevice',defSelecedDevice)
// const deviceNames=useSelector(state=>state.device.dropDeviceList);
// const defaultSelctedDevie= defSelecedDevice || deviceNames[0]
// useEffect(()=>{
// setDevice(defaultSelctedDevie);
// },[deviceNames])

const loadChartData = async (deviceId) => {

  const todayUtc = moment(); 
  const startOfDay = todayUtc.startOf('day').format('YYYY-MM-DD HH:mm:ss');

  const endOfDay = todayUtc.endOf('day').format('YYYY-MM-DD HH:mm:ss');

  const utcOffSet= moment().utcOffset();

  const startOfDayUtc = moment(startOfDay).subtract(utcOffSet,'minutes').format('YYYY-MM-DD HH:mm:ss');
  const endOfDayUtc = moment(endOfDay).subtract(utcOffSet,'minutes').format('YYYY-MM-DD HH:mm:ss');

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
}

const [devices, setDevices] = useState(
  
  [
    {
  
      deviceTypeId: 2,
      deviceMeasuringModeId: 1,
      deviceNo: "D-0007",
      deviceName: "-3 Phase Device",
      deviceId: 38,
  
      lines: [
        {
          lineNo: "L1",
  
          days: [
            {
              date: "2024-06-06T18:30:00Z",
              day: "06",
              hour: "18",
              year: "24",
              month: "06",
  
              lines: [
                {
                  lineNo: "l1",
                  kwhPerHour: 0.12,
                  maxKwh: 1934.61,
                  pf: 0.64,
                  current: 0.91,
                  power: 139.6,
                  usageBill: 92339,
                  usageBillPerHour: 13,
                  voltage: 242.5,
                },
              ],
            },
  
            {
              date: "2024-06-06T18:30:00Z",
              day: "06",
              hour: "18",
              year: "24",
              month: "06",
  
              lines: [
                {
                  lineNo: "l1",
                  kwhPerHour: 0.12,
                  maxKwh: 1934.61,
                  pf: 0.64,
                  current: 0.91,
                  power: 139.6,
                  usageBill: 92339,
                  usageBillPerHour: 13,
                  voltage: 242.5,
                },
              ],
            },
  
          ],
        },
  
        {
          lineNo: "L2",
  
          days: [
            {
              date: "2024-06-06T18:30:00Z",
              day: "06",
              hour: "18",
              year: "24",
              month: "06",
  
              lines: [
                {
                  lineNo: "L1",
                  kwhPerHour: 0.12,
                  maxKwh: 1934.61,
                  pf: 0.64,
                  current: 0.91,
                  power: 139.6,
                  usageBill: 92339,
                  usageBillPerHour: 13,
                  voltage: 242.5,
                },
              ],
            },
  
            {
              date: "2024-06-06T18:30:00Z",
              day: "06",
              hour: "18",
              year: "24",
              month: "06",
  
              lines: [
                {
                  lineNo: "L2",
                  kwhPerHour: 0.12,
                  maxKwh: 1934.61,
                  pf: 0.64,
                  current: 0.91,
                  power: 139.6,
                  usageBill: 92339,
                  usageBillPerHour: 13,
                  voltage: 242.5,
                },
              ],
            },
  
          ],
  
        },
  
      ],
    },
    {
  
      deviceTypeId: 1,
      deviceNo: "D-0002",
      deviceName: "-3 Phase Device",
      deviceId: 4,
  
      lines: [
        {
          lineNo: "L1",
  
          days: [
            {
              date: "2024-06-06T18:30:00Z",
              day: "06",
              hour: "18",
              year: "24",
              month: "06",
  
              lines: [
                {
                  lineNo: "l1",
                  kwhPerHour: 0.12,
                  maxKwh: 1934.61,
                  pf: 0.64,
                  current: 0.91,
                  power: 139.6,
                  usageBill: 92339,
                  usageBillPerHour: 13,
                  voltage: 242.5,
                },
              ],
            },
  
            {
              date: "2024-06-06T18:30:00Z",
              day: "06",
              hour: "18",
              year: "24",
              month: "06",
  
              lines: [
                {
                  lineNo: "l1",
                  kwhPerHour: 0.12,
                  maxKwh: 1934.61,
                  pf: 0.64,
                  current: 0.91,
                  power: 139.6,
                  usageBill: 92339,
                  usageBillPerHour: 13,
                  voltage: 242.5,
                },
              ],
            },
  
          ],
        },
  
      ],
    },
  ]

);

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
        {/* <div className='page-5 body icon'> */}

        


          <div className='body'>

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
            {/* <div className='chart-custom'> */}
              {/* <div className='chart-today-kw'> */}
              {/* <div className='chart-pick-kw'>
                <TodayKw selectedDevice={device || defaultSelctedDevie} startDate={startDate } endDate={endDate} isSearchLoading={isSearchLoading}/>
              </div> */}
              {/* <div className='chart-today-cost'> */}
              {/* <div className='chart-pick-cost'>
                <TodayCost selectedDevice={device || defaultSelctedDevie} startDate={startDate} endDate={endDate} isSearchLoading={isSearchLoading}/>
              </div>
            </div> */}

            {devices?.map((device, index) => (
              <div key={index}>

                {/* <div> */}
                  <h3>{device.deviceName}</h3>
                  {/* {JSON.stringify(device)} */}
                  <DeviceChart  
                  device={device}
                  className="device-name-state"
                  />
                {/* </div> */}
              </div>
            ))}

          </div>


        {/* </div> */}
            <BottomNav/>
    
    </div>
  )
}

export default Today