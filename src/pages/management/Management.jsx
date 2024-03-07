import React, { useEffect, useState } from 'react'
import './Management.css'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'
// import { getUsers } from '../../action/user';
import { Link } from 'react-router-dom';
import { getDevices } from '../../action/device';

function Management() {


  const [deviceDetails,setDeviceDetails]=useState(null);
  


  useEffect(() => {

   loadDevices();
  
  }, []);

  const loadDevices=async()=>{
    const result=await getDevices();
    setDeviceDetails(result.data);
   }

  

  return (
    <>
    <Navbar/>
    <div className="body">
      <div className= "rounded p-2 ">
        <h2 className='d-flex justify-content-center align-items-center'>Device Management</h2>
        <div className='d-flex justify-content-end'>
          <Link to="/deviceregister/0/I" className='btn btn-info'>Add Device</Link>
        </div>
        <table className="table1 table">
          <thead>
            <tr>
              {/* <th>Device ID</th> */}
              <th>Device No</th>
              <th>Firmware Version</th>
              <th>Hardware version</th>
              <th>Product</th>
              <th>Serial No</th>
              <th>Edit|Delete</th>
            </tr>
          </thead>
          <tbody>
            
              {/* {drpData2.map(u=>( */}
              {deviceDetails && deviceDetails.map((device) => (
                <tr key={device.deviceId}>
                  {/* {JSON.stringify(deviceDetails)}  */}
                  {/* <td>{device.deviceId}</td> */}
                  <td>{device.deviceNo}</td>
                  <td>{device.firmwareVersion}</td>
                  <td>{device.hardwareVersion}</td>
                  <td>{device.product}</td>
                  <td>{device.serialNo}</td>
                  <td>
                    <Link to={`/deviceregister/${device.deviceId}/U`} className="btn btn-sm btn-primary"> Edit</Link>&nbsp;
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
                ))}

          </tbody>
        </table>
      </div>
  </div>
  <BottomNav className="bottombar"/>
    </>
  )
}

export default Management