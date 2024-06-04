import React, { useEffect, useState } from 'react';
import './Homecopy.css';
import Navbar from '../../components/navbar/Navbar';
import Menu from '../../components/menu/Menu';
import BottomNav from '../../components/bottommenu/BottomNav';
import HomeChart from './HomeChart';
import HomeCostChart from './HomeCostChart';
import Voltage from './Voltage';
import Current from './Current';
import Power from './Power';
import Hertz from './Hertz';
import Powerfact from './Powerfact';
import LineChart from './LineChart';
import DeviceName from './DeviceName';
import { useSelector } from 'react-redux';
import { getDeviceStatus, getEngergyUsageNow } from '../../action/device';
import { getBudgetedValues, get_DeviceSettingsByDeviceId } from '../../action/deviceSettings';

const Home = () => {
  const [device, setDevice] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [budgetedKwhValue, setBudgetedKwhAmount] = useState('');
  const [budgetedBillValue, setBudgetedBillAmount] = useState('');
  const [lineOne, setLineOne] = useState('');
  const [lineTwo, setLineTwo] = useState('');
  const [lineThree, setLineThree] = useState('');
  const [selectedLine, setSelectedLine] = useState('L1');
  const [showDeviceMeasuringModeDropdown,setShowDeviceMeasuringModeDropdown]=useState(false);

  const onChangeDeviceHandler = (selectedDevice) => {
    setDevice(selectedDevice);
  };

  const deviceNames = useSelector((state) => state.device.dropDeviceList);

  const defaultSelectedDevice = deviceNames[0];

  useEffect(() => {
    setDevice(defaultSelectedDevice);
  }, [deviceNames, defaultSelectedDevice]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;

    const intervalId = setInterval(() => {
      loadDeviceStatus(userId);
    }, 5000);

    return () => clearInterval(intervalId); 
  }, [device, defaultSelectedDevice]);



  const [objKw, setObjKw] = useState({
    budgetedKwhValue:null,
    minKwValue: 0,
    currentKwValue: 0,
    kwhPerSeconds: 0,
  });

  const [objBill, setObjBill] = useState({
    budgetedBillValue:null,
    minBillValue: 0,
    currentBillValue: 0,
    kwhPerSeconds: 0,
  });

  const [objOther, setObjOther] = useState({});

  const [budgetedValues,setBudgetedValues]=useState(false);

