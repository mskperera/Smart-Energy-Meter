import React from 'react'
import './BottomNav.css'
import { Link } from 'react-router-dom'
import { VscGraph } from "react-icons/vsc";
import { LuGauge } from "react-icons/lu";
import { MdDevices } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";


const BottomNav = () => {
  return (
    <div className='bottom-bar'>
    <ul className='bottom-bar-links'>
        <Link to={"/home"}><li><LuGauge size={30} color='black'/></li></Link>
        <Link to={"/today"}><li><VscGraph size={30} color='black'/></li></Link>
        <Link to={"/deviceinfo"}><li ><MdDevices size={30} color='black'/></li></Link>
        <Link to={"/service"}><li ><HiMenuAlt2 className='tool' size={30} color='black'/></li></Link>
        {/* <span className='tooltip'>Settings</span> */}
    </ul>
   </div> 
   )
}

export default BottomNav



