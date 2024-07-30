import React from 'react'
import './BottomNav.css'
import { Link } from 'react-router-dom'
import { VscGraph } from "react-icons/vsc";
import { LuGauge } from "react-icons/lu";
import { MdDevices } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { BsInfoSquare } from "react-icons/bs";
import { IoSettingsOutline } from 'react-icons/io5';

const BottomNav = () => {
  return (
    <div className='bottom-bar'>
    <ul className='bottom-bar-links'>
        <Link to={"/home"}><li><LuGauge size={25} color='white' title='Live'/></li></Link>
        <Link to={"/today"}><li><VscGraph size={25} color='white' title='Day'/></li></Link>
        <Link to={"/deviceinfo"}><li ><HiMenuAlt2 size={25} color='white' title='Device Info'/></li></Link>
        <Link to={"/service"}><li ><IoSettingsOutline className='tool' size={25} color='white' title='Settings'/></li></Link>
        {/* <span className='tooltip'>Settings</span> */}
    </ul>
   </div> 
   )
}

export default BottomNav



