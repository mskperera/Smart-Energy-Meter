import React, { useEffect, useState } from 'react'
import { addDevice, getDeviceByDeviceId, getDeviceDetailsByDeviceId, getDevices, updateDevice } from '../../action/device';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';


function DeviceRegister() {

  const {deviceRegId, saveType} = useParams();


  const [deviceDetails,setDeviceDetails]=useState(null);

  const [deviceNo,setDeviceNo]=useState('');
  const [hardwareVersion,setHardwareVersion]=useState('');
  const [serialNo,setSerialNo]=useState('');
  const [firmwareVersion,setFirmwareVersion]=useState('');
  const [product,setProduct]=useState('');

  useEffect(() => {
    if(saveType==="U"){
      loadDevices();
    }
  }, []);

  const loadDevices = async () => {
    console.log("loadDevices",deviceRegId);
    const result = await getDeviceByDeviceId(deviceRegId);
    // // setDeviceDetails(result.data);
      const device = result.data;
      console.log("result data:",result);
    

    //   console.log("result data:",device);
      
      setDeviceNo(device.deviceNo);
      setHardwareVersion(device.hardwareVersion);
      setSerialNo(device.serialNo);
      setFirmwareVersion(device.firmwareVersion);
      setProduct(device.product);
  }

  const [message,setMessage]=useState('');
   const [errormessage,setErrorMessage]=useState('');

  const onsubmitHandler=async(e)=>{
    e.preventDefault();
    try{

      setErrorMessage('');
      setMessage('');

  const payload = {
    deviceId: 2,
    deviceNo: deviceNo,
    hardwareVersion: hardwareVersion,
    serialNo: serialNo,
    firmwareVersion:firmwareVersion,
    product:product
    // iud:"I"

  };

  if(saveType==="I"){
  const res = await addDevice(payload);
  console.log(res);
  const { responseStatus, outputMessage } = res.data.output;
  if (responseStatus === "failed") {
    setErrorMessage(outputMessage);
    return;
  }
  setMessage(outputMessage);
  swal("Device Added Successfully", "", "success").then(() => {
    window.location = "/management";
  });
}

else if(saveType==="U"){
  
  const res = await updateDevice(payload,deviceRegId);
  console.log(res);
  const { responseStatus, outputMessage } = res.data.output;
  if (responseStatus === "failed") {
    
    setErrorMessage(outputMessage)
        return;
  }
  setMessage(outputMessage)
  swal("Device Updated Successfully", "", "success").then(() => {
    window.location = "/management";
  }); 
}
}
catch(err){
  console.log(err);
}
  }

return (
  <div className='wrapper-register d-flex align-items-center justify-content-center w-100'>
    <div className='register'>
   {saveType==="I" ?  <h2 className='d-flex align-items-center justify-content-center mb-2'>Device Registration</h2> : <h2 className='d-flex align-items-center justify-content-center mb-2'>Update Device Details</h2>} 
      
      <form className='needs-validation' onSubmit={onsubmitHandler} >
        <div className='row'>
          
          <div className='mb-1'>
            <div className='form-group was-validated'>
              <label htmlFor='username' className='form-label'>
                Device No
              </label>
              <input type='text' className='form-control' value={deviceNo} onChange={(e)=>{setDeviceNo(e.target.value)}}  required />
            </div>
            {JSON.stringify(deviceNo)}

            <div className='form-group was-validated'>
              <label htmlFor='firmwareVersion' className='form-label'>
              Firmware Version
              </label>
              <input type='text' className='form-control' value={firmwareVersion} onChange={(e)=>{setFirmwareVersion(e.target.value)}} required />
            </div>

            <div className='form-group was-validated'>
              <label htmlFor='hardwareVersion' className='form-label'>
              Hardware Version
              </label>
              <input type='text' className='form-control' value={hardwareVersion} onChange={(e)=>{setHardwareVersion(e.target.value)}} required />
            </div>

            <div className='form-group was-validated'>
              <label htmlFor='product' className='form-label'>
              Product
              </label>
              <input type='text' className='form-control' value={product} onChange={(e)=>{setProduct(e.target.value)}} required />
            </div>
            
            <div className='form-group was-validated'>
              <label htmlFor='address' className='form-label'>
              Serial No
              </label>
              <input type='text' className='form-control' value={serialNo} onChange={(e)=>{setSerialNo(e.target.value)}} required />
            </div>
          </div>
        </div>

        <button type='submit' className='btn btn-primary w-100 mt-3'>
          Save
        </button>
          {/* {message && <p>{message}</p>}
          {errormessage && <p>{errormessage}</p>} */}
      </form>
    </div>
  </div>
);
}

export default DeviceRegister;


