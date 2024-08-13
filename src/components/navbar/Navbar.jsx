import React, { useEffect, useRef, useState } from 'react';
import { MdDevices, MdClose } from "react-icons/md";
import { BiSolidBellRing } from "react-icons/bi";
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../assent/logo-1.png';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { CgProfile } from 'react-icons/cg';
import { getDevicesByUserId } from '../../action/device';
import { useDispatch, useSelector } from 'react-redux';
import { setDropDevices,setSelectedDevie } from '../../state/device/deviceReducer';
// import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { logout } from '../../action/userAuth';

// import { GlobalContext } from '../../context/GlobalContext';

const Navbar = () => {

  const userData=JSON.parse(localStorage.getItem('userData'));

  const navigate=useNavigate();
  // const [selectedDevice, setSelectedDevice] = useState(""); 
  const [selectedDeviceName, setSelectedDeviceName] = useState("")
  const [open, setOpen] = useState(false);
  const [openDevicesName, setOpenDevicesName] = useState(false); 
  const [toggleMenu, setToggleMenu] = useState(false);

  const [deviceNames, setDeviceNames] = useState([]);

const dispatch=useDispatch();





 const loadDevicesByUserId = async () => {

  const result = await getDevicesByUserId(userData.userId);
  console.log('deviceDetails', result);
  
  if (result.status === 200) {
    const devices = result.data.map(device => ({ id: device.deviceId, deviceTypeId: device.deviceTypeId, name: device.deviceName }));
    console.log('devices12123313',devices);
     setDeviceNames(devices);
   dispatch(setDropDevices({dropDeviceList:devices}));
   dispatch(setSelectedDevie({ device: devices[0]}));
   setSelectedDeviceName(devices[0]?.name)
  }
  
}
  useEffect(() => {
    loadDevicesByUserId();
  }, []); 

  
  const handleDeviceSelect = (deviceName) => {
    
    const selectedDeviceObject = deviceNames.find(item => item.name === deviceName);
    console.log('handleDeviceSelect',selectedDeviceObject)
    dispatch(setSelectedDevie({device:selectedDeviceObject}));
    if (selectedDeviceObject) {
     // onChangeDevice(selectedDeviceObject); 
      localStorage.setItem('selectedDevice',selectedDeviceObject)
      setSelectedDeviceName(deviceName);
      dispatch(setSelectedDevie({device:selectedDeviceObject}));
      setOpenDevicesName(false);
      setOpen(false);

    }
  };

  // const handleAddDevice = () => {
  //   console.log('Add Device button clicked');
  //   navigate('/setup');
  // };

//   const handleLogoutClick = () => {
//     logout(); 

//     navigate('/');
// };

const handleLogoutClick = () => {
 
  localStorage.removeItem('userData');
  localStorage.removeItem('selectedDevice');

  logout();

  navigate('/', { replace: true });
  window.location.reload();
};

  return (
    <div className='navbar'>
      <div className='title'>
        <div className='logo'>
          <Link to={'/home'}>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <p className='topic'>Smart Energy Meter</p>
        {/* {JSON.stringify(userData)} */}
      </div>

      <div className='app__navbar-login'>
       
      {userData.roleId!==1 && <div className='menu-trigger relative'>
          <div className="device-label-container">
            <button style={{marginLeft:'5px'}}>Device<a href='#' onClick={() => setOpenDevicesName(!openDevicesName)} className='device-list-drop'>
                {openDevicesName ? <IoMdArrowDropup size={25} style={{ marginLeft: '-15px' }} /> : <IoMdArrowDropdown size={25} style={{ marginLeft: '-15px' }} />}
              </a></button>
            {selectedDeviceName && <p className="selected-device-label">{selectedDeviceName}</p>}
          </div>
          {openDevicesName && (
            <div className='drop1'>
              <ul>
                {deviceNames.map((device, index) => (
                  <li key={index} onClick={() => handleDeviceSelect(device.name)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>{device.name}</li>
                ))}
              </ul>
              {/* <button onClick={handleAddDevice} className='p-2 cursor-pointer rounded hover:bg-blue-100'>Add Device</button> */}
            </div>
          )}
        </div>}
       {userData.roleId===1 && <a href='/serviceprofiles' className='nav-icons'>Service Profiles</a>}
       {userData.roleId===1 && <a href='/userlist'className='nav-icons'>User Management</a>}
       {userData.roleId===1 &&  <a href='/management' className='nav-icons'>Device Management</a>}
        <div className='menu-trigger relative'>
          <CgProfile onClick={() => setOpen(!open)} size={25}  className='nav-icons'/>
          {open && (
            <div className='drop'>
              <ul>
                <li><a href='/profile' onClick={() => setOpen(false)} className='p-2 cursor-pointer rounded '>Profile</a></li>
                {/* <br/> */}
                <li><a href='/status' onClick={() => setOpen(false)} className='p-2 cursor-pointer rounded'>Device Status</a></li>
                <li><a href='/billingsession' onClick={() => setOpen(false)} className='p-2 cursor-pointer rounded '>Session</a></li>
                <li><a href='/group' onClick={() => setOpen(false)} className='p-2 cursor-pointer rounded '>Group</a></li>
                <li><a href='#' onClick={handleLogoutClick} className='p-2 cursor-pointer rounded '>Logout</a></li>
              </ul>
            </div>
          )}
        </div>
        <div className='bell'>
          <a href='/notify'><BiSolidBellRing size={25} className='overlay__close nav-icons'/></a>
          <span className="badge1">2</span>
        </div>
      </div>

      <div className='small'>
        <div className='menu-trigger relative devicess'>
          <div className="device-label-container">    
          <a href='#'><MdDevices onClick={() => setOpenDevicesName(!openDevicesName)} size={25} className='overlay__close nav-icons'  /></a>
          {selectedDeviceName && <p className="selected-device-label" style={{color:'white'}}>{selectedDeviceName}</p>}
          </div>
          {openDevicesName && (
            <div className='drop1'>
              <ul>
                {deviceNames.map((device, index) => (
                  <li key={index} onClick={() => handleDeviceSelect(device.name)} className='p-2 cursor-pointer rounded hover:bg-blue-100 drop-device-name'>{device.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className='bell'>
          <a href='/notify'><BiSolidBellRing size={25} className='overlay__close nav-icons'/></a>
          <span className="badge">2</span>
        </div>
        <div className='app__navbar-smallscreen'>
          <GiHamburgerMenu fontSize={27} className='hammenu nav-icons' onClick={() => setToggleMenu(true)} />
          {toggleMenu && (
            <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
              <a href='#'><MdClose fontSize={27} className='overlay__close' onClick={() => setToggleMenu(false)} /></a>
              <ul className='app__navbar-smaillscreen-links'>
                <li><a href='/management'>Device Management</a></li>
                <li><a href='/status'>Device Status</a></li>
                <li><a href='/billingsession'>Session</a></li>
                <li><a href='/group'>Group</a></li>
                <li><a href='/profile'> Profile</a></li>
                <li><a href='#' onClick={handleLogoutClick}>Logout</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;