import React, { useEffect, useState } from 'react';
import '../management/Management.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { getDeviceStatus } from '../../action/device';

function Status() {
  const [deviceDetails, setDeviceDetails] = useState(null); // Initialize as null
  const [device, setDevice] = useState('');
  const selectedDevice = useSelector((state) => state.device.selectedDevice);

  useEffect(() => {
    setDevice(selectedDevice);
  }, [selectedDevice]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    if (selectedDevice) {
      const deviceId = selectedDevice.id;
      loadDeviceStatus(userId, deviceId);
    }
  }, [selectedDevice]);

  const loadDeviceStatus = async (userId, deviceId) => {
    const result = await getDeviceStatus(userId, deviceId);
    console.log('Result:', result);
    const deviceDetail = result.data; // API response is a single object
    setDeviceDetails(deviceDetail);
  };

  return (
    <div className='home'>
      <div className="body">
        <div className="rounded p-2">
          <h2 className='d-flex justify-content-center align-items-center'>Device Status</h2>
          <table className="table1 table table-hover rounded">
            <thead className='table-dark'>
              <tr>
                <th>Device</th>
                <th>Status</th>
                <th>Last Responded</th>
              </tr>
            </thead>
            <tbody>
              {deviceDetails ? (
                <tr key={deviceDetails.deviceId}>
                  <td>{deviceDetails.deviceId}</td>
                  <td>{deviceDetails.deviceStatus}</td>
                  <td>{deviceDetails.lastRepondedDate}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="3">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <BottomNav className="bottombar" />
    </div>
  );
}

export default Status;
