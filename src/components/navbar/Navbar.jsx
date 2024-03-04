import React, { useState } from 'react'
//import { BiTachometer } from "react-icons/bi";
import './Navbar.css'
// import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
// import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { MdClose } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

const Navbar = () => {

  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className='navbar'>
      {/* <div className='icon'>
        <BiTachometer color='white' size={80}/> 
      </div> */}
      <div className='title'>
        <p>Smart Energy Meter</p>
      </div>

      <div className='app__navbar-login'>
         <a href='/userlist'>User Management</a>
      <div/>
         <a href='/management'>Device Management</a>
      <div/>
         <a href='/profile'><CgProfile color='black' size={25}/></a>
      <div/>
         <a href='/' >Logout <MdLogout size={20}/></a>
      </div>


      <div className='app__navbar-smallscreen'>
      <GiHamburgerMenu color='#191970' fontSize={27} className='hammenu' onClick={() => setToggleMenu(true)} />


      {toggleMenu &&(
      <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
        <MdClose  fontSize={27} color='#191970' className='overlay__close' onClick={() => setToggleMenu(false)} />

        <ul className='app__navbar-smaillscreen-links'>
          {/* <li> <a href='/userlist'>User Management</a></li> */}
          <li> <a href='/management'>Device Management</a></li>
          <li> <a href='/profile'><CgProfile color='#191970' size={30}/> Profile</a></li>
          <li> <a href='/'><MdLogout size={30} color='#191970'/>Logout</a></li>
        </ul>
      </div>
      )}

    </div>
    </div>

    
  )
}

export default Navbar