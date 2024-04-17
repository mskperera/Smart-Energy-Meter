import React, { useEffect, useState } from 'react'
import './Home.css'

import { getConnectionSettingsByDeviceId} from '../../action/deviceSettings'

// import { Link } from 'react-router-dom'

function DeviceName () {

    const [editedDeviceName, setEditedDeviceName] = useState('');
    // const [newDeviceName, setNewDeviceName] = useState();

 

  const deviceId = 4;
//   const consumerCategoryId = 3;
//   const supplierId = 2;

   // const [deviceSettings,setDeviceSettings] = useState(null);


    const loadDeviceConnectionData=async()=>{
 
        const result=await getConnectionSettingsByDeviceId(deviceId);
       // setDeviceSettings(result.data);
       console.log("test",result);
       const deviceSetttings=result.data;
       setEditedDeviceName(deviceSetttings.deviceName);
    }

    useEffect(()=>{
        loadDeviceConnectionData();
    },[])
       


// const saveConnectionSettingsHandler=async(e)=>{
//     e.preventDefault();
//     try{
    
//     setErrorMessage('');
//     setMessage('');

// console.log("testingsave")
// const payload = {
//     deviceId: 4,
//     connection: editedConnection,
//     deviceName: editedDeviceName,
//     portNo: editedPortNo
//     };
  
//     const res = await saveConnectionSettings(payload);
//     console.log(res);
//     const { responseStatus, outputMessage } = res.data;
//     if (responseStatus === "failed") {
//       setErrorMessage(outputMessage)
//       return;
//     }
    
  
//     setMessage(outputMessage)
//     swal("Updated Successfully", "", "success").then(() => {
//         setLoad(!load);
//       });
    
//   }

//   catch(err){
//     //const jsonString = JSON.parse(err);
//     // setErrorMessage(jsonString);
//     console.log(err);
//   }
  
// }

 

  return (
        <div className='txt'>
            <p className='txt1 d-flex justify-content-end'>{editedDeviceName}</p>
        </div>
     )}

export default DeviceName;


