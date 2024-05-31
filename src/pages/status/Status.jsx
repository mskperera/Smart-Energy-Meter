import React, { useEffect, useState } from 'react'
import '../management/Management.css'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'
// import { getUsers } from '../../action/user';
// import { Link } from 'react-router-dom';
// import { deleteDevice, getDevices } from '../../action/device';
// import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { getDeviceStatus } from '../../action/device';

function Status() {


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

    // const userId = 1;
    const userData = localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    // const deviceId = 4;
    loadDeviceStatus(userId);
  
  }, [device]);

  const loadDeviceStatus=async(userId)=>{
    const result=await getDeviceStatus(userId);
    console.log('Result tttttttttttttttt',result);
    const arr = result.data;
    console.log('Result 222222222',arr);
    setDeviceDetails(arr[0]);
   }


//    const onDeleteDeviceHandler=async(deviceId)=>{
//     swal({
//       title: "Are you sure?",
//       text: "Once deleted, You will not be able to recover this Device Details!",
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//     })
//     .then(async (willDelete) => {
//       if (willDelete) {
//     const res = await deleteDevice(deviceId);
//     console.log(res);
//     const { responseStatus, outputMessage } = res.data.output;
//     if (responseStatus === "failed") {
//       console.log("exception:", outputMessage);
//     }
//     else {
//       console.log("successful:", outputMessage);
//       swal("Success!", "Your Device Details have been deleted!", "success");
//       loadDevices();
//   } 
//       } else {
//         swal("Device Details deletion has been cancelled!");
//       }
//     }
//     );
//   }
  
  

  return (
    <div className='home'>
    <Navbar onChangeDevice={onChangeDeviceHandler} className='navnav'/>
    <div className="body">
      <div className= "rounded p-2 ">
        <h2 className='d-flex justify-content-center align-items-center'>Device Status</h2>
       
        <table className="table1 table table-hover rounded">
          <thead className='table-dark'>
            <tr>
              {/* <th>Device ID</th> */}
              <th>Device</th>
              <th>Status</th>
              <th>Last Responded</th>
              
            </tr>
          </thead>
          <tbody>
            
              {/* {drpData2.map(u=>( */}
              {deviceDetails && deviceDetails.map((device) => (
                <tr key={device.userId}>
                  {/* {JSON.stringify(deviceDetails)}  */}
                  <td>{device.deviceId}</td>
                  <td>{device.deviceStatus}</td>
                  <td>{device.lastRepondedDate}</td>
                  
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

export default Status