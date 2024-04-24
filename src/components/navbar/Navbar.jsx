import React, { useEffect, useState } from 'react';
import { MdDevices, MdClose } from "react-icons/md";
import { BiSolidBellRing } from "react-icons/bi";
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../assent/logo-removebg-preview.png';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { CgProfile } from 'react-icons/cg';
import { getDevicesByUserId } from '../../action/device';
// import { GlobalContext } from '../../context/GlobalContext';

const Navbar = ({onChangeDevice}) => {

  const [selectedDevice, setSelectedDevice] = useState(""); 
  const [open, setOpen] = useState(false);
  const [openDevicesName, setOpenDevicesName] = useState(false); 
  const [toggleMenu, setToggleMenu] = useState(false);

  const [deviceNames, setDeviceNames] = useState([]);


  useEffect(() => {
    loadDevicesByUserId();
  }, []); 

  
  
  const loadDevicesByUserId = async (userId) => {
    const userData=JSON.parse(localStorage.getItem('userData'));  
    
    console.log('userData',userData.userId);
    const result = await getDevicesByUserId(userData.userId);
    console.log('deviceDetails', result);
    
    if (result.status === 200) {
      const devices = result.data.map(device => ({ id: device.deviceId, name: device.deviceName }));
      setDeviceNames(devices);
    }
    
  }
  
  const handleDeviceSelect = (device) => {
    const selectedDeviceObject = deviceNames.find(item => item.name === device);
    if (selectedDeviceObject) {
      onChangeDevice(selectedDeviceObject); 
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
        {/* {JSON.stringify(selectedDevice)} */}
      </div>

      <div className='app__navbar-login'>
        <a href='/userlist'>User Management</a>
        <div className='menu-trigger relative'>
          <label>
            <MdDevices onClick={() => setOpenDevicesName(!openDevicesName)} color='#191970' size={25} />
            {selectedDevice && <span className="selected-device-label">{" "+selectedDevice.name}</span>}
          </label>
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
        <a href='/management'>Device Management</a>
        <div className='menu-trigger relative'>
          <CgProfile onClick={() => setOpen(!open)} color='#191970' size={25} />
          {open && (
            <div className='drop'>
              <ul>
                <li><a href='/profile' onClick={() => setOpen(false)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>Profile</a></li>
                <br/>
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
        <div className='bell'>
          <a href='/notify'><BiSolidBellRing color='#191970' size={25} className='overlay__close'/></a>
          <span className="badge">2</span>
        </div>
        <div className='menu-trigger relative devicess'>
          <MdDevices onClick={() => setOpenDevicesName(!openDevicesName)} color='#191970' size={25} className='overlay__close'  />
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
        <div className='app__navbar-smallscreen'>
          <GiHamburgerMenu color='#191970' fontSize={27} className='hammenu' onClick={() => setToggleMenu(true)} />
          {toggleMenu && (
            <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
              <MdClose fontSize={27} className='overlay__close' onClick={() => setToggleMenu(false)} />
              <ul className='app__navbar-smaillscreen-links'>
                <li><a href='/management'>Device Management</a></li>
                <li><a href='/profile'> Profile</a></li>
                <li><a href='/billingsession' onClick={() => setOpen(false)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>Session</a></li>
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
