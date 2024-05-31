import React, { useEffect, useState } from 'react';
import './Home.css';
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
import { getDeviceStatus } from '../../action/device';
import { getBudgetedValues, get_DeviceSettingsByDeviceId } from '../../action/deviceSettings';

const Home = () => {
  const [device, setDevice] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [budgetedValues, setBudgetedValues] = useState('');
  const [budgetedValueAmount, setBudgetedValueAmount] = useState('');
  const [lineOne, setLineOne] = useState('');
  const [lineTwo, setLineTwo] = useState('');
  const [lineThree, setLineThree] = useState('');
  const [selectedLine, setSelectedLine] = useState('L1');

  const onChangeDeviceHandler = (selectedDevice) => {
    setDevice(selectedDevice);
  };

  const deviceNames = useSelector((state) => state.device.dropDeviceList);
  console.log('device - list - name', deviceNames);
  const defaultSelectedDevice = deviceNames[0];

  useEffect(() => {
    setDevice(defaultSelectedDevice);
  }, [deviceNames, defaultSelectedDevice]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;

    const intervalId = setInterval(() => {
      loadDeviceStatus(userId);
      loadBudgetedValues(device?.id || defaultSelectedDevice?.id);
    }, 5000);

    return () => clearInterval(intervalId); 
  }, [device, defaultSelectedDevice]);

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
    const budgetedValue = result.data;
    setBudgetedValues(budgetedValue.kwhAmount);
    setBudgetedValueAmount(budgetedValue.billAmount);
  };

  const handleLineChange = (e) => {
    setSelectedLine(e.target.value);
  };

  const selectedDeviceDetails = deviceDetails.find(
    (deviceDetail) => deviceDetail.deviceId === (device?.id || defaultSelectedDevice?.id)
  );

  return (
    <div className='home'>
      <Navbar className='navnav' onChangeDevice={onChangeDeviceHandler} />
      <Menu className='navnav1' />
      {device && (
        <div className='body'>
          <div className='device-active'>
            {selectedDeviceDetails && (
              <div className='both' key={selectedDeviceDetails.deviceId}>
                <div
                  className={`curcle ${selectedDeviceDetails?.deviceStatus === 'online' ? 'curcle-online' : 'curcle-offline'}`}
                ></div>
                <div className='curcle-name'>
                  <div className={`device-status ${selectedDeviceDetails.deviceStatus === 'online' ? 'online' : 'offline'}`}>
                    {selectedDeviceDetails.deviceStatus}
                  </div>
                </div>
              </div>
            )}
            <div className='device-name'>
              <DeviceName selectedDevice={device || defaultSelectedDevice} />
            </div>
          </div>

          {device.deviceTypeId === 2 && (
            <div className='device-active-2'>
              <div className="dropdown" style={{ marginLeft: '10px' }}>
                <select className="dropdown-line" onChange={handleLineChange}>
                  <option value="L1">{lineOne}</option>
                  <option value="L2">{lineTwo}</option>
                  <option value="L3">{lineThree}</option>
                </select>
              </div>
            </div>
          )}

          <div className='page'>
            <div className='chart-now-kw'>
              <HomeChart data='' selectedDevice={device || defaultSelectedDevice} budgetedValues={budgetedValues}/>
            </div>
            <div className='chart-now-cost'>
              <HomeCostChart data='' selectedDevice={device || defaultSelectedDevice} budgetedValueAmount={budgetedValueAmount} selectedLine={selectedLine} />
            </div>
          </div>
          <div className='chart-area d-flex align-items-center justify-content-center'>
            <LineChart selectedDevice={device || defaultSelectedDevice} />
          </div>
          <div className='page-bottom'>
            <div className='vol'><Voltage selectedDevice={device || defaultSelectedDevice} /></div>
            <div className='vol'><Current selectedDevice={device || defaultSelectedDevice} /></div>
            <div className='vol'><Power selectedDevice={device || defaultSelectedDevice} /></div>
            <div className='pow'><Powerfact selectedDevice={device || defaultSelectedDevice} /></div>
            <div className='pow'><Hertz selectedDevice={device || defaultSelectedDevice} /></div>
          </div>
        </div>
      )}
      <BottomNav className='bottombar1' />
    </div>
  );
};

export default Home;
