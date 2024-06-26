import React, { useEffect, useState } from 'react';
import './Home.css';
// import Navbar from '../../components/navbar/Navbar';
import Menu from '../../components/menu/Menu';
import BottomNav from '../../components/bottommenu/BottomNav';
import { useSelector } from 'react-redux';
import {getEngergyUsageNow } from '../../action/device';
// import DeviceChart3p from './DeviceChart';
import DeviceChartMode from './DeviceChartMode';
import { ThreeDots } from 'react-loader-spinner';

const Home = () => {
  // const [device, setDevice] = useState(null);
  const selectedDevice = useSelector((state) => state.device.selectedDevice);


const [loading,setLoading]=useState(null);

  useEffect(() => {
    loadChartData();
    setLoading(true);
    const intervalId = setInterval(() => {
      loadChartData();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [selectedDevice]);

  const loadChartData = async () => {
   
    const payload = {
      deviceId: selectedDevice?.id,
      measurementUnitId: 1,
    };
    const result = await getEngergyUsageNow(payload);

    console.log('result---11111', result.data);


    setDevices(result.data);
    setLoading(false);
  };



  const [devices, setDevices] = useState([]);
  
const totalUsageBill = devices.reduce((total, line) => total + line.usageBill, 0);
const totalUsageKwh = devices.reduce((total, line) => total + line.kwh, 0);

  return (
    // <div className='home-industry'>
    <div className="home-industry">
      {/* <Navbar className="navnav" onChangeDevice={onChangeDeviceHandler}/> */}
      <Menu className="navnav1"/>

    
        <div className="body" style={{overflow:'auto'}}>
            <div className="session-name">
              <h6>Session Date : 24 Jun 2024</h6>
            </div>
          {/* {JSON.stringify(devices)} */}
          <div className="container">
            {/* {JSON.stringify(deviceDetails)} */}

            {loading ? (
              // <p className="loading-message">Loading please wait...</p>
              <div  className="d-flex align-items-center justify-content-center">
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
            ) : (
              <>
                {devices.length > 1 && (
                  <div className='budget-values'
                    style={{ display: "flex", justifyContent: "space-between"}}
                  >
                    <h2 style={{color:'black'}}>Total kWh: <span style={{color:'#fff346'}}>{totalUsageKwh?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></h2>
                    <h2 style={{color:'black'}}>Total Bill: <span style={{color:'#4484ff'}}>{totalUsageBill?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></h2>
       
                  </div>
                )}

                {devices?.map((device, index) => (
                  <div key={index}>
                 
                    <div className="device-name-state-mode">
                     
                      <DeviceChartMode
                        deviceName={device.deviceName} 
                        device={device}
                        
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
      
      <BottomNav className="bottombar1" />
    </div>
    // {/* </div> */}
  );
};

export default Home;
