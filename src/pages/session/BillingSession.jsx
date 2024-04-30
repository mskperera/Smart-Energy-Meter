import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import BottomNav from '../../components/bottommenu/BottomNav';
import './BillingSession.css';
import ReactDatePicker from 'react-datepicker';
import TimeLine from './TimeLine';

function BillingSession() {
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [selectedTime, setSelectedTime] = useState(new Date()); 

  return (
    <div className='home'>
      <Navbar className='navnav'/>
      <div className='body body2 d-flex align-items-center justify-content-center w-100'>
        <div className='notification2 '>
          <div className='rounded p-2'>
            <h3 className='d-flex align-items-center justify-content-center mb-3'>Billing Session</h3>
            <form className='needs-validation'>
              <h6 className='d-flex align-items-center justify-content-center'>Enter your bill issue date</h6>
              <div className='col text-center'>
                <div className='col-md text-center d-flex align-items-center justify-content-center'>
                  <div className='form-group mb-2'>
                    <ReactDatePicker
                      selected={selectedDate}
                      onChange={date => setSelectedDate(date)}
                      className='form-control'
                      placeholderText='Select date'
                      dateFormat='dd/MM/yyyy; h:mm aa'
                      showTimeSelect
                      timeIntervals={15}
                      timeFormat='HH:mm'
                    />
                  </div>
                </div>
              </div>
              <div>
                <TimeLine/>
              </div>
            </form>
          </div>
        </div>
      </div>
      <BottomNav className="bottombar"/>
    </div>
  );
}

export default BillingSession;
