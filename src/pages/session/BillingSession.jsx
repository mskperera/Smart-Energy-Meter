import React, { useEffect, useState } from 'react';
import BottomNav from '../../components/bottommenu/BottomNav';
import './BillingSession.css';
import ReactDatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import { getbillingSessionByDeviceId, saveBillingSession } from '../../action/billingSession';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

function BillingSession() {
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTimes, setSelectedTimes] = useState({});
  const [billingSession, setBillingSession] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [loadData, setLoadData] = useState(false);

  const selectedDevice = useSelector((state) => state.device.selectedDevice);

  useEffect(() => {
    if (selectedDevice) {
      loadBillingSessionByDeviceId(selectedDevice.id);
    }
  }, [selectedDevice]);

  const loadBillingSessionByDeviceId = async (deviceId) => {
    try {
      setLoadData(true);
      const res = await getbillingSessionByDeviceId(deviceId);
      console.log("billing session", res);
      if (res.data.length > 0) {
        const sessions = res.data.reduce((acc, session) => {
          const startDate = new Date(session.startDate);
          const endDate = new Date(session.endDate);
          acc[session.deviceBillingSessionId] = {
            startDate,
            endDate
          };
          setSelectedTimes(prevTimes => ({
            ...prevTimes,
            [session.deviceBillingSessionId]: {
              startTime: startDate.toTimeString().slice(0, 5),
              endTime: endDate.toTimeString().slice(0, 5)
            }
          }));
          return acc;
        }, {});
        setBillingSession(res.data);
        setSelectedDates(sessions);
      }
      setLoadData(false);
    } catch (error) {
      console.error("Error fetching billing session:", error);
      setLoadData(false);
    }
  };

  const saveEditHandler = async (e, sessionId) => {
    e.preventDefault();
    try {
      const startDate = new Date(selectedDates[sessionId].startDate);
      const endDate = new Date(selectedDates[sessionId].endDate);

      const [startHours, startMinutes] = selectedTimes[sessionId].startTime.split(':');
      startDate.setHours(startHours, startMinutes);

      const [endHours, endMinutes] = selectedTimes[sessionId].endTime.split(':');
      endDate.setHours(endHours, endMinutes);

      const payload = {
        sessionName: billingSession.find(session => session.deviceBillingSessionId === sessionId).sessionName,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        deviceId: selectedDevice.id,
        deviceBillingSessionId: sessionId,
        saveType: "U",
      };
      const res = await saveBillingSession(payload);
      console.log("API:", res);
      const { responseStatus, outputMessage } = res.data;
      if (responseStatus === "failed") {
        setErrorMessage(outputMessage);
        return;
      }
      swal("Updated Successfully", " ", "success").then(() => {
        loadBillingSessionByDeviceId(selectedDevice.id);
        setEditingSessionId(null);
      });
    } catch (err) {
      console.error("Error saving billing session:", err);
      setErrorMessage("Error saving billing session");
    }
  };

  const handleDateChange = (date, sessionId, type) => {
    setSelectedDates(prevDates => ({
      ...prevDates,
      [sessionId]: {
        ...prevDates[sessionId],
        [type]: date
      }
    }));
  };

  const handleTimeChange = (time, sessionId, type) => {
    setSelectedTimes(prevTimes => ({
      ...prevTimes,
      [sessionId]: {
        ...prevTimes[sessionId],
        [type]: time
      }
    }));
  };

  const handleEditChange = (sessionId) => {
    setEditingSessionId(sessionId);
  };

  return (
    <div className='home'>
      <div className='body w-100'>
        <div className='notification2 '>
          <div className=''>
            <h3 className='d-flex align-items-center justify-content-center mb-3'>Billing Session</h3>

            {loadData ? (
              <div className="d-flex align-items-center justify-content-center">
                <ThreeDots
                  height={100}
                  width={100}
                  color="#36A2EB"
                  ariaLabel="loading"
                  secondaryColor="#36A2EB"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            ) : (
              <>
                {billingSession && billingSession.map((session, index) => (
                  <div key={`${session.deviceBillingSessionId}-${index}`}>
                    <div className='bill-background'>
                      <div className='bill-ground text-left'>
                        <div className='col'>
                          <h5>{session.sessionName}</h5>
                          <div className='form-group row'>
                            <label htmlFor='startdate' className='col-sm-4 col-form-label'>Session Start</label>
                            <div className='col-sm-8 text-left'>
                              {editingSessionId === session.deviceBillingSessionId ?
                                <>
                                  <ReactDatePicker
                                    selected={selectedDates[session.deviceBillingSessionId]?.startDate}
                                    onChange={(date) => handleDateChange(date, session.deviceBillingSessionId, 'startDate')}
                                    className='form-control text-left editable mb-1'
                                    placeholderText='Select date'
                                    dateFormat='dd MMM yyyy'
                                    style={{height:'30px'}} 
                                  />
                                  <TimePicker
                                    value={selectedTimes[session.deviceBillingSessionId]?.startTime}
                                    onChange={(time) => handleTimeChange(time, session.deviceBillingSessionId, 'startTime')}
                                    disableClock={true}
                                    className='form-control text-left editable mb-1' 
                                    style={{height:'30px'}} 
                                  />
                                </> :
                                <input type='text' style={{height:'30px'}}  className='form-control text-center disabled' disabled value={selectedDates[session.deviceBillingSessionId]?.startDate ? new Date(selectedDates[session.deviceBillingSessionId].startDate).toLocaleString() : ''}/>
                              }
                            </div>
                          </div>
                          <div className='form-group row'>
                            <label htmlFor='enddate' className='col-sm-4 col-form-label'>Session End</label>
                            <div className='col-sm-8 text-left'>
                              {editingSessionId === session.deviceBillingSessionId ?
                                <>
                                  <ReactDatePicker
                                    selected={selectedDates[session.deviceBillingSessionId]?.endDate}
                                    onChange={(date) => handleDateChange(date, session.deviceBillingSessionId, 'endDate')}
                                    className='form-control text-left editable mb-1'
                                    placeholderText='Select date'
                                    dateFormat='dd MMM yyyy'
                                    style={{height:'30px'}} 
                                  />
                                  
                                  <TimePicker
                                    value={selectedTimes[session.deviceBillingSessionId]?.endTime}
                                    onChange={(time) => handleTimeChange(time, session.deviceBillingSessionId, 'endTime')}
                                    disableClock={true}
                                    className='form-control text-left editable mb-1'
                                    style={{height:'30px'}} 
                                  />
                                </> :
                                <input type='text'style={{height:'30px'}}  className='form-control text-center disabled' disabled value={selectedDates[session.deviceBillingSessionId]?.endDate ? new Date(selectedDates[session.deviceBillingSessionId].endDate).toLocaleString() : ''}/>
                              }
                            </div>
                          </div>
                          <div className='form-group row'>
                            <label htmlFor='units' className='col-sm-4 col-form-label'>Units kW</label>
                            <div className='col-sm-8'>
                              <input type='text' style={{height:'30px'}} className={`form-control text-center ${editingSessionId === session.deviceBillingSessionId ? 'editable' : 'disabled'}`} id='units' placeholder='Enter units' disabled={editingSessionId !== session.deviceBillingSessionId} value={session.totalConsumption_Kwh} />
                            </div>
                          </div>
                          <div className='form-group row mb-1'>
                            <label htmlFor='amount' className='col-sm-4 col-form-label'>Bill Amount</label>
                            <div className='col-sm-8'>
                              <input type='text' style={{height:'30px'}}  className={`form-control text-center ${editingSessionId === session.deviceBillingSessionId ? 'editable' : 'disabled'}`} id='amount' placeholder='Enter amount' disabled={editingSessionId !== session.deviceBillingSessionId} value={session.totalAmountDue} />
                            </div>
                          </div>
                          {session.isEditable ? (
                            <div className='d-flex justify-content-end'>
                              <button type='button' style={{ width: '80px', marginRight: '20px' }} className={`btn btn-sm custom-button btn-${editingSessionId === session.deviceBillingSessionId ? 'success' : 'primary'} btn-edit `} onClick={editingSessionId === session.deviceBillingSessionId ? (e) => saveEditHandler(e, session.deviceBillingSessionId) : () => handleEditChange(session.deviceBillingSessionId)}>
                                {editingSessionId === session.deviceBillingSessionId ? 'Save' : 'Edit'}
                              </button>
                            </div>
                          ) : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <BottomNav className="bottombar" />
    </div>
  );
}

export default BillingSession;
