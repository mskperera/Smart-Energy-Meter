import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import BottomNav from '../../components/bottommenu/BottomNav';
import './BillingSession.css';
import ReactDatePicker from 'react-datepicker';
import TimeLine from './TimeLine';
import { getbillingSessionByDeviceId, saveBillingSession } from '../../action/billingSession';
import swal from 'sweetalert';

function BillingSession() {
  const [selectedDate1, setSelectedDate1] = useState(new Date()); 
  const [selectedDate2, setSelectedDate2] = useState(new Date()); 
  const [selectedTime, setSelectedTime] = useState(new Date());
  
  

  const [billingSession, setBillingSession] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    
    // const [editAmountDue, setEditAmountDue] = useState("");
    // const [editKwh, setEditKwh] = useState(""); 
    

    useEffect(() => {
        loadbillingSessionByDeviceId();
    }, []);

    const loadbillingSessionByDeviceId = async () => {
        try {
            const res = await getbillingSessionByDeviceId(4);
            console.log("API response:", res.data);
            if (res.data.length > 0) {
                setBillingSession(res.data);
            }
        } catch (error) {
            console.error("Error fetching billing session:", error);
        }
    }

    const handleStartDateChange = (date,deviceBillingSessionId) => {
        console.log("date:", date); 
       // setSelectedDateStart(date);
       const existingSession = [...billingSession];
       existingSession.map(s=>{

        if(s.deviceBillingSessionId===deviceBillingSessionId){
          return  s.startDate=date;
        }
       });
        setBillingSession(existingSession);
       
    };

    const handleEndDateChange = (date,deviceBillingSessionId) => {
        //setSelectedDateEnd(date);
        const existingSession = [...billingSession];
        existingSession.map(y=>{

         if(y.deviceBillingSessionId===deviceBillingSessionId){
           return  y.endDate=date;
         }
        });
       setBillingSession(existingSession);
    };

    

    const handleKwhChange = (index, value) => {
        const updatedBillingSession = [...billingSession];
        updatedBillingSession[index].totalConsumption_Kwh = value;
        setBillingSession(updatedBillingSession);
    };

    const handleAmountDueChange = (index, value) => {
        const updatedBillingSession = [...billingSession];
        updatedBillingSession[index].totalAmountDue = value;
        setBillingSession(updatedBillingSession);
    };

    const saveHandler = async (e,session) => {
        e.preventDefault();
        try {

            console.log("session:", session);
            const payload = {
                    // deviceBillingSessionId: deviceBillingSessionId,
                    sessionName: "2024-02-15 - 2024-03-12",
                    // totalConsumption_Kwh: session.totalConsumption_Kwh,
                    // totalAmountDue: session.totalAmountDue,
                    startDate: session.startDate,
                    endDate: session.endDate,
                    // isTotalConsumption_KwhSelected:session.isTotalConsumption_KwhSelected,
                    // isTotalAmountDueSelected:session.isTotalAmountDueSelected,
                    deviceId: 4,
            };
            
            const res = await saveBillingSession(payload);
            console.log("API:", res);
            const { responseStatus, outputMessage } = res.data;
            if (responseStatus === "failed") {

                setErrorMessage(outputMessage);
                return;
            }
            loadbillingSessionByDeviceId();
            swal("Updated Successfully", " ", "success").then(() => {
                
            });
        } catch (err) {
            console.error("Error saving billing session:", err);
            setErrorMessage("Error saving billing session");
        }
    };


  return (
    <div className='home'>
      <Navbar className='navnav'/>
      <div className='body d-flex align-items-center justify-content-center w-100'>
        <div className='notification2 '>
          <div className='rounded p-2'>
            <h3 className='d-flex align-items-center justify-content-center mb-3'>Billing Session</h3>
            {billingSession && billingSession.map((session, index) => (
            <div key={session.id}>
              {/* <h6 className='d-flex align-items-center justify-content-center'>Enter your bill issue date</h6> */}
              <div className='bill-background'>
                <div className='bill-ground'>
                  
                    <div className='col'>
                      <h4>Session name</h4>
                      <div className='form-group row mb-1'>
                          <label htmlFor='startdate'  className='col-sm-4 col-form-label'>Session Start</label>
                        <div className='col-sm-8 text-right'>
                          <ReactDatePicker
                            selected={selectedDate1}
                            onChange={date => setSelectedDate1(date)}
                            className='form-control'
                            placeholderText='Select date'
                            dateFormat='dd/MM/yyyy; h:mm aa'
                            showTimeSelect
                            timeIntervals={15}
                            timeFormat='HH:mm'
                          />
                        </div>
                      </div>
                      <div className='form-group row mb-1'>
                          <label htmlFor='enddate' className='col-sm-4 col-form-label'>Session End</label>
                          <div className='col-sm-8 text-right'>
                          <ReactDatePicker
                            selected={selectedDate2}
                            onChange={date => setSelectedDate2(date)}
                            className='form-control'
                            placeholderText='Select date'
                            dateFormat='dd/MM/yyyy; h:mm aa'
                            showTimeSelect
                            timeIntervals={15}
                            timeFormat='HH:mm'
                          />
                        </div>
                        </div>
                        <div className='form-group row mb-1'>
                          <label htmlFor='units' className='col-sm-4 col-form-label'>Units kW</label>
                          <div className='col-sm-8'>
                            <input type='text' className='form-control' id='units' placeholder='Enter units'/>
                          </div>
                        </div>
                        <div className='form-group row mb-1'>
                          <label htmlFor='amout' className='col-sm-4 col-form-label'>Bill Amount</label>
                          <div className='col-sm-8'>
                            <input type='text' className='form-control' id='amount' placeholder='Enter units'/>
                          </div>
                        </div>
                        <button type='submit' className='btn btn-sm btn-primary w-50 btn-edit'>Edit</button>
                    </div>
                  
                 
                </div>
              </div>
            
            </div>))}
          </div>
        </div>
      </div>
      <BottomNav className="bottombar"/>
    </div>
  );
}

export default BillingSession;
