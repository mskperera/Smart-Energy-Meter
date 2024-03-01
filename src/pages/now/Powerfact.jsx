import React, { useEffect } from 'react'
import { useState } from 'react'
import './Hertz.css'
import { getEngergyUsageNow } from '../../action/device';

const Powerfact = () => {
    const [objPowerFact,setPowerFact] = useState({
        // maxCValue:15,
        // minKwValue:0,
        currentPfValue:0,
        mesurementUnitPf:" ",
        // kwhPerSeconds:0,
      });
    
      // const [engergyUsageNow ,setEngergyUsageNow ] = useState(null);
    
      const [remaningkwvalue,setRemainingKwValue]= useState(null);
    
      useEffect(()=>{
        setRemainingKwValue(objPowerFact.currentPfValue);
      },[objPowerFact]);
    
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
     
       const {pf}=result.data;
      
      
       setPowerFact({...objPowerFact,currentPfValue:pf});
      }

  return (
    <div className='hz'>
        <p>{objPowerFact.currentPfValue} pf</p>
    </div>
  )
}

export default Powerfact