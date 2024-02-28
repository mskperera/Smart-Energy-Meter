import React from 'react'
//import { BiTachometer } from "react-icons/bi";
import './Navbar.css'
// import { Link } from 'react-router-dom'

const Navbar = () => {
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
         <a href='/profile'>Device Management</a>
      <div/>
         <a href='/profile'>Profile</a>
      <div/>
        <a href='/' >Logout</a>
      </div>
    </div>

    
  )
}

export default Navbar