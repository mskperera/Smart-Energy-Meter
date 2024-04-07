import React, { useEffect, useState } from 'react';
import './TimeLine.css';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { getbillingSessionByDeviceId, saveBillingSession } from '../../action/billingSession';
import swal from 'sweetalert';
import TimelineItem from './TimelineItem';


const TimeLine = () => {
    const [selectedDateStart, setSelectedDateStart] = useState(null);
    const [selectedDateEnd, setSelectedDateEnd] = useState(null);
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
                    totalConsumption_Kwh: session.totalConsumption_Kwh,
                    totalAmountDue: session.totalAmountDue,
                    startDate: session.startDate,
                    endDate: session.endDate,
                    isTotalConsumption_KwhSelected:session.isTotalConsumption_KwhSelected,
                    isTotalAmountDueSelected:session.isTotalAmountDueSelected,
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
        <div>
            {billingSession && billingSession.map((session, index) => (
                <VerticalTimeline key={session.deviceBillingSessionId}>
                  {/* {JSON.stringify(billingSession)} */}
                    <TimelineItem
                        session={session}
                        selectedDateStart={selectedDateStart}
                        selectedDateEnd={selectedDateEnd}   
                        onDateChangeStart={(date) => handleStartDateChange(date,session.deviceBillingSessionId)}
                        onDateChangeEnd={(date) => handleEndDateChange(date,session.deviceBillingSessionId)}
                        onKwhChange={(e) => handleKwhChange(index, e.target.value)}
                        onAmountDueChange={(e) => handleAmountDueChange(index, e.target.value)}
                        saveHandler={saveHandler}
                        errorMessage={errorMessage}
                    />
                </VerticalTimeline>
            ))}
        </div>
    );
};

export default TimeLine;