import React, { useEffect, useState } from 'react';
import BottomNav from '../../components/bottommenu/BottomNav';
import './DeviceInfo.css';
import '../management/Management.css';
import Navbar from '../../components/navbar/Navbar';
import { getDeviceDetailsByDeviceId, getDeviceInfoByUserId } from '../../action/device';
import { useSelector } from 'react-redux';

// import { Link } from 'react-router-dom'

const DeviceInfo = () => {
  const [deviceDetails, setDeviceDetails] = useState('');
  const [device, setDevice] = useState('');

  // const onChangeDeviceHandler=(device)=>{
  //   setDevice(device);
  // }

  const selectedDevice = useSelector((state) => state.device.selectedDevice);

  useEffect(() => {
    setDevice(selectedDevice);
  }, [selectedDevice]);

  useEffect(() => {
    // if(device){
    const userData = localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    loadDeviceInfoByUserId(userId);
    // }
  }, [device]);

  const loadDeviceInfoByUserId = async (userId) => {
    const result = await getDeviceInfoByUserId(userId);
    console.log('Result 11111111', result);
    setDeviceDetails(result.data);
    // console.log('Details',result)
  }

  //  {JSON.stringify(deviceDetails)} 
  //  <th>Device ID</th> 
  return (
    <div className='home'>
      <div className="body">
        <div className="rounded p-2">
          <h2 className='d-flex justify-content-center align-items-center'>Device Info</h2>
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
              {deviceDetails && deviceDetails.map((device) => (
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
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default DeviceInfo;
