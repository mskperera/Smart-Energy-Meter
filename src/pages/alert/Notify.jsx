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
    { id: 1, message: "Your bill reached.", time: "2024-04-21T10:30:00", unseen: true },
    // { id: 2, message: "", time: "2024-04-20T15:20:00", unseen: false },
    // { id: 3, message: "", time: "2024-04-22T08:00:00", unseen: true },
    { id: 4, message: "You have exceed Rs.10000.00", time: "2024-04-21T12:45:00", unseen: false },
    // { id: 5, message: "", time: "2024-04-23T09:15:00", unseen: true },
    // { id: 6, message: "", time: "2024-04-24T11:30:00", unseen: true },
    // { id: 7, message: "", time: "2024-04-24T13:45:00", unseen: true },
    // { id: 8, message: "", time: "2024-04-25T16:00:00", unseen: true },
    // { id: 9, message: "", time: "2024-04-25T17:30:00", unseen: true },
    // { id: 10, message: "", time: "2024-04-26T18:45:00", unseen: true },
    { id: 11, message: "Your monthly bill was ready", time: "2024-04-30T20:00:00", unseen: true }
  ]);

  // const [loading,setLoading]=useState(null);
  

  return (
    <div className="home">
      {/* <Navbar className="navnav" /> */}
      <div className="body">
    <div className="rounded ">
    <h2 className="d-flex justify-content-center align-items-center" style={{ color: 'white' }}>
      Notifications
    </h2>
    <div className="notificatoin-container">
          {notifications &&
            notifications.map((device) => (
              <div key={device.id} className={(device.unseen ? 'unseen-notification ' : '') + 'notification-item'}>
              <div className='message'>{device.message}</div>
              <div className='time'>{moment(device.time).format("yyyy-MM-D hh:mm:ss A")}</div>
              {/* <button type='button' className='btn btn-sm btn-danger clear'>Clear</button> */}
              
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