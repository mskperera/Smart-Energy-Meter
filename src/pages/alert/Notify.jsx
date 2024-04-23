import React, { useEffect, useState } from 'react'
import './Notify.css'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'
// import { getUsers } from '../../action/user';
import { Link } from 'react-router-dom';
import { deleteDevice, getDevices } from '../../action/device';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';

function Notify() {


  const navigate=useNavigate ();


  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your charging session at Keels Pitakotte has been completed.", time: "2024-04-21T10:30:00", unseen: true },
    { id: 2, message: "You have a new charging request at Spar Thalawathugoda.", time: "2024-04-20T15:20:00", unseen: false },
    { id: 3, message: "Charging station maintenance scheduled at Cargills Food City Nugegoda tomorrow.", time: "2024-04-22T08:00:00", unseen: true },
    { id: 4, message: "A charging station is available nearby at Arpico Supercenter Colombo 05.", time: "2024-04-21T12:45:00", unseen: false },
    { id: 5, message: "Your charging session at Laugfs Supermarket Negombo has been completed.", time: "2024-04-23T09:15:00", unseen: true },
    { id: 6, message: "Charging station maintenance scheduled at Keells Super Rajagiriya next week.", time: "2024-04-24T11:30:00", unseen: true },
    { id: 7, message: "You have a new charging request at Cargills Food City Katubedda.", time: "2024-04-24T13:45:00", unseen: true },
    { id: 8, message: "A charging station is available nearby at Arpico Supercenter Battaramulla.", time: "2024-04-25T16:00:00", unseen: true },
    { id: 9, message: "Your charging session at Spar Kadawatha has been completed.", time: "2024-04-25T17:30:00", unseen: true },
    { id: 10, message: "You have a new charging request at Laugfs Supermarket Wattala.", time: "2024-04-26T18:45:00", unseen: true },
    { id: 11, message: "A charging station is available nearby at Keells Super Kandy City Centre.", time: "2024-04-27T20:00:00", unseen: true }
  ]);

  

  return (
    <div className="home">
      <Navbar className="navnav" />
      <div className="body">
    <div className="rounded ">
    <h2 className="d-flex justify-content-center align-items-center" style={{ color: '' }}>
      Notifications
    </h2>
    <div className="notificatoin-container">
          {notifications &&
            notifications.map((device) => (
              <div key={device.id} className={(device.unseen ? 'unseen-notification ' : '') + 'notification-item'}>
              <div className='message'>{device.message}</div>
              <div className='time'>{moment(device.time).format("yyyy-MM-D hh:mm:ss A")}</div>
              <button type='button' className='btn btn-sm btn-danger clear'>Clear</button>
              
            </div>            
            ))}
  
    </div>
  </div>
</div>

      <BottomNav className="bottombar" />
    </div>
  );
}

export default Notify;