const [loading,setLoading]=useState(false)



  useEffect(() => {
    setLoading(true);
    const intervalId = setInterval(() => {
      loadChartData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [device,selectedLine,budgetedKwhValue]);

  const loadChartData = async () => {
    const payload = {
      deviceId: device.id,
      measurementUnitId: 1,
    };
    const result = await getEngergyUsageNow(payload);
    console.log('result11111', result.data);

    setLoading(false);

 const {budVoltage,budCurrent,budPower,budPf,budHertz } = result.data;
    setBudgetedValues({budVoltage,budCurrent,budPower,budPf,budHertz })

    if (device.deviceTypeId === 1) {
      setShowDeviceMeasuringModeDropdown(false);
        const { kwh,usageBill } = result.data;

      console.log('deviceTypeId 1 kwh', kwh);
      setObjKw({ ...objKw, currentKwValue: (kwh)?.toFixed(2),budgetedKwhValue});
      setObjBill({ ...objBill, currentBillValue:(usageBill)?.toFixed(2),budgetedBillValue});


      const { kwhPerSec,voltage,current,power,pf,hertz } = result.data;

      const other=[{ kwhPerSec,voltage,current,power,pf,hertz}];
      setObjOther(other);

    } else if (device.deviceTypeId === 2) {

    const { kwh, kwh2, kwh3,usageBill,usageBill2,usageBill3,deviceMeasuringModeId } = result.data;
    console.log('deviceMeasuringModeId', deviceMeasuringModeId);
    let  totalKwh =0;
    let  totalBill =0;
    if(deviceMeasuringModeId===1)//Individual line measurement
    { 
      setShowDeviceMeasuringModeDropdown(true);
      console.log('selectedLine', selectedLine);
      if (selectedLine === "L1") {
        totalKwh = kwh;
        totalBill=usageBill;
      } else if (selectedLine === "L2") {
        totalKwh = kwh2;
        totalBill=usageBill2;
      } else if (selectedLine === "L3") {
        totalKwh = kwh3;
        totalBill=usageBill3;
      }
    }
    else if (deviceMeasuringModeId===2)//Consolidated three-phase measurement
    {
      setShowDeviceMeasuringModeDropdown(false);
 totalKwh = (kwh || 0) + (kwh2 || 0) + (kwh3 || 0);
 totalBill = (usageBill || 0) + (usageBill2 || 0) + (usageBill2 || 0);
    }

      console.log("deviceTypeId 2 kwh", totalKwh);
      setObjKw({ ...objKw, currentKwValue:totalKwh?.toFixed(2),budgetedKwhValue });
      setObjBill({ ...objBill, currentBillValue:totalBill?.toFixed(2),budgetedBillValue});


    const { kwhPerSec,voltage,current,power,pf,hertz,
      kwhPerSec2,voltage2,current2,power2,pf2,hertz2,
      kwhPerSec3,voltage3,current3,power3,pf3,hertz3,
     } = result.data;

    const other=[];
    other.push({kwhPerSec,voltage,current,power,pf,hertz,line:'L1'});
    other.push({kwhPerSec:kwhPerSec2,voltage:voltage2,current:current2,power:power2,pf:pf2,hertz:hertz2,line:'L2'});
    other.push({kwhPerSec:kwhPerSec3,voltage:voltage3,current:current3,power:power3,pf:pf3,hertz:hertz3,line:'L3'});
    setObjOther(other);

    }
  };



  useEffect(() => {
    loadBudgetedValues(device?.id || defaultSelectedDevice?.id);
    loadDeviceSettingstData(device?.id || defaultSelectedDevice?.id);
  }, [device, defaultSelectedDevice]);

  const loadDeviceStatus = async (userId, deviceId) => {
    const result = await getDeviceStatus(userId, deviceId);
    if (result.status === 200) {
      setDeviceDetails(result.data[0]);
    }
  };

  const loadDeviceSettingstData = async (deviceId) => {
    const result = await get_DeviceSettingsByDeviceId(deviceId);
    const deviceSetting = result.data;
    setLineOne(deviceSetting.l1);
    setLineTwo(deviceSetting.l2);
    setLineThree(deviceSetting.l3);
  };

  const loadBudgetedValues = async (deviceId) => {
    const result = await getBudgetedValues(deviceId);
    console.log('loadBudgetedValues',result)
    const budgetedValue = result.data;
    setBudgetedKwhAmount(budgetedValue.kwhAmount);
    setBudgetedBillAmount(budgetedValue.billAmount);
  };

  const handleLineChange = (e) => {
    setSelectedLine(e.target.value);
  };

  const selectedDeviceDetails = deviceDetails.find(
    (deviceDetail) => deviceDetail.deviceId === (device?.id || defaultSelectedDevice?.id)
  );

  return (
    <div className="home">
      {/* {JSON.stringify(objBill)}
      <br />
      {JSON.stringify(objKw)} */}

      {/* {JSON.stringify(objOther.length)} */}

      <Navbar className="navnav" onChangeDevice={onChangeDeviceHandler} />
      <Menu className="navnav1" />

      {device && (
        <div className="body">
          <div className="device-active">
            {selectedDeviceDetails && (
              <div className="both" key={selectedDeviceDetails.deviceId}>
                <div
                  className={`curcle ${
                    selectedDeviceDetails?.deviceStatus === "online"
                      ? "curcle-online"
                      : "curcle-offline"
                  }`}
                ></div>
                <div className="curcle-name">
                  <div
                    className={`device-status ${
                      selectedDeviceDetails.deviceStatus === "online"
                        ? "online"
                        : "offline"
                    }`}
                  >
                    {selectedDeviceDetails.deviceStatus}
                  </div>
                </div>
              </div>
            )}
            <div className="device-name">
              <DeviceName selectedDevice={device || defaultSelectedDevice} />
            </div>
          </div>

          {showDeviceMeasuringModeDropdown && (
            <div className="device-active-2">
              <div className="dropdown" style={{ marginLeft: "10px" }}>
                <select className="dropdown-line" onChange={handleLineChange}>
                  <option value="L1">{lineOne}</option>
                  <option value="L2">{lineTwo}</option>
                  <option value="L3">{lineThree}</option>
                </select>
              </div>
            </div>
          )}

          <div className="page">
            <div className="chart-now-kw">
              {loading ? (
                <p className="loading-message">Loading please wait...</p>
              ) : (
                <HomeChart objKw={objKw} selectedLine={selectedLine} />
              )}
            </div>
            <div className="chart-now-cost">
              {loading ? (
                <p className="loading-message">Loading please wait...</p>
              ) : (
                <HomeCostChart objBill={objBill} selectedLine={selectedLine} />
              )}
            </div>

            <div>
              <div className="vol">
                {loading ? (
                  <p className="loading-message">Loading please wait...</p>
                ) : (
                  <Voltage
                    budgetedValue={budgetedValues.budVoltage}
                    currentValue={objOther[0]?.voltage}
                  />
                )}
              </div>
              <div className="vol">
                {loading ? (
                  <p className="loading-message">Loading please wait...</p>
                ) : (
                  <Current
                    budgetedValue={budgetedValues.budCurrent}
                    currentValue={objOther[0]?.current}
                  />
                )}
              </div>
              <div className="vol">
                {loading ? (
                  <p className="loading-message">Loading please wait...</p>
                ) : (
                  <Power
                    budgetedValue={budgetedValues.budPower}
                    currentValue={objOther[0]?.power}
                  />
                )}
              </div>
              <div className="pow">
                {loading ? (
                  <p className="loading-message">Loading please wait...</p>
                ) : (
                  <Powerfact
                    budgetedValue={budgetedValues.budPf}
                    currentValue={objOther[0]?.pf}
                  />
                )}
              </div>
              <div className="pow">
                {loading ? (
                  <p className="loading-message">Loading please wait...</p>
                ) : (
                  <Hertz
                    budgetedValue={budgetedValues.budHertz}
                    currentValue={objOther[0]?.hertz}
                  />
                )}
              </div>
            </div>

          </div>
          <div className="chart-area d-flex align-items-center justify-content-center">
            {loading ? (
              <p className="loading-message">Loading please wait...</p>
            ) : (
              <LineChart selectedDevice={device || defaultSelectedDevice} />
            )}
          </div>

          <div className="page-bottom">
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
          </div>
        </div>
      )}
      <BottomNav className="bottombar1" />
    </div>
  );
};

export default Home;
