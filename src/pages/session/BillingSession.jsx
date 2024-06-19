import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import BottomNav from '../../components/bottommenu/BottomNav';
import './BillingSession.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getbillingSessionByDeviceId, saveBillingSession } from '../../action/billingSession';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { set } from 'date-fns';

function BillingSession() {
  const [selectedDate1, setSelectedDate1] = useState(null); 
  const [selectedDate2, setSelectedDate2] = useState(null); 
  const [units, setUnits] = useState('');
  const [amount, setAmount] = useState('');
  const [billingSession, setBillingSession] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [load, setLoad] = useState(false);
  const [device, setDevice] = useState('');

  const selectedDevice = useSelector((state) => state.device.selectedDevice);
    
  useEffect(() => {
    if (selectedDevice) {
      setDevice(selectedDevice);
    }
  }, [selectedDevice]);

  useEffect(() => {
    if (selectedDevice) {
      const deviceId = selectedDevice.id;
      loadBillingSessionByDeviceId(deviceId);
    }
  }, [selectedDevice]);

  const loadBillingSessionByDeviceId = async (deviceId) => {
    try {
      const res = await getbillingSessionByDeviceId(deviceId);
      console.log("API response:", res.data);
      if (res.data.length > 0) {
        setBillingSession(res.data);
        setSelectedDate1(new Date(res.data[0].startDate));
        setSelectedDate2(new Date(res.data[0].endDate));
      }
    } catch (error) {
      console.error("Error fetching billing session:", error);
    }
    setLoad(!load);
  }

  const saveEditHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        sessionName: "2024-02-15 - 2024-03-12",
        startDate: new Date(selectedDate1).toISOString(), 
        endDate: new Date(selectedDate2).toISOString(), 
        deviceId: selectedDevice.id,
      };
      const res = await saveBillingSession(payload);
      console.log("API:", res);
      const { responseStatus, outputMessage } = res.data;
      if (responseStatus === "failed") {
        setErrorMessage(outputMessage);
        return;
      }
      swal("Updated Successfully", " ", "success").then(() => {
        setLoad(!load);
      });
    } catch (err) {
      console.error("Error saving billing session:", err);
      setErrorMessage("Error saving billing session");
    }
    setIsEditable(false); 
  };

  const handleEditChange = () => {
    setIsEditable(true); 
  };

  return (
    <div className='home'>
      <div className='body w-100'>
        <div className='notification2 '>
          <div className=''>
            <h3 className='d-flex align-items-center justify-content-center mb-3'>Billing Session</h3>
            {billingSession && billingSession.map((session, index) => (
              <div key={`${session.id}-${index}`}>
                <div className='bill-background'>
                  {/* {JSON.stringify(session)} */}
                  <div className='bill-ground text-left'>
                    <div className='col'>
                      <h4>{session.sessionName}</h4>
                      <div className='form-group row mb-1'>
                        <label htmlFor='startdate' className='col-sm-4 col-form-label'>Session Start</label>
                        <div className='col-sm-8 text-left'>    
                          {isEditable ? 
                            <ReactDatePicker
                              selected={selectedDate1} 
                              onChange={(date) => setSelectedDate1(date)} 
                              className='form-control text-left editable'
                              placeholderText='Select date'
                              dateFormat='dd MMM yyyy'
                              showTimeSelect
                            /> : 
                            <input type='text' className='form-control text-center disabled' disabled value={selectedDate1 ? new Date(selectedDate1).toLocaleDateString() : ''}/>
                          }
                        </div>
                      </div>
                      <div className='form-group row mb-1'>
                        <label htmlFor='enddate' className='col-sm-4 col-form-label'>Session End</label>
                        <div className='col-sm-8 text-left'>
                          {isEditable ?
                            <ReactDatePicker
                              selected={selectedDate2} 
                              onChange={(date) => setSelectedDate2(date)} 
                              className='form-control text-left editable'
                              placeholderText='Select date'
                              dateFormat='dd MMM yyyy'
                              showTimeSelect
                            /> :
                            <input type='text' className='form-control text-center disabled' disabled value={selectedDate2 ? new Date(selectedDate2).toLocaleDateString() : ''}/>
                          }
                        </div>
                      </div>
                      
                      <div className='form-group row mb-1'>
                        <label htmlFor='units' className='col-sm-4 col-form-label'>Units kW</label>
                        <div className='col-sm-8'>
                          <input type='text' className={`form-control text-center ${isEditable ? 'editable' : 'disabled'}`} id='units' placeholder='Enter units' disabled={!isEditable} value={session.totalConsumption_Kwh}/>                          
                        </div>
                      </div>
                      <div className='form-group row mb-1'>
                        <label htmlFor='amount' className='col-sm-4 col-form-label'>Bill Amount</label>
                        <div className='col-sm-8'>
                          <input type='text' className={`form-control text-center ${isEditable ? 'editable' : 'disabled'}`} id='amount' placeholder='Enter units' disabled={!isEditable} value={session.totalAmountDue}/>                          
                        </div>
                      </div>
                      {session.isEditable ? (
                        <button type='button' className={`btn btn-sm custom-button btn-${isEditable ? 'success' : 'primary'} w-50 btn-edit`} onClick={isEditable ? saveEditHandler : handleEditChange}>
                          {isEditable ? 'Save' : 'Edit'}
                        </button>
                      ): ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav className="bottombar"/>
    </div>
  );
}

export default BillingSession;
