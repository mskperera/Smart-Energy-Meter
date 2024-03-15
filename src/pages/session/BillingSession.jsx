import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import BottomNav from '../../components/bottommenu/BottomNav'
import './BillingSession.css'

// import TimePicker from 'react-time-picker';
import ReactDatePicker from 'react-datepicker';



function BillingSession() {

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedTime, setSelectedTime] = useState(null);

  

  return (
    <>
    <Navbar className='navnav'/>
    <div className='body d-flex align-items-center justify-content-center w-100'>
    <div className='notification'>
        <div className='rounded p-2'>
      <h3 className='d-flex align-items-center justify-content-center mb-3'>Billing Session</h3>
        <form className='needs-validation' >
          <h6 className='d-flex align-items-center justify-content-center mb-1'>Enter your bill issue date</h6>

          <div>
            
          </div>

            <div className=''>
              {/* <div className='col-md-6 text-center'> */}
                <div className='form-group mb-1'>
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
              {/* <div className='col-md-6 text-center'>
                <div className='form-group mb-1'>
                  
                </div>
              </div>
            </div> */}

                <div className="form-check">
                    <input type="checkbox"  className="form-check-input" id="check"/>
                    <label className="form-check-label" htmlFor="check">Add manual bill details</label>                                                                       
                </div>




                  <div className='row'>
                    <div className='col text-center'>
                      <div className='form-group mb-1'>
                        <input type='text' className='form-control' id='input1' />
                        <label htmlFor='input1' className='form-label'>Last bill reading</label>
                      </div>
                    </div>
                    <div className='col text-center'>
                      <div className='form-group mb-1'>
                        <input type='text' className='form-control' id='input2' />
                        <label htmlFor='input2' className='form-label'>Current meter reading</label>
                      </div>
                    </div>
                  </div>
                                                                        
                <button type='button' className='btn btn-primary w-100 mt-2'>Save</button>          
           </form>
          </div>
        </div>
      </div>
                                                               
  <BottomNav className="bottombar"/>
    </>
  )
}

export default BillingSession