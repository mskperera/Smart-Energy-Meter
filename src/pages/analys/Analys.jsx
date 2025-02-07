import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip  } from 'recharts';
import './Analys.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import { getDevicesByUserId, getEngergyUsageKwhByDateRange } from '../../action/device';
import { getBillingSessionDateRangeBySessionStartDateTimebasedTable } from '../../action/billingSession';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { use } from 'react';


const Analys = () => {

   const userData=JSON.parse(localStorage.getItem('userData'));
   const [deviceNames, setDeviceNames] = useState([]);
   const [peakTime, setPeakTime] = useState([]);
   const [offPeakTime, setOffPeakTime] = useState([]);
   const [dayTime, setDayTime] = useState([]);
   
   const  [totalSum, setTotalSum] = useState([]);
   const selectedDevice = useSelector((state) => state.device.selectedDevice);

    const loadDevicesByUserId = async () => {
   
     const result = await getDevicesByUserId(userData.userId);
  
     
     if (result.status === 200) {
       const devices = result.data.map(device => ({ id: device.deviceId, deviceTypeId: device.deviceTypeId, name: device.deviceName }));
      
        setDeviceNames(devices);
      
     }
     
   }

   const handleDeviceSelect = (deviceId) => {
    // const selectedDate = moment().format("YYYY-MM-DD"); 
    loadChartData(deviceId); 
  };

     useEffect(() => {
       loadDevicesByUserId();
     }, []); 

      useEffect(() => {
         if (selectedDevice) {
           loadBillingSessionDateRangeBySessionStartDateTimebasedTable();
         }
       }, [selectedDevice]);

     const loadBillingSessionDateRangeBySessionStartDateTimebasedTable = async () => {
           try {
             // setLoadData(true);
             const payload = {
               deviceId: selectedDevice.id,
             };
             const res = await getBillingSessionDateRangeBySessionStartDateTimebasedTable(payload);
             
             console.log('getbilling-----SessionByDeviceId',res)
     
             console.log('getbillingSessionByDeviceId',res.data);
     
               const usage = res.data[1];
               const totalSum = usage.TotalKwh + usage.TotalKwh2 + usage.TotalKwh3;
               setDayTime(totalSum);
               
               const usage1 = res.data[2];
               const totalSum1 = usage1.TotalKwh + usage1.TotalKwh2 + usage1.TotalKwh3;
               setOffPeakTime(totalSum1);
     
               const usage2 = res.data[0];
               const totalSum2 = usage2.TotalKwh + usage2.TotalKwh2 + usage2.TotalKwh3;
               setPeakTime(totalSum2);
     
               const totalSum3 = totalSum + totalSum1 + totalSum2; 
               setTotalSum(totalSum3);
               
     
             console.log('sumpeak',totalSum);

             console.log('getbillingSessionByDeviceId',res)
            //  if (res.data.length > 0) {
            //    const sessions = res.data.reduce((acc, session) => {
            //      const startDate = new Date(session.startDate);
            //      const endDate = new Date(session.endDate);
            //      acc[session.deviceBillingSessionId] = {
            //        startDate,
            //        endDate,
            //      };
            //      setSelectedTimes((prevTimes) => ({
            //        ...prevTimes,
            //        [session.deviceBillingSessionId]: {
            //          startTime: startDate.toTimeString().slice(0, 5),
            //          endTime: endDate.toTimeString().slice(0, 5),
            //        },
            //      }));
            //      return acc;
            //    }, {});
            //    //setBillingSession(res.data);
            //    setSelectedDates(sessions);
            //  }
             // setLoadData(false);
           } catch (error) {
             console.error('Error fetching billing session:', error);
             // setLoadData(false);
           }
         };

          const [devices, setDevices] = useState([]);
          const [chartLineOne, setChartLineOne] = useState([]);
           const [chartLineTwo, setChartLineTwo] = useState([]);
           const [chartLineThree, setChartLineThree] = useState([]);

         useEffect(() => {
            //  if (startDate && selectedDevice) {
            if (selectedDevice) {
               loadChartData(selectedDevice.id);
             }
           }, [ selectedDevice]);
         
           const loadChartData = async (deviceId, startDay) => {
            //  setIsSearchLoading(true);
         
             const utcOffSet = moment().utcOffset();
             const startOfDayUtc = moment(startDay).startOf('day').subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
             const endOfDayUtc = moment(startDay).endOf('day').subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
         
             console.log('startOfDayUtc---2222', startOfDayUtc);
             console.log('endOfDayUtc---2222', endOfDayUtc);
             const payload = {
               deviceId: deviceId,
               mesurementUnitId: 1,
               frequencyId: 1,
              //  startDate: startOfDayUtc,
              //  endDate: endOfDayUtc,
              startDate: '2025-02-06T18:30:00Z',
              endDate: '2025-02-07T18:29:59Z',
             };
             const result = await getEngergyUsageKwhByDateRange(payload);
         
             console.log('result--result', result.data);
             setDevices(result.data);
             // setChartLine(result.data[0].lines);
             setChartLineOne(result.data[0]?.lines[0] || []);
             setChartLineTwo(result.data[0]?.lines[1] || []);
             setChartLineThree(result.data[0]?.lines[2] || []);
         
            //  setIsSearchLoading(false);
           };

           const [chartDataDay, setChartDataDay] = useState([
            // { hour: '00', Energy: 80, Power: 45, Current: 85, Voltage: 231, PowerFactor: 0.9 },
            // { hour: '01', Energy: 85, Power: 50, Current: 88, Voltage: 229, PowerFactor: 0.85 },
            // { hour: '02', Energy: 88, Power: 48, Current: 84, Voltage: 231, PowerFactor: 0.89 },
            // { hour: '03', Energy: 92, Power: 52, Current: 87, Voltage: 230, PowerFactor: 0.87 },
            // { hour: '04', Energy: 85, Power: 49, Current: 83, Voltage: 229, PowerFactor: 0.86 },
            // { hour: '05', Energy: 83, Power: 47, Current: 82, Voltage: 228, PowerFactor: 0.88 },
            // { hour: '06', Energy: 80, Power: 45, Current: 85, Voltage: 231, PowerFactor: 0.9 },
            // { hour: '07', Energy: 85, Power: 50, Current: 88, Voltage: 229, PowerFactor: 0.85 },
            // { hour: '08', Energy: 88, Power: 48, Current: 84, Voltage: 231, PowerFactor: 0.89 },
            // { hour: '09', Energy: 92, Power: 52, Current: 87, Voltage: 230, PowerFactor: 0.87 },
            // { hour: '10', Energy: 85, Power: 49, Current: 83, Voltage: 229, PowerFactor: 0.86 },
            // { hour: '11', Energy: 83, Power: 47, Current: 82, Voltage: 228, PowerFactor: 0.88 },
          ]);

  // const [clickedPoint, setClickedPoint] = useState(null);
  useEffect(() => {
    console.log('chartLineOne', chartLineOne);
    console.log('chartLineTwo', chartLineTwo);
    console.log('chartLineThree', chartLineThree)
    const objArr = [];

    chartLineOne.days?.forEach((item, index) => {

      console.log('item', item);
      objArr.push(
        { hour:moment(item.date).format("HH"), Energy: item.kwhPerHour, Power: item.power, Current: item.current, Voltage: item.voltage, PowerFactor: item.pf }

      );

    }
    );
    setChartDataDay(objArr)

  }, [chartLineOne, chartLineTwo, chartLineThree]);
  
  

  useEffect(() => {
    
  }, []);

  const chartDataWeek = [
    { day: 'Sun', Energy: 80, Power: 45, Current: 85, Voltage: 231, PowerFactor: 0.9 },
    { day: 'Mon', Energy: 85, Power: 50, Current: 88, Voltage: 229, PowerFactor: 0.85 },
    { day: 'Wed', Energy: 88, Power: 48, Current: 84, Voltage: 231, PowerFactor: 0.89 },
    { day: 'Thu', Energy: 92, Power: 52, Current: 87, Voltage: 230, PowerFactor: 0.87 },
    { day: 'Fri', Energy: 85, Power: 49, Current: 83, Voltage: 229, PowerFactor: 0.86 },
    { day: 'Sat', Energy: 83, Power: 47, Current: 82, Voltage: 228, PowerFactor: 0.88 }
  ];

  // const devices = [
  //   { id: 1, name: 'Device 1', energy: 120, voltage: '231.2v', current: '25.89A', power: '5.9kw', pf: '0.9kf', freq: '50.1Hz' },
  //   { id: 2, name: 'Device 2', energy: 150, voltage: '231.2v', current: '25.89A', power: '5.9kw', pf: '0.9kf', freq: '50.1Hz' },
  //   { id: 3, name: 'Device 3', energy: 110, voltage: '231.2v', current: '25.89A', power: '5.9kw', pf: '0.9kf', freq: '50.1Hz' },
  //   { id: 4, name: 'Device 4', energy: 170, voltage: '231.2v', current: '25.89A', power: '5.9kw', pf: '0.9kf', freq: '50.1Hz' },
  //   { id: 5, name: 'Device 5', energy: 80, voltage: '231.2v', current: '25.89A', power: '5.9kw', pf: '0.9kf', freq: '50.1Hz' }
  // ];

  const totalEnergy = devices.reduce((sum, device) => sum + device.energy, 0);

  const chartKeys = {
    "Energy Usage": "Energy",
    "Power": "Power",
    "Current": "Current",
    "Voltage": "Voltage",
    "Power Factor": "PowerFactor"
  };


  
  return (
    <dvi className="home" >
    <div className="body" style={{ backgroundColor: '#2d2e2e' }}>
      <div className="dashboard-container">
        {/* Left Panel */}
        <div className="left-panel" style={{ backgroundColor: '#2d2e2e' }}>
          <div className="group-card">
            <div className="group-title">Group 1</div>
            <div className="group-energy">630 kWh</div>
            <div className="group-stats">29.5kw 149.45A</div>
          </div>
          
          {deviceNames.map((device, index) => (
            <div key={device.id} className="device-card  " onClick={() => handleDeviceSelect(device.id)}>
              <div className="device-content">
                <div className="device-info">
                  <div className="">{device.name}</div>
                  {/* <div className="device-energy">Total:&nbsp; */}
                       {/* {
                          totalSum.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                       }  */}
                      {/* 120 kWh</div> */}
                  
                  <div className="device-energy">{device.power}</div>
                </div>
                <div className="device-stats">
                  <div className='device-stats-left'>
                    {/* <div>231.2V</div>
                    <div>25.89A</div> */}
                  </div>
                  <div className='device-stats-left'>
                    {/* <div>0.9pf</div>
                    <div>50Hz</div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="controls-section">
            <div className="controls-container">
              <div className="period-buttons">
                <button>Day</button>
                <button>Week</button>
                <button>Session</button>
                <button>Year</button>
                <button>Custom</button>
              </div>
              <div className="date-range-container">
              {/* <div className="date-range">07 Feb</div>
              <div className="period-label">Last week</div> */}
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-container">
            {Object.keys(chartKeys).map((title, index) => (
              <div key={title} className="chart-card">
                <div className="chart-title">{title}</div>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={chartDataDay}  style={{ margin: '0 auto' }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey={chartKeys[title]} 
                      stroke={
                        index === 0 ? '#3B82F6' :
                        index === 1 ? '#EF4444' :
                        index === 2 ? '#F59E0B' :
                        index === 3 ? '#10B981' :
                        '#6366F1'
                      }
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
      <BottomNav className="bottombar1" />
    </dvi>
  );
};

export default Analys;