import React from 'react'
import BottomNav from '../../components/bottommenu/BottomNav'
import './DeviceInfo.css'
import Navbar from '../../components/navbar/Navbar'
// import { Link } from 'react-router-dom'

const DeviceInfo = () => {
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
            <input className='form-control' placeholder=' EC-34u88 –v1' readOnly/>
           </div>
           <div className='form-group mb-2'>
            <label htmlFor='version' className='form-label'>Firmware Version</label>
            <input className='form-control' placeholder=' v1.93.323' readOnly/>
           </div>
           <div className='form-group mb-2'>
            <label htmlFor='hversion' className='form-label'>Hardware Version</label>
            <input className='form-control' placeholder=' 0.1' readOnly/>
           </div>
           <div className='form-group mb-2'>
            <label htmlFor='serial' className='form-label'>Serial number</label>
            <input className='form-control' placeholder=' 0.1' readOnly/>
           </div>
           
        </div>
    </div>
    <BottomNav/>
    </>
  )
}

export default DeviceInfo