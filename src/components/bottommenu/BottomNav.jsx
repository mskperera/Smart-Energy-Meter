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
        <Link to={"/"}><li><LuGauge size={30}/><br/></li></Link>
        <Link to={"/today"}><li><VscGraph size={30}/><br/></li></Link>
        <Link><li ><MdDevices size={30}/><br/></li></Link>
        <Link><li ><HiMenuAlt2 size={30}/><br/></li></Link>
    </ul>
   </div> 
   )
}

export default BottomNav