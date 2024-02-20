import React, { useEffect, useState } from 'react'
import { getEnergyMeterDataKwhPersecsByDateRange, getEngergyUsageKwhByDateRange, getEngergyUsageNow } from '../action/device';

function APIData() {

    const [engergyUsageNow,setEngergyUsageNow]=useState(null);
    const [engergyUsagekwhByDateRangeHours,setEngergyUsagekwhByDateRangeHours]=useState(null);
    const [engergyUsagekwhByDateRangeMins,setEngergyUsagekwhByDateRangeMins]=useState(null);
    const [engergyUsagekwhByDateRangeWeeks,setEngergyUsagekwhByDateRangeWeeks]=useState(null);

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

  const loadEngergyUsageKwhByDateRange=async(deviceId,frequencyId,startDate,endDate)=>{
    const payload={
        deviceId,
        mesurementUnitId:0,
        frequencyId,
        startDate,
        endDate
    }
   const result=await getEngergyUsageKwhByDateRange(payload);
   return result;
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

  const [count,setCount]=useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
      loadChartData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);


const loadData=async()=>{

  const resultHours=await loadEngergyUsageKwhByDateRange("D-0003",1,"2024-02-20","2024-02-20");
  console.log('EngergyUsagekwhByDateRangeHours',resultHours.data)
  setEngergyUsagekwhByDateRangeHours(resultHours.data.recordsets);

  const resultmins=await loadEngergyUsageKwhByDateRange("D-0003",2,"2024-02-20","2024-02-20");
  console.log('engergyUsagekwhByDateRangeMins',resultmins.data)
  setEngergyUsagekwhByDateRangeMins(resultmins.data.recordsets);


  const resultweeks=await loadEngergyUsageKwhByDateRange("D-0003",3,"2024-02-01","2024-02-20");
  console.log('engergyUsagekwhByDateRangeWeeks',resultweeks.data)
  setEngergyUsagekwhByDateRangeWeeks(resultweeks.data.recordsets);


   loadEnergyMeterDataKwhPersecsByDateRangeHour();
   loadEnergyMeterDataKwhPersecsByDateRangeMin();
}

  useEffect( ()=>{
    loadData();

  },[]);

  return (
    <>
    <h4>Engergy Usage Now</h4>
    {JSON.stringify(engergyUsageNow)}
    <hr/>
    <br/>
    <h4>Engergy Usage By Date Range - Hours</h4>
    {JSON.stringify(engergyUsagekwhByDateRangeHours)}
    <hr/>
    <br/>
    <h4>Engergy Usage By Date Range - Mins</h4>
    {JSON.stringify(engergyUsagekwhByDateRangeMins)}
    <hr/>
    <br/>
    <h4>Engergy Usage By Date Range - Weeks</h4>
    {JSON.stringify(engergyUsagekwhByDateRangeWeeks)}
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