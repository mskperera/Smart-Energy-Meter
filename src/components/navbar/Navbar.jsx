import React from 'react'
//import { BiTachometer } from "react-icons/bi";
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      {/* <div className='icon'>
        <BiTachometer color='white' size={80}/> 
      </div> */}
      <div>
        <p className='title'>Smart Energy Meter</p>
      </div>

      <div className='app__navbar-login'>
         <a href='/profile'>Profile</a>
      <div/>
        <a href='/' >Logout</a>
      </div>
    </div>

    
  )
}

export default Navbar