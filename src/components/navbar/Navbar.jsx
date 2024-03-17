import React, { useState } from 'react'
//import { BiTachometer } from "react-icons/bi";
import './Navbar.css'
// import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
// import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { MdClose } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { BiSolidBellRing } from "react-icons/bi";
import logo from '../../assent/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
const [open, setOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className='navbar'>
      <div className='title'>
        <div className='logo'>
          <Link to={'/home'}>
          <img src={logo} alt='logo'/>
          </Link>
        </div>
        <p>Smart Energy Meter</p>
      </div>

      <div className='app__navbar-login'>
         <a href='/userlist'>User Management</a>
      {/* <div/> */}
         <a href='/management'>Device Management</a>
      {/* <div/> */}
      <div className='menu-trigger relative'>
          <CgProfile onClick={()=> setOpen(!open)} color='#191970' size={25}/>
          { open && (
          <div className='drop'>
            <ul>
             <li><a href='/profile' onClick={()=>setOpen(false)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>Profile</a></li> 
             <br/>
             {/* <li><a href='/billingsession' onClick={()=>setOpen(false)} className='p-2 cursor-pointer rounded hover:bg-blue-100'></a></li> */}
             <li><a href='/billingsession' onClick={()=>setOpen(false)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>Session</a></li>
             <li><a href='/' onClick={()=>setOpen(false)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>Logout</a></li>
            </ul>
          </div>
          )}
      </div>

          <a href='/notify'><BiSolidBellRing color='#191970' size={25}/></a>
      {/* <div/> */}
      

      {/* <div/>
          <a href='/' ><MdLogout size={20}/></a> */}
           
         </div>
      

      <div className='small'>
        <div className='bell'>
          <a href='/notify'><BiSolidBellRing color='#191970' size={25}/></a>
        </div>
        <div className='app__navbar-smallscreen'>
        <GiHamburgerMenu color='#191970' fontSize={27} className='hammenu' onClick={() => setToggleMenu(true)} />


        {toggleMenu &&(
        <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
          <MdClose  fontSize={27} color='#191970' className='overlay__close' onClick={() => setToggleMenu(false)} />

          <ul className='app__navbar-smaillscreen-links'>
            {/* <li> <a href='/userlist'>User Management</a></li> */}
            <li> <a href='/management'>Device Management</a></li>
            <li> <a href='/profile'> Profile</a></li>
            <li><a href='/billingsession' onClick={()=>setOpen(false)} className='p-2 cursor-pointer rounded hover:bg-blue-100'>Session</a></li>
            <li> <a href='/'>Logout</a></li>
          </ul>
        </div>
        )}

      </div>
      </div>
    </div>
  );
}


export default Navbar