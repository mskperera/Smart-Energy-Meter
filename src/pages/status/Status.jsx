import React, { useEffect, useState } from 'react';
import '../management/Management.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { getDeviceStatus } from '../../action/device';
import { ThreeDots } from 'react-loader-spinner';

function Status() {
  const [deviceDetails, setDeviceDetails] = useState([]); 
  const [device, setDevice] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedDevice = useSelector((state) => state.device.selectedDevice);

  useEffect(() => {
    setDevice(selectedDevice);
  }, [selectedDevice]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    if (selectedDevice) {
      const deviceId = selectedDevice.id;
      // const deviceId = 0;
      loadDeviceStatus(userId, 0);
      setLoading(true);
    }
  }, [selectedDevice]);

  const loadDeviceStatus = async (userId, deviceId) => {
    const result = await getDeviceStatus(userId, deviceId);
    // console.log('Result:', result);
    setDeviceDetails(result.data);
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className='home'>
      <div className="body">
        <div className="rounded p-2">
          <h2 className='d-flex justify-content-center align-items-center' style={{color:'white'}}>Device Status</h2>
          {loading ? (
            <div className="d-flex align-items-center justify-content-center">
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
            <table className="table table-hover rounded">
              <thead className='table-dark'>
                <tr>
                  <th>Device ID</th>
                  <th>Status</th>
                  <th>Last Responded</th>
                </tr>
              </thead>
              <tbody>
                {deviceDetails &&
                  deviceDetails.map((device) => (
                    <tr key={device.deviceId}>
                      <td>{device.deviceId}</td>
                      <td>{device.deviceStatus}</td>
                      <td>{formatDate(device.lastRepondedDate_utc)}</td>
                    </tr>
                  ))
                // ) : (
                //   <tr>
                //     <td colSpan="3">No data available</td>
                //   </tr>
                // )
                }
              </tbody>
            </table>
          )}
        </div>
      </div>
      <BottomNav className="bottombar" />
    </div>
  );
}

export default Status;
