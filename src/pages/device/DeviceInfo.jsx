import React, { useEffect, useState } from 'react'
import BottomNav from '../../components/bottommenu/BottomNav'
import './DeviceInfo.css'
import '../management/Management.css'
import Navbar from '../../components/navbar/Navbar'
import { getDeviceDetailsByDeviceId, getDeviceInfoByUserId } from '../../action/device'
import { useSelector } from 'react-redux'

// import { Link } from 'react-router-dom'

const DeviceInfo = () => {


  const [deviceDetails,setDeviceDetails]=useState('');

  const [device, setDevice] = useState('');

  const onChangeDeviceHandler=(device)=>{
    setDevice(device);
  }

  const deviceNames=useSelector(state=>state.device.dropDeviceList);
  const defaultSelctedDevie=deviceNames[0];

  useEffect(()=>{
  setDevice(defaultSelctedDevie);
  },[deviceNames])

  useEffect(() => {

    // if(device){
      const userData = localStorage.getItem('userData');
      const userId = JSON.parse(userData).userId;
      loadDeviceInfoByUserId(userId);
    // }
}, [device]);

  const loadDeviceInfoByUserId=async(userId)=>{
    const result=await getDeviceInfoByUserId(userId);
    console.log('Result 11111111',result);
    setDeviceDetails(result.data);
    // console.log('Details',result)
  }

  
  return (
    
    <div className='home'>
    <Navbar onChangeDevice={onChangeDeviceHandler}/>
    {/* <div className='nav-bar'>
            <ul className='nav-bar-links'>
                <Link to={"/deviceinfo"}><li className='btn btn-sm btn-primary'>Device Info</li></Link> 
                <Link to={"/service"}><li className='btn btn-sm btn-primary'>Service</li></Link>  
                <Link to={"/connection"}><li className='btn btn-sm btn-primary'>Connection</li></Link>
            </ul>
    </div> */}

      {/* <div className=' body d-flex align-items-center justify-content-center w-100'>
          <div className='form-group mb-2 deviceinfo'>
              <h2 className='d-flex align-items-center justify-content-center mb-2'>Device Info</h2>
            <div className='form-group mb-1'>
              <label htmlFor='product' className='form-label'>Product</label>
              <input type='text' className='form-control' value={deviceDetails.product} readOnly />
            </div>
            <div className='form-group mb-1'>
              <label htmlFor='version' className='form-label'>Firmware Version</label>
              <input type='text' className='form-control' value={deviceDetails.firmwareVersion} readOnly/>
            </div>
            <div className='form-group mb-1'>
              <label htmlFor='hversion' className='form-label'>Hardware Version</label>
              <input type='text' className='form-control' value={deviceDetails.hardwareVersion} readOnly />
            </div>
            <div className='form-group mb-1'>
              <label htmlFor='serial' className='form-label'>Serial number</label>
              <input type='text' className='form-control' value={deviceDetails.serialNo} readOnly/>
            </div>
            <div className='form-group mb-1'>
              <label htmlFor='serial' className='form-label'>Meter Type</label>
              <input type='text' className='form-control' value={deviceDetails} readOnly/>
            </div>
          </div>
      </div> */}
      <div className="body">
      <div className= "rounded p-2 ">
        <h2 className='d-flex justify-content-center align-items-center'>Device Info</h2>
        
        <table className="table1 table table-hover rounded">
          <thead className='table-dark'>
            <tr>
              {/* <th>Device ID</th> */}
              <th>Device No</th>
              <th>Firmware Version</th>
              <th>Hardware version</th>
              <th>Product</th>
              <th>Serial No</th>
              <th>Meter Type</th>
            </tr>
          </thead>
          <tbody>
            
              {/* {drpData2.map(u=>( */}
              {deviceDetails && deviceDetails.map((device) => (
                <tr key={device.userId}>
                  {/* {JSON.stringify(deviceDetails)}  */}
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
    <BottomNav/>
    </div>
    
  )
}

export default DeviceInfo