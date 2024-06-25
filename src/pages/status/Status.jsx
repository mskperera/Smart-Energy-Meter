import React, { useEffect, useState } from 'react';
import '../management/Management.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { getDeviceStatus } from '../../action/device';
import { ThreeDots } from 'react-loader-spinner';

function Status() {
  const [deviceDetails, setDeviceDetails] = useState(null); // Initialize as null
  const [device, setDevice] = useState('');

  const [loading, setLoading] = useState(null);

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
      setLoading(true);
    }
  }, [selectedDevice]);

  const loadDeviceStatus = async (userId, deviceId) => {
    const result = await getDeviceStatus(userId, deviceId);
    setLoading(true);
    console.log('Result:', result);
    const deviceDetail = result.data; // API response is a single object
    setDeviceDetails(deviceDetail);
    setLoading(false);
  };

  return (
    <div className='home'>
      <div className="body">
        <div className="rounded p-2">
          <h2 className='d-flex justify-content-center align-items-center'>Device Status</h2>
          {loading ? (
            // <p className='loading-message'>Loading please wait...</p>
            <div  className="d-flex align-items-center justify-content-center">
          <ThreeDots
              height={80}
              width={80}
              color="#36A2EB"
              ariaLabel="loading"
              secondaryColor="#36A2EB"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
          ) : (
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
          )  
          }
        </div>
      </div>
      <BottomNav className="bottombar" />
    </div>
  );
}

export default Status;
