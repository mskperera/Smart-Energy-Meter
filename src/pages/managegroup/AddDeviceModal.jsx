

import React from 'react';
import './AddDeviceModal.css'; 

const AddDeviceModal = (props) => {


  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn btn btn-primary btn-sm' onClick={()=>props.setTrigger(false)}>close</button>
        {props.children}
      </div>
    </div>
  ):"";
}

export default AddDeviceModal;
