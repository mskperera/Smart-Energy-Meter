import React, { useEffect, useState } from 'react'
import { addDevice, deleteDevice, getDeviceByDeviceId, getDevices} from '../../action/device';

const DeviceMan=()=> {
  const [deviceDetails,setDeviceDetails]=useState(null);
  const [deviceDetail,setDeviceDetail]=useState(null);


  useEffect(() => {

   // loadDevices();
   // loadDeviceById();
  }, []);




   const loadDevices=async()=>{
    const result=await getDevices();
    setDeviceDetails(result.data);
   }

   const loadDeviceById=async()=>{
    const result=await getDeviceByDeviceId(2);
    setDeviceDetail(result.data);
   }
   

const addDeviceHandler=async()=>{
 
 

 
  const payload = {
    deviceId: 2,
    deviceNo: "D992",
    hardwareVersion: "h/w dfd",
    serialNo: "98980ds0dfds",
    firmwareVersion:"F.0v",
    product:"Product2",
    iud:"I"

  };

  const res = await addDevice(payload);
  console.log(res);
  const { responseStatus, outputMessage } = res.data.output;
  if (responseStatus === "failed") {
    console.log("exception:", outputMessage);
  }

  console.log("successful:", outputMessage);
}


const deleteDeviceHandler=async()=>{

  const res = await deleteDevice(5);
  console.log(res);
  const { responseStatus, outputMessage } = res.data.output;
  if (responseStatus === "failed") {
    console.log("exception:", outputMessage);
  }

  console.log("successful:", outputMessage);
}

  return (
    <>
    <h4>Add Device</h4>
     <button onClick={addDeviceHandler}>Save</button>
    <hr/>
    <br/>
    <h4>Delete Device</h4>
     <button onClick={deleteDeviceHandler}>Save</button>
    <hr/>
    <br/>
    <h4>get Devices</h4>
   {JSON.stringify(deviceDetails)}
    <hr/>
    <br/>
    <h4>get Device</h4>
   {JSON.stringify(deviceDetail)}
    <hr/>
    <br/>
    
    </>
  
  )
}

export default DeviceMan;