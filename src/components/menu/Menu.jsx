import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
  return (
    <div className='nav-bar'>
            <ul className='nav-bar-links'>
                <Link to={"/home"}><li className='btn  btn-primary'>Now</li></Link> 
                <Link to={"/today"}><li className='btn  btn-primary'>Today</li></Link>  
                <Link to={"/week"}><li className='btn  btn-primary'>Week</li></Link>
                <Link to={"/month"}><li className='btn  btn-primary'>Month</li></Link>
            </ul>
    </div>
  )
}

export default Menu