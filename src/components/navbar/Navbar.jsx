import React, { useEffect, useRef, useState } from 'react';
import { MdDevices, MdClose } from "react-icons/md";
import { BiSolidBellRing } from "react-icons/bi";
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../assent/logo-removebg-preview.png';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { CgProfile } from 'react-icons/cg';
import { getDevicesByUserId } from '../../action/device';
import { useDispatch, useSelector } from 'react-redux';
import { setDropDevices } from '../../state/device/deviceReducer';

// import { GlobalContext } from '../../context/GlobalContext';

const Navbar = ({onChangeDevice}) => {

  // const [selectedDevice, setSelectedDevice] = useState(""); 
  const [selectedDeviceName, setSelectedDeviceName] = useState("")
  const [open, setOpen] = useState(false);
  const [openDevicesName, setOpenDevicesName] = useState(false); 
  const [toggleMenu, setToggleMenu] = useState(false);

  const [deviceNames, setDeviceNames] = useState([]);

const dispatch=useDispatch();

// const dropdownRef = useRef(null);


 const loadDevicesByUserId = async () => {
  const userData=JSON.parse(localStorage.getItem('userData'));  
  
  console.log('userData',userData.userId);
  const result = await getDevicesByUserId(userData.userId);
  console.log('deviceDetails', result);
  
  if (result.status === 200) {
    const devices = result.data.map(device => ({ id: device.deviceId, name: device.deviceName }));
    console.log('devices12123313',devices);
     setDeviceNames(devices);
   dispatch(setDropDevices({dropDeviceList:devices}));
  }
  
}
  useEffect(() => {
    loadDevicesByUserId();
  }, []); 

  


  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setOpenDevicesName(false);
  //       setOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  
  
  // const loadDevicesByUserId = async (userId) => {
  //   const userData=JSON.parse(localStorage.getItem('userData'));  
    
  //   console.log('userData',userData.userId);
  //   const result = await getDevicesByUserId(userData.userId);
  //   console.log('deviceDetails', result);
    
  //   if (result.status === 200) {
  //     const devices = result.data.map(device => ({ id: device.deviceId, name: device.deviceName }));
  //     setDeviceNames(devices);
  //   }
    
  // }
  
  const handleDeviceSelect = (deviceName) => {
    const selectedDeviceObject = deviceNames.find(item => item.name === deviceName);
    if (selectedDeviceObject) {
      onChangeDevice(selectedDeviceObject); 
      localStorage.setItem('selectedDevice',selectedDeviceObject)
      setSelectedDeviceName(deviceName);
      setOpenDevicesName(false);
      setOpen(false);

    }
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
        {/* {JSON.stringify(deviceNames)} */}
      </div>

      <div className='app__navbar-login'>
       
        <div className='menu-trigger relative'>
          <div className="device-label-container">
            <a href='#' onClick={() => setOpenDevicesName(!openDevicesName)}>Device</a>
            {selectedDeviceName && <p className="selected-device-label">{selectedDeviceName}</p>}
          </div>
          {openDevicesName && (
            <div className='drop1'>
              <ul>
                {deviceNames.map((device, index) => (
                  <li key={index} onClick={() => handleDeviceSelect(device.name)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>{device.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <a href='/userlist'>User Management</a>
        <a href='/management'>Device Management</a>
        <div className='menu-trigger relative'>
          <CgProfile onClick={() => setOpen(!open)} color='#191970' size={25} />
          {open && (
            <div className='drop'>
              <ul>
                <li><a href='/profile' onClick={() => setOpen(false)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>Profile</a></li>
                <br/>
                <li><a href='/status' onClick={() => setOpen(false)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>Device Status</a></li>
                <li><a href='/billingsession' onClick={() => setOpen(false)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>Session</a></li>
                <li><a href='/' onClick={() => setOpen(false)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>Logout</a></li>
              </ul>
            </div>
          )}
        </div>
        <div className='bell'>
          <a href='/notify'><BiSolidBellRing color='#191970' size={25} className='overlay__close'/></a>
          <span className="badge1">2</span>
        </div>
      </div>

      <div className='small'>
        <div className='menu-trigger relative devicess'>
          <div className="device-label-container">    
          <a href='#'><MdDevices onClick={() => setOpenDevicesName(!openDevicesName)} color='#191970' size={25} className='overlay__close'  /></a>
          {selectedDeviceName && <p className="selected-device-label">{selectedDeviceName}</p>}
          </div>
          {openDevicesName && (
            <div className='drop1'>
              <ul>
                {deviceNames.map((device, index) => (
                  <li key={index} onClick={() => handleDeviceSelect(device.name)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>{device.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className='bell'>
          <a href='/notify'><BiSolidBellRing color='#191970' size={25} className='overlay__close'/></a>
          <span className="badge">2</span>
        </div>
        <div className='app__navbar-smallscreen'>
          <GiHamburgerMenu color='#191970' fontSize={27} className='hammenu' onClick={() => setToggleMenu(true)} />
          {toggleMenu && (
            <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
              <a href='#'><MdClose fontSize={27} className='overlay__close' onClick={() => setToggleMenu(false)} /></a>
              <ul className='app__navbar-smaillscreen-links'>
                <li><a href='/management'>Device Management</a></li>
                <li><a href='/status'>Device Status</a></li>
                <li><a href='/billingsession'>Session</a></li>
                <li><a href='/profile'> Profile</a></li>
                <li><a href='/'>Logout</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
