import React, { useEffect } from 'react'
import { useState } from 'react'
import './Hertz.css'
import { getEngergyUsageNow } from '../../action/device';

const Hertz = () => {
    const [objHertz,setObjHertz] = useState({
        // maxCValue:15,
        // minKwValue:0,
        currentHzValue:0,
        mesurementUnitKw:"Hz",
        // kwhPerSeconds:0,
      });
    
      // const [engergyUsageNow ,setEngergyUsageNow ] = useState(null);
    
      const [remaningkwvalue,setRemainingKwValue]= useState(null);
    
      useEffect(()=>{
        setRemainingKwValue(objHertz.currentHzValue);
      },[objHertz]);
    
      useEffect(()=>{
        loadChartData();
      },);
    
      const loadChartData=async()=>{
        const payload={
          deviceId:"4",
          mesurementUnitId:6
        }
       const result=await getEngergyUsageNow(payload);
       console.log('resultwww',result.data)
      //  {"kwh":308.02,"deviceTimeStamp":1708324999,"kwhPerSec":0,"deviceTimeStampDate_UTC":"2024-02-19T06:43:19.000Z","kwh_MeasurementValue_max":100,"kwh_MeasurementValue_min":0,"Voltage":233.4}
     
       const {hertz}=result.data;
      
      
       setObjHertz({...objHertz,currentHzValue:hertz});
      }

  return (
    <div className='hz'>
        <p>{objHertz.currentHzValue} :Hz</p>
    </div>
  )
}

export default Hertz