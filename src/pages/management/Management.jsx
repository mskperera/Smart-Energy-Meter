import React, { useEffect, useState } from 'react'
import './Management.css'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'
// import { getUsers } from '../../action/user';
import { Link } from 'react-router-dom';
import { deleteDevice, getDevices } from '../../action/device';
import swal from 'sweetalert';

function Management() {


  const [deviceDetails,setDeviceDetails]=useState(null);
  


  useEffect(() => {

   loadDevices();
  
  }, []);

  const loadDevices=async()=>{
    const result=await getDevices();
    setDeviceDetails(result.data);
   }


   const onDeleteDeviceHandler=async(deviceId)=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, You will not be able to recover this Device Details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
    const res = await deleteDevice(deviceId);
    console.log(res);
    const { responseStatus, outputMessage } = res.data.output;
    if (responseStatus === "failed") {
      console.log("exception:", outputMessage);
    }
    else {
      console.log("successful:", outputMessage);
      swal("Success!", "Your Device Details have been deleted!", "success");
      loadDevices();
  } 
      } else {
        swal("Your Device Detalis are safe!");
      }
    }
    );
  }
  
  

  return (
    <div className='home'>
    <Navbar className='navnav'/>
    <div className="body">
      <div className= "rounded p-2 ">
        <h2 className='d-flex justify-content-center align-items-center'>Device Management</h2>
        <div className='d-flex justify-content-end'>
          <Link to="/deviceregister/0/I" className='btn btn-info bbttnn'>Add Device</Link>
        </div>
        <table className="table1 table table-hover rounded">
          <thead className='table-dark'>
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
                    <button className="btn btn-sm btn-danger" onClick={()=>onDeleteDeviceHandler(device.deviceId)}>Delete</button>
                  </td>
                </tr>
                ))}

          </tbody>
        </table>
      </div>
  </div>
  <BottomNav className="bottombar"/>
    </div>
  )
}

export default Management