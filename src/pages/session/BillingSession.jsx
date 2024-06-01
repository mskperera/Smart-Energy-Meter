// import React, { useEffect, useState } from 'react';
// import Navbar from '../../components/navbar/Navbar';
// import BottomNav from '../../components/bottommenu/BottomNav';
// import './BillingSession.css';
// import ReactDatePicker from 'react-datepicker';
// // import TimeLine from './TimeLine';
// import { getbillingSessionByDeviceId, saveBillingSession } from '../../action/billingSession';
// import swal from 'sweetalert';
// import { useSelector } from 'react-redux';
// // import { set } from 'date-fns';

// function BillingSession() {
//   const [selectedDate1, setSelectedDate1] = useState(''); 
//   const [selectedDate2, setSelectedDate2] = useState(''); 
//   // const [selectedTime, setSelectedTime] = useState(new Date());
//   const [units, setUnits] = useState('');
//   const [amount, setAmount] = useState('');
  

//   const [billingSession, setBillingSession] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');

//     const [isEditable, setIsEditable] = useState(false);
//     const [load, setLoad] = useState(false);
    
//     // const [editAmountDue, setEditAmountDue] = useState("");
//     // const [editKwh, setEditKwh] = useState(""); 
//     const [device, setDevice] = useState('');

//     const onChangeDeviceHandler=(device)=>{
//       setDevice(device);
//     }
    
//     const deviceNames=useSelector(state=>state.device.dropDeviceList);
//     const defaultSelctedDevie=deviceNames[0];
    
//     useEffect(()=>{
//     setDevice(defaultSelctedDevie);
//     },[deviceNames])    



//     useEffect(() => {
//       if(device){
//         const deviceId=device || defaultSelctedDevie;
//         loadbillingSessionByDeviceId(deviceId.id);
//       }
//         // loadbillingSessionByDeviceId();
//     }, [device]);

//     const loadbillingSessionByDeviceId = async (deviceId) => {
//         try {
//             const res = await getbillingSessionByDeviceId(deviceId);
//             console.log("API response:", res.data);
//             if (res.data.length > 0) {
//                 setBillingSession(res.data);
//                 setSelectedDate1(res.data[0].startDate);
//                 setSelectedDate2(res.data[0].endDate);
//             }
           
//             // setUnits(sessionDetails.totalConsumption_Kwh);
//             // setAmount(sessionDetails.totalAmountDue);

//         } catch (error) {
//             console.error("Error fetching billing session:", error);
//         }
//         setLoad(!load);
//     }



    

//    /* const handleEditChange = (date,deviceBillingSessionId,index, value) => {
//         console.log("date:", date); 
      
//        const existingSession = [...billingSession];
//       existingSession.map(s=>{
//         if(s.deviceBillingSessionId===deviceBillingSessionId){
//           s.startDate=date;
//         }
//         return s;
//       });

//       existingSession.map(y=>{
//         if(y.deviceBillingSessionId===deviceBillingSessionId){
//           y.endDate=date;
//         }
//         return y;
//       });

//       const updatedBillingSession = [...billingSession];
//         updatedBillingSession[index].totalConsumption_Kwh = value;
//         updatedBillingSession[index].totalAmountDue = value;

//         setBillingSession(updatedBillingSession);
//         setBillingSession(updatedBillingSession);
//         setBillingSession(existingSession);
//         setIsEditable(true); 
//     };*/

//     // const handleEndDateChange = (date,deviceBillingSessionId) => {
//     //     //setSelectedDateEnd(date);
//     //     const existingSession = [...billingSession];
//     //     existingSession.map(y=>{

//     //      if(y.deviceBillingSessionId===deviceBillingSessionId){
//     //        return  y.endDate=date;
//     //      }
//     //     });
//     //    setBillingSession(existingSession);
//     // };

    

//     // const handleKwhChange = (index, value) => {
//     //     const updatedBillingSession = [...billingSession];
//     //     updatedBillingSession[index].totalConsumption_Kwh = value;
//     //     setBillingSession(updatedBillingSession);
//     // };

//     // const handleAmountDueChange = (index, value) => {
//     //     const updatedBillingSession = [...billingSession];
//     //     updatedBillingSession[index].totalAmountDue = value;
//     //     setBillingSession(updatedBillingSession);
//     // };

//     const saveEditHandler = async () => {
//         // e.preventDefault();
//         try {

