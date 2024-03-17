import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import BottomNav from '../../components/bottommenu/BottomNav'

function Notify() {
  return (
     <div className='home'>
      <Navbar className='navnav'/>
        <div className='body body2 d-flex justify-content-center w-100'>
          Notify
        </div>                                                         
      <BottomNav className="bottombar"/>
     </div>
  )
}

export default Notify
