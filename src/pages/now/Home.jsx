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

const Home = () => {
  const [device, setDevice] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState([]);

  const onChangeDeviceHandler = (selectedDevice) => {
    setDevice(selectedDevice);
  };

  const deviceNames = useSelector((state) => state.device.dropDeviceList);
  const defaultSelectedDevice = deviceNames[0];

  useEffect(() => {
    setDevice(defaultSelectedDevice);
  }, [deviceNames]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    loadDeviceStatus(userId);
  }, [device]);

  const loadDeviceStatus = async (userId,deviceId) => {
    const result = await getDeviceStatus(userId,deviceId);
    console.log('Result 12121212', result);
    if (result.status === 200) {
      setDeviceDetails(result.data[0]);
    }
  };

  const selectedDeviceDetails = deviceDetails.find(
    (deviceDetail) => deviceDetail.deviceId === (device?.id || defaultSelectedDevice?.id)
  );

  return (
    <div className='home'>
      <Navbar className='navnav' onChangeDevice={onChangeDeviceHandler} />
      <Menu className='navnav1'/>
      {device && (
        <div className='body'>
          {/* {JSON.stringify(deviceDetails)} */}
          <div className='device-active'>
            {selectedDeviceDetails && (
              <div key={selectedDeviceDetails.deviceId}>
                {/* <div>Device ID: {selectedDeviceDetails.deviceId}</div> */}
                <div>{selectedDeviceDetails.deviceStatus}</div>
                {/* <div>Last Responded Date: {selectedDeviceDetails.lastRepondedDate}</div> */}
              </div>
            )}
            {/* <div className='curcle'></div> */}
            <div className='device-name'>
              <DeviceName selectedDevice={device || defaultSelectedDevice}/>
            </div>
          </div>

          <div className='device-active-2'>
            <div className="dropdown" style={{ marginLeft: '10px' }}>
              <select className="dropdown-line">
                <option value="L1">Line-1</option>
                <option value="L2">Line-2</option>
                <option value="L3">Line-3</option>
              </select>
            </div>
          </div>

          <div className='page'>
            
            <div className='chart-now-kw'>
              <HomeChart data='' selectedDevice={device || defaultSelectedDevice}/>
            </div>
            <div className='chart-now-cost'>
              <HomeCostChart data='' selectedDevice={device || defaultSelectedDevice}/>
            </div>
          </div>
          <div className='chart-area d-flex align-items-center justify-content-center'>
            <LineChart selectedDevice={device || defaultSelectedDevice}/>
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
