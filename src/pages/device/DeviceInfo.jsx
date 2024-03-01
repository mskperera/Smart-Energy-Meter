import React, { useEffect, useState } from 'react'
import BottomNav from '../../components/bottommenu/BottomNav'
import './DeviceInfo.css'
import Navbar from '../../components/navbar/Navbar'
import { getDeviceDetailsByDeviceId } from '../../action/device'
// import { Link } from 'react-router-dom'

const DeviceInfo = () => {


  const [deviceDetails,setDeviceDetails]=useState('');

  useEffect(() => {

    // loadDeviceSettingstData();
    // loadDrpConsumerCategories();
    // loadDrpConsumerSubCategoriesById();
    // loadDrpSupplier();
    // loadDrpSupplyType();
    loadDeviceDetailsByDeviceId();
}, []);

  const loadDeviceDetailsByDeviceId=async()=>{
    const result=await getDeviceDetailsByDeviceId(4);
    setDeviceDetails(result.data);
    console.log('Details',result)
   }



  return (
    <>
    <Navbar/>
    {/* <div className='nav-bar'>
            <ul className='nav-bar-links'>
                <Link to={"/deviceinfo"}><li className='btn btn-sm btn-primary'>Device Info</li></Link> 
                <Link to={"/service"}><li className='btn btn-sm btn-primary'>Service</li></Link>  
                <Link to={"/connection"}><li className='btn btn-sm btn-primary'>Connection</li></Link>
            </ul>
    </div> */}
    <div className='wrapper2 d-flex align-items-center justify-content-center w-100'>
        <div className='deviceinfo'>
           <h2 className='d-flex align-items-center justify-content-center mb-3'>Device Info</h2>
           <div className='form-group mb-2'>
            <label htmlFor='product' className='form-label'>Product</label>
            <input type='text' className='form-control' value={deviceDetails.product} readOnly />
           </div>
           <div className='form-group mb-2'>
            <label htmlFor='version' className='form-label'>Firmware Version</label>
            <input type='text' className='form-control' value={deviceDetails.firmwareVersion} readOnly/>
           </div>
           <div className='form-group mb-2'>
            <label htmlFor='hversion' className='form-label'>Hardware Version</label>
            <input type='text' className='form-control' value={deviceDetails.hardwareVersion} readOnly />
           </div>
           <div className='form-group mb-2'>
            <label htmlFor='serial' className='form-label'>Serial number</label>
            <input type='text' className='form-control' value={deviceDetails.serialNo} readOnly/>
           </div>
           
        </div>
    </div>
    <BottomNav/>
    </>
  )
}

export default DeviceInfo