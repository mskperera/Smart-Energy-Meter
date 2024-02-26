import React from 'react'
import BottomNav from '../../components/bottommenu/BottomNav'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'


function Connection() {
  return (
    <>
    <Navbar/>
    <div className='nav-bar'>
            <ul className='nav-bar-links'>
                {/* <Link to={"/deviceinfo"}><li className='btn btn-sm btn-primary'>Device Info</li></Link>  */}
                <Link to={"/service"}><li className='btn btn-sm btn-primary'>Service</li></Link>  
                <Link to={"/connection"}><li className='btn btn-sm btn-primary'>Connection</li></Link>
            </ul>
    </div>
    <div className='wrapper3 d-flex align-items-center justify-content-center w-100'>
        <div className='service'>
            <h2 className='d-flex align-items-center justify-content-center mb-3'>Device Settings</h2>
            <form className='needs-validation'>
                <div className='form-group mb-2'>
                    <label htmlFor='devicename' className='form-label'>Device Name</label>
                    <input type='text' className='form-control'/>
                </div>

                <div className='form-group mb-2'>
                    <label htmlFor='connection' className='form-label'>Connection</label>
                    <input type='number' className='form-control'/>
                </div>
                
                <button type='submit' className='btn btn-primary w-100 mt-2'>Save</button>
            </form>
        </div>
    </div>
    <BottomNav/>
    </>
  )
}

export default Connection