//             // console.log("session:", session);
//             const payload = {
//                     // deviceBillingSessionId: deviceBillingSessionId,
//                     sessionName: "2024-02-15 - 2024-03-12",
//                     // totalConsumption_Kwh: session.totalConsumption_Kwh,
//                     // totalAmountDue: session.totalAmountDue,
//                     startDate: selectedDate1,
//                     endDate: selectedDate2,
//                     // isTotalConsumption_KwhSelected:session.isTotalConsumption_KwhSelected,
//                     // isTotalAmountDueSelected:session.isTotalAmountDueSelected,
//                     deviceId: device?.id||defaultSelctedDevie?.id,
//             };
            
//             const res = await saveBillingSession(payload);
//             console.log("API:", res);
//             const { responseStatus, outputMessage } = res.data;
//             if (responseStatus === "failed") {

//                 setErrorMessage(outputMessage);
//                 return;
//             }
//             loadbillingSessionByDeviceId();
//             swal("Updated Successfully", " ", "success").then(() => {
                
//             });
//         } catch (err) {
//             console.error("Error saving billing session:", err);
//             setErrorMessage("Error saving billing session");
//         }
//         setIsEditable(false); 
        
//     };


//     const handleEditChange = () => {
//       setIsEditable(true); 
//     };
  
//     // const handleSave = () => {
//     //   setIsEditable(false); 
      
//     // };


//   return (
//     <div className='home'>
//       <Navbar className='navnav' onChangeDevice={onChangeDeviceHandler}/>
//       <div className='body d-flex align-items-center justify-content-center w-100'>
//         <div className='notification2 '>
//           <div className='rounded p-2'>
//             <h3 className='d-flex align-items-center justify-content-center mb-3'>Billing Session</h3>
//             {billingSession && billingSession.map((session) => (
//             <div key={session.id}>
//               {/* <h6 className='d-flex align-items-center justify-content-center'>Enter your bill issue date</h6> */}
//               <div className='bill-background'>
//                 <div className='bill-ground text-left'>
                  
//                     <div className='col'>
//                       <h4>{session.sessionName}</h4>
//                       <div className='form-group row mb-1'>
//                           <label htmlFor='startdate'  className='col-sm-4 col-form-label'>Session Start</label>
//                         <div className='col-sm-8 text-left'>    
//                           {isEditable ? <ReactDatePicker
//                              selected={selectedDate1}
//                              onChange={(date) => setSelectedDate1(date)}
//                              className={`form-control text-left editable `}
//                              placeholderText='Select date'
//                              dateFormat='dd MMM yyyy'
//                              showTimeSelect
//                             //  disabled={!isEditable}
//                             // timeIntervals={15}
//                             // timeFormat='HH:mm'
//                           /> : 
//                           <input type='text' className={`form-control text-center disabled`} disabled value={selectedDate1}/>
//                           }
//                         </div>
//                       </div>
                      
//                       <div className='form-group row mb-1'>
//                           <label htmlFor='enddate' className='col-sm-4 col-form-label'>Session End</label>
//                           <div className='col-sm-8 text-left'>
//                       { isEditable ?
//                           <ReactDatePicker
//                           selected={selectedDate2}
//                           onChange={(date) => setSelectedDate2(date)}
//                           className={`form-control text-left editable`}
//                           placeholderText='Select date'
//                           dateFormat='dd MMM yyyy'
//                           showTimeSelect
//                           // disabled={!isEditable}
//                             // timeIntervals={15}
//                             // timeFormat='HH:mm'
//                           />:
//                           <input type='text' className={`form-control text-center disabled`} disabled value={selectedDate2}/>
//                         }
//                         </div>
//                         </div>
//                         <div className='form-group row mb-1'>
//                           <label htmlFor='units' className='col-sm-4 col-form-label'>Units kW</label>
//                           <div className='col-sm-8'>
//                           <input type='text' className={`form-control text-center ${isEditable ? 'editable' : 'disabled'}`} id='units' placeholder='Enter units' disabled={!isEditable} value={session.totalConsumption_Kwh}/>                          
//                           </div>
//                         </div>
//                         <div className='form-group row mb-1'>
//                           <label htmlFor='amout' className='col-sm-4 col-form-label'>Bill Amount</label>
//                           <div className='col-sm-8'>
//                           <input type='text' className={`form-control text-center ${isEditable ? 'editable' : 'disabled'}`} id='amount' placeholder='Enter units' disabled={!isEditable} value={session.totalAmountDue}/>                          
//                           </div>
//                         </div>
//                         <button type='button' className={`btn btn-sm custom-button btn-${isEditable ? 'success' : 'primary'} w-50 btn-edit`} onClick={isEditable ? saveEditHandler : handleEditChange}>
//                         {isEditable ? 'Save' : 'Edit'}
//                        </button>
//                     </div>
                  
                 
//                 </div>
//               </div>
            
