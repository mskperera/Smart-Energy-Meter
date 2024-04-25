import React, { useState } from 'react'
import './Group.css'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'
import { deleteUser, getUsers } from '../../action/user';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import './AddDeviceModal.jsx';
import AddDeviceModal from './AddDeviceModal.jsx';

function Group() {

  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div className='home'>
      <Navbar className='navnav'/>
      <div className="body">
        <div className= "rounded p-2 ">
          <h2 className='d-flex justify-content-center align-items-center'>Manage Group</h2>
          <div className='popup-group d-flex justify-content-center align-items-center'>
            <div className='form-group mb-2 d-flex'>
              <label htmlFor="group" className='form-label mr-2 p-2'>Group Name</label>
              <input type="text" className='form-control mr-2 group-name' id="group"/>&nbsp;
              <button className='btn btn-primary btn-sm' style={{ height: '35px', marginTop:'3px' }}>Create</button>
            </div>
          </div>
          <br/>

          <div className='d-flex justify-content-center align-items-center'>
            <div className='group-section'>
              <div className='group-list'>
                <h6 className='d-flex justify-content-center align-items-center' style={{paddingBottom:'32px' }}><u>Group List</u></h6>
                <ul>
                  <li>Group 1</li>
                  <li>Group 2</li>
                  <li>Group 3</li>
                  <li>Group 4</li>
                </ul>
              </div>
              <div className='device-list'>
                <h5 className='d-flex justify-content-center align-items-center'>Group 1</h5>
                <select className='form-control group-device-select'>
                  <option value=''>Select Device</option>
                  <option value='Device 1'>Device 1</option>
                  <option value='Device 2'>Device 2</option>
                  <option value='Device 3'>Device 3</option>
                  <option value='Device 4'>Device 4</option>
                </select>
                <button className='btn btn-primary btn-sm add-device-btn'>Add Device</button>
                <h6 className='d-flex justify-content-center align-items-center'><u>Device List</u></h6>
                <ul>
                  <li>Device 1</li>
                  <li>Device 2</li>
                  <li>Device 3</li>
                  <li>Device 4</li>
                </ul>
              </div>
            </div>
          </div>
          <button className='btn btn-primary save-group-btn'>Save</button>
        </div>
      </div>
      <BottomNav className="bottombar"/>
    </div>
  )
}

export default Group