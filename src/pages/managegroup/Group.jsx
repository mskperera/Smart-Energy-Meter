import React, { useEffect, useState } from 'react'
import './Group.css'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'
import { deleteUser, getUsers } from '../../action/user';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import './AddDeviceModal.jsx';
import AddDeviceModal from './AddDeviceModal.jsx';
import { addDeviceGroup, getDeviceGroupsByUserId } from '../../action/group.js';

import { getDevicesByUserId } from '../../action/device.js';
import { setDropDevices } from '../../state/device/deviceReducer.js';
import { useDispatch, useSelector } from 'react-redux';

function Group() {

  // const [buttonPopup, setButtonPopup] = useState(false);

  const [groupName, setGroupName] = useState('');

  const [groupList, setGroupList] = useState([]); 

  const [device, setDevice] = useState('');

  const [dropDeviceNamesList, setDropDeviceNamesList] = useState([]);

  const [groupListName, setGroupListName] = useState([]);

  // const dispatch=useDispatch();

  const onChangeDeviceHandler=(device)=>{
    setDevice(device);
  }

  const deviceNames=useSelector(state=>state.device.dropDeviceList);
   const defaultSelctedDevie=deviceNames[0]
   useEffect(()=>{
   setDevice(defaultSelctedDevie);
   },[deviceNames])


  useEffect(() => {
    loadDeviceGroupsByUserId();
  }, []);

  useEffect(() => {
    loadDevicesByUserId();
  }, []);


  //load group list
  const loadDeviceGroupsByUserId = async () => {
    const userData=JSON.parse(localStorage.getItem('userData'));
    const result = await getDeviceGroupsByUserId(userData.userId);
    console.log("result group list", result.data);
    
    // const groups = result.data.map(group =>({id: group.groupId, name: group.groupName}));
    setGroupListName(result.data);
    
  }

//load device list to drop down
  const loadDevicesByUserId = async () => {
    const userData=JSON.parse(localStorage.getItem('userData')); 
    console.log('userData',userData.userId);
    const result = await getDevicesByUserId(userData.userId);
    console.log("result device list", result);


      const devices = result.data.map(device => ({ id: device.deviceId, name: device.deviceName }));
      console.log('devices121212121',devices);
      setDropDeviceNamesList(devices);
     
  }


  const onHandleCreateGroup = async(e) => {
    e.preventDefault();
  
    try {
      const payload = {
        name: groupName,
      };
  
      console.log("payload", payload);
  
      
    } catch (error) { 
      console.log("error", error);
    }
  }




  const handleCreateGroup = async(e) => {
    e.preventDefault();

    const res = await addDeviceGroup({name: groupName});
    console.log("res-name", res);
    const newGroupList = [...groupListName];
    newGroupList.unshift({ groupId :res.data.output.groupId, groupName:groupName});
    setGroupListName(newGroupList);
    setGroupName('');
  };

  const onDelete = (index) => {
    const newGroupList = [...groupListName];
    newGroupList.splice(index, 1);
    setGroupListName(newGroupList);
  } 

  

  return (
    <div className='home'>
      <Navbar className='navnav' onChangeDevice={onChangeDeviceHandler}/>
      <div className="body">
        <div className= "rounded p-2 ">
          <h2 className='d-flex justify-content-center align-items-center'>Manage Group</h2>
          <form className='popup-group d-flex justify-content-center align-items-center ' onSubmit={onHandleCreateGroup}>
            <div className='form-group mb-2 d-flex'>
              <label htmlFor="group" className='form-label mr-2 p-2'>Group Name</label>
              <input
                type="text"
                className='form-control mr-2 group-name'
                id="group"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}/>
                &nbsp;
              <button className='btn btn-primary btn-sm' style={{ height: '35px', marginTop:'3px' }} onClick={handleCreateGroup}>Create</button>
            </div>
          </form>
          {/* {JSON.stringify(groupListName)} */}
          <br/>

          <div className='d-flex justify-content-center align-items-center'>
            <div className='group-section'>
              <div className='group-list'>
                <h6 className='d-flex justify-content-center align-items-center' style={{paddingBottom:'32px' }}><u>Group List</u></h6>
                <ul>
    
                {groupListName && groupListName.map((group) => (
                    <div key={group.groupId}>
                      <li>{group.groupName}</li>
                      
                      <button className="btn btn-sm btn-danger button-delete" onClick={()=> onDelete(group.id)}>Delete</button>
                    </div>
                  ))}
                </ul>
              </div>
              <div className='device-list'>
                <h5 className='d-flex justify-content-center align-items-center'>Group 1</h5>
                <select 
                 className='form-control group-device-select'
                    onChange={(e) => setDropDeviceNamesList(e.target.value)}
                    value={deviceNames}>
                    {dropDeviceNamesList.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}  
                </select>
                <button className='btn btn-primary btn-sm add-device-btn'>Add Device</button><br/>
                <h6 className='d-flex justify-content-center align-items-center'><u>Device List</u></h6>
                <ul>
                  {/* <li>Device 1</li>
                  <li>Device 2</li>
                  <li>Device 3</li>
                  <li>Device 4</li> */}
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