//             </div>))}
//           </div>
//         </div>
//       </div>
//       <BottomNav className="bottombar"/>
//     </div>
//   );
// }

// export default BillingSession;




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
  const [selectedDate1, setSelectedDate1] = useState(''); 
  const [selectedDate2, setSelectedDate2] = useState(''); 
  const [units, setUnits] = useState('');
  const [amount, setAmount] = useState('');
  const [billingSession, setBillingSession] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [load, setLoad] = useState(false);
  const [device, setDevice] = useState('');

  const onChangeDeviceHandler = (device) => {
    setDevice(device);
  }
    
  const deviceNames = useSelector(state => state.device.dropDeviceList);
  const defaultSelectedDevice = deviceNames[0];
    
  useEffect(() => {
    setDevice(defaultSelectedDevice);
  }, [deviceNames]);

  useEffect(() => {
    if (device) {
      const deviceId = device || defaultSelectedDevice;
      loadBillingSessionByDeviceId(deviceId.id);
    }
  }, [device]);

  const loadBillingSessionByDeviceId = async (deviceId) => {
    try {
        const res = await getbillingSessionByDeviceId(deviceId);
        console.log("API response:", res.data);
        if (res.data.length > 0) {
            setBillingSession(res.data);
            setSelectedDate1(new Date(res.data[0].startDate).toISOString()); 
            setSelectedDate2(new Date(res.data[0].endDate).toISOString());   
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
        deviceId: device?.id || defaultSelectedDevice?.id,
      };
      const res = await saveBillingSession(payload);
      console.log("API:", res);
      const { responseStatus, outputMessage } = res.data;
      if (responseStatus === "failed") {
        setErrorMessage(outputMessage);
        return;
      }
      // loadBillingSessionByDeviceId(device?.id || defaultSelectedDevice?.id);
      // swal("Updated Successfully", " ", "success").then(() => { });
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
      <Navbar className='navnav' onChangeDevice={onChangeDeviceHandler}/>
      <div className='body w-100'>
        <div className='notification2 '>
          <div className=''>
            <h3 className='d-flex align-items-center justify-content-center mb-3'>Billing Session</h3>
            {billingSession && billingSession.map((session) => (
              <div key={session.id}>
                <div className='bill-background'>
                  <div className='bill-ground text-left'>
                    <div className='col'>
                      <h4>{session.sessionName}</h4>
                      <div className='form-group row mb-1'>
                        <label htmlFor='startdate' className='col-sm-4 col-form-label'>Session Start</label>
                        <div className='col-sm-8 text-left'>    
                          {isEditable ? 
                            <ReactDatePicker
                              selected={new Date(selectedDate1)} // Convert back to Date object
                              onChange={(date) => setSelectedDate1(date.toISOString())} // Store as UTC string
                              className='form-control text-left editable'
                              placeholderText='Select date'
                              dateFormat='dd MMM yyyy'
                              showTimeSelect
                            /> : 
                            <input type='text' className='form-control text-center disabled' disabled value={new Date(selectedDate1).toLocaleDateString()}/>
                          }
                        </div>
                      </div>
                      <div className='form-group row mb-1'>
                        <label htmlFor='enddate' className='col-sm-4 col-form-label'>Session End</label>
                        <div className='col-sm-8 text-left'>
                          {isEditable ?
                            <ReactDatePicker
                              selected={new Date(selectedDate2)} // Convert back to Date object
                              onChange={(date) => setSelectedDate2(date.toISOString())} // Store as UTC string
                              className='form-control text-left editable'
                              placeholderText='Select date'
                              dateFormat='dd MMM yyyy'
                              showTimeSelect
                            /> :
                            <input type='text' className='form-control text-center disabled' disabled value={new Date(selectedDate2).toLocaleDateString()}/>
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
                      <button type='button' className={`btn btn-sm custom-button btn-${isEditable ? 'success' : 'primary'} w-50 btn-edit`} onClick={isEditable ? saveEditHandler : handleEditChange}>
                        {isEditable ? 'Save' : 'Edit'}
                      </button>
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

