import React, { useEffect, useState } from 'react'
import { getEnergyMeterDataKwhPersecsByDateRange, getEngergyUsageKwhByDateRange, getEngergyUsageNow } from '../action/device';

function APIData() {

    const [engergyUsageNow,setEngergyUsageNow]=useState(null);
    const [engergyUsagekwhByDateRange,setEngergyUsagekwhByDateRange]=useState(null);
    const [engergyUsagekwhPersecsByDateRangeHour,setEngergyUsagekwhPersecsByDateRangeHour]=useState(null);
    const [engergyUsagekwhPersecsByDateRangeMin,setEngergyUsagekwhPersecsByDateRangeMin]=useState(null);

const loadChartData=async()=>{
    const payload={
      deviceId:"D-0003",
   mesurementUnitId:1
    }
   const result=await getEngergyUsageNow(payload);
   console.log('resultwww',result.data)
   setEngergyUsageNow(result.data);
  }

  const loadEngergyUsageKwhByDateRange=async()=>{
    const payload={
        deviceId:"D-0003",
        mesurementUnitId:2,
        frequencyId:1,
        startDate:"2024-01-21",
        endDate:"2024-12-21"
    }
   const result=await getEngergyUsageKwhByDateRange(payload);
   console.log('engergyUsagekwhByDateRange',result.data)
   setEngergyUsagekwhByDateRange(result.data.recordsets);
  }
  
  const loadEnergyMeterDataKwhPersecsByDateRangeHour=async()=>{
    const payload={
        deviceId:"D-0003",
        mesurementUnitId:2, //  1-kwh, 2-voltage, 3-current, 4-power,5-pf,6-Hertz
        frequencyId:1,//1- hour , 2-minutes
        startDate:"2024-01-21",
        endDate:"2024-12-21"
    }
   const result=await getEnergyMeterDataKwhPersecsByDateRange(payload);
   console.log('getEnergyMeterDataKwhPersecsByDateRange',result.data)
   setEngergyUsagekwhPersecsByDateRangeHour(result.data.recordsets);
  }

  const loadEnergyMeterDataKwhPersecsByDateRangeMin=async()=>{
    const payload={
        deviceId:"D-0003",
        mesurementUnitId:2, //  1-kwh, 2-voltage, 3-current, 4-power,5-pf,6-Hertz
        frequencyId:2,//1- hour , 2-minutes
        startDate:"2024-01-21",
        endDate:"2024-12-21"
    }
   const result=await getEnergyMeterDataKwhPersecsByDateRange(payload);
   console.log('getEnergyMeterDataKwhPersecsByDateRange',result.data)
   setEngergyUsagekwhPersecsByDateRangeMin(result.data.recordsets);
  }


  useEffect(()=>{
    loadChartData();
    loadEngergyUsageKwhByDateRange();
    loadEnergyMeterDataKwhPersecsByDateRangeHour();
    loadEnergyMeterDataKwhPersecsByDateRangeMin();
  },[]);

  return (
    <>
    <h4>Engergy Usage Now</h4>
    {JSON.stringify(engergyUsageNow)}
    <hr/>
    <br/>
    <h4>Engergy Usage kwh By Date Range</h4>
    {JSON.stringify(engergyUsagekwhByDateRange)}
    <hr/>
    <br/>

    <h4>Engergy Usage kwh/s By DateRange - Hours</h4>
    {JSON.stringify(engergyUsagekwhPersecsByDateRangeHour)}
    <hr/>
    <br/>

    <h4>Engergy Usage kwh/s By DateRange - Mins</h4>
    {JSON.stringify(engergyUsagekwhPersecsByDateRangeMin)}
    <hr/>
    <br/>

    </>
  
  )
}

export default APIData