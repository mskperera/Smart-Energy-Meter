import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../../components/navbar/Navbar';
import Menu from '../../components/menu/Menu';
import BottomNav from '../../components/bottommenu/BottomNav';
import { useSelector } from 'react-redux';
import {getEngergyUsageNow } from '../../action/device';
import DeviceChart3p from './DeviceChart';

const Home = () => {
  const [device, setDevice] = useState(null);
  // const [deviceDetails, setDeviceDetails] = useState([]);
  // const [budgetedKwhValue, setBudgetedKwhAmount] = useState('');
  // const [budgetedBillValue, setBudgetedBillAmount] = useState('');
  // const [lineOne, setLineOne] = useState('');
  // const [lineTwo, setLineTwo] = useState('');
  // const [lineThree, setLineThree] = useState('');
  // const [selectedLine, setSelectedLine] = useState('L1');

  const onChangeDeviceHandler = (selectedDevice) => {
    setDevice(selectedDevice);
  };

  const deviceNames = useSelector((state) => state.device.dropDeviceList);

  const defaultSelectedDevice = deviceNames[0];

  useEffect(() => {
    setDevice(defaultSelectedDevice);
  }, [deviceNames, defaultSelectedDevice]);

const [loading,setLoading]=useState(null)

  useEffect(() => {
    loadChartData();
    setLoading(true);
    const intervalId = setInterval(() => {
      loadChartData();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [device]);

  const loadChartData = async () => {
   
    const payload = {
      deviceId: device?.id,
      measurementUnitId: 1,
    };
    const result = await getEngergyUsageNow(payload);

    console.log('result---11111', result.data);


    setDevices(result.data);
    setLoading(false);
  };



  // useEffect(() => {
  //   loadBudgetedValues(device?.id || defaultSelectedDevice?.id);
  //   loadDeviceSettingstData(device?.id || defaultSelectedDevice?.id);
  // }, [device, defaultSelectedDevice]);


  // const loadDeviceSettingstData = async (deviceId) => {
  //   const result = await get_DeviceSettingsByDeviceId(deviceId);
  //   const deviceSetting = result.data;
  //   setLineOne(deviceSetting.l1);
  //   setLineTwo(deviceSetting.l2);
  //   setLineThree(deviceSetting.l3);
  // };

  // const loadBudgetedValues = async (deviceId) => {
  //   const result = await getBudgetedValues(deviceId);
  //   console.log('loadBudgetedValues',result)
  //   const budgetedValue = result.data;
  //   setBudgetedKwhAmount(budgetedValue.kwhAmount);
  //   setBudgetedBillAmount(budgetedValue.billAmount);
  // };

  // const handleLineChange = (e) => {
  //   setSelectedLine(e.target.value);
  // };

  // const selectedDeviceDetails = deviceDetails.find(
  //   (deviceDetail) => deviceDetail.deviceId === (device?.id || defaultSelectedDevice?.id)
  // );




const [devices,setDevices]=useState([{

  budCurrent: 1, budHertz: 100, budPf: 1, budPower : 1000, budVoltage : 250, deviceId : 4,
   deviceMeasuringModeId : 2, deviceName : "FIDA Device", deviceNo:"D-0003", deviceTimeStamp : 1717480475, 
   deviceTimeStampDate_UTC: "2024-06-04T05:54:35.000Z", deviceTypeId: 2, budgetedKwh: 100, budgetedBill: 3997.5,

  lines:[
  {lineNo:"l1",bill:"1200.30",budgetedBill:1000,budgetedKwh:1000, current: 6.97, hertz:"50.10", kwh: 3133.98, kwhPerSec: 0, line:"L1", pf: 0.97, power: 1608.7, voltage: 237.7},
  {lineNo:"l2", voltage:"230V", current: "10A", pf:"0.99", hertz:"50 Hz" ,power:"50 W",  kwh:"120.50" ,bill:"1200.30 ",budgetedBill:1000,budgetedKwh:1000},
  {lineNo:"l3", voltage:"230V", current: "10A", pf:"0.99", hertz:"50 Hz" ,power:"50 W",  kwh:"120.50" ,bill:"1200.30 ",budgetedBill:1000,budgetedKwh:1000} 
  ]
},
{

  budCurrent: 1, budHertz: 100, budPf: 1, budPower : 1000, budVoltage : 250, deviceId : 4,
   deviceMeasuringModeId : 2,  deviceName:"d2 - single phase", deviceNo:"D-0003", deviceTimeStamp : 1717480475, 
   deviceTimeStampDate_UTC: "2024-06-04T05:54:35.000Z", deviceTypeId: 1, budgetedKwh: 100, budgetedBill: 3997.5,


  lines:[
    {lineNo:"l1", voltage:"230V", current: "10A", pf:"0.99", hertz:"50 Hz" ,power:"50 W",  kwh:"120.50 " ,bill:"1200.30 ",budgetedBill:1000,budgetedKwh:1000} ]
}
]);
  
const totalUsageBill = devices.reduce((total, line) => total + line.usageBill, 0);
const totalUsageKwh = devices.reduce((total, line) => total + line.kwh, 0);

  return (
    <div className="home">
      <Navbar className="navnav" onChangeDevice={onChangeDeviceHandler}/>
      <Menu className="navnav1"/>

      {device && (
        <div className="body">
            <div>
              <h5 className="">Session Date : 2024/06/08</h5>
            </div>
          {/* {JSON.stringify(devices)} */}
          <div className="container">
            {/* {JSON.stringify(deviceDetails)} */}

            {loading ? (
              <p className="loading-message">Loading please wait...</p>
            ) : (
              <>
                {devices.length > 1 && (
                  <div className='budget-values'
                    style={{ display: "flex", justifyContent: "space-between"}}
                  >
                    <h2>Total kWh:{totalUsageKwh.toFixed(2)}</h2>
                    <h2>Total Bill:{totalUsageBill.toFixed(2)}</h2>
                  </div>
                )}

                {devices?.map((device, index) => (
                  <div key={index}>
                 
                    <div>
                      <DeviceChart3p
                        deviceName={device.deviceName}
                        device={device}
                        className="device-name-state"
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* <div className="chart-area d-flex align-items-center justify-content-center">
            {loading ? (
              <p className="loading-message">Loading please wait...</p>
            ) : (
              <LineChart selectedDevice={device || defaultSelectedDevice} />
            )}
          </div> */}

          {/* <div className="page-bottom">
            {loading ? (
              <p className="loading-message">Loading please wait...</p>
            ) : (
              <>
                {objOther.length > 1 ? (
             <div className='data-table ' >
             <table className="data-table table table-hover rounded "style={{marginTop:"10px"}}>
               <thead className='table-dark'>
                 <tr>
                   <th>Line</th>
                   <th>Voltage (V)</th>
                   <th>Current (A)</th>
                   <th>Power (W)</th>
                   <th>Power Factor</th>
                   <th>Hertz (Hz)</th>
                 </tr>
               </thead>
               <tbody>
                 {objOther.map((data, index) => (
                   <tr key={index}>
                     <td>{data.line}</td>
                     <td>{data.voltage}</td>
                     <td>{data.current}</td>
                     <td>{data.power}</td>
                     <td>{data.pf}</td>
                     <td>{data.hertz}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           
                ) : (
                  <>
                    <div className="vol">
                      <Voltage
                        budgetedValue={budgetedValues.budVoltage}
                        currentValue={objOther[0]?.voltage}
                      />
                    </div>
                    <div className="vol">
                      <Current
                        budgetedValue={budgetedValues.budCurrent}
                        currentValue={objOther[0]?.current}
                      />
                    </div>
                    <div className="vol">
                      <Power
                        budgetedValue={budgetedValues.budPower}
                        currentValue={objOther[0]?.power}
                      />
                    </div>
                    <div className="pow">
                      <Powerfact
                        budgetedValue={budgetedValues.budPf}
                        currentValue={objOther[0]?.pf}
                      />
                    </div>
                    <div className="pow">
                      <Hertz
                        budgetedValue={budgetedValues.budHertz}
                        currentValue={objOther[0]?.hertz}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div> */}
        </div>
      )}
      <BottomNav className="bottombar1" />
    </div>
  );
};

export default Home;
