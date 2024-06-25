import React, { useEffect, useState } from 'react';
import BottomNav from '../../components/bottommenu/BottomNav';
import './DeviceInfo.css';
import '../management/Management.css';
import { getDeviceInfoByUserId } from '../../action/device';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

const DeviceInfo = () => {
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedDevice = useSelector((state) => state.device.selectedDevice);

  useEffect(() => {
    if (selectedDevice) {
      const userData = localStorage.getItem('userData');
      const userId = JSON.parse(userData).userId;
      loadDeviceInfoByUserId(userId);
    }
  }, [selectedDevice]);

  const loadDeviceInfoByUserId = async (userId) => {
    setLoading(true);
    try {
      const result = await getDeviceInfoByUserId(userId);
      console.log('Result 11111111', result);
      setDeviceDetails(result.data);
    } catch (error) {
      console.error('Error loading device info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='home'>
      <div className="body">
        <div className="rounded p-2">
          <h2 className='d-flex justify-content-center align-items-center'>Device Info</h2>
          {loading ? (
            // <p className="loading-message">Loading please wait...</p>
            <div className="d-flex align-items-center justify-content-center">
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
                  <th>Device No</th>
                  <th>Firmware Version</th>
                  <th>Hardware version</th>
                  <th>Product</th>
                  <th>Serial No</th>
                  <th>Meter Type</th>
                </tr>
              </thead>
              <tbody>
                {deviceDetails.map((device) => (
                  <tr key={device.deviceNo}>
                    <td>{device.deviceNo}</td>
                    <td>{device.firmwareVersion}</td>
                    <td>{device.hardwareVersion}</td>
                    <td>{device.product}</td>
                    <td>{device.serialNo}</td>
                    <td>{device.deviceTypeName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default DeviceInfo;
