import React, { useEffect, useState } from 'react'
import { getEnergyMeterDataKwhPersecsByDateRange, getEngergyUsageKwhByDateRange, getEngergyUsageNow } from '../action/device';

function APIData() {

    const [engergyUsageNow,setEngergyUsageNow]=useState(null);
    const [engergyUsagekwhByDateRangeHours,setEngergyUsagekwhByDateRangeHours]=useState(null);
    const [engergyUsagekwhByDateRangeMins,setEngergyUsagekwhByDateRangeMins]=useState(null);
    const [engergyUsagekwhByDateRangeDays,setEngergyUsagekwhByDateRangeDays]=useState(null);
    const [engergyUsagekwhByDateRangeCustom,setEngergyUsagekwhByDateRangeCustom]=useState(null);
    const [engergyUsagekwhByDateRangeMonth,setEngergyUsagekwhByDateRangeMonth]=useState(null);
    const [engergyUsagekwhByDateRangeYear,setEngergyUsagekwhByDateRangeYear]=useState(null);

    const [engergyUsagekwhPersecsByDateRangeHour,setEngergyUsagekwhPersecsByDateRangeHour]=useState(null);
    const [engergyUsagekwhPersecsByDateRangeMin,setEngergyUsagekwhPersecsByDateRangeMin]=useState(null);

const loadChartData=async()=>{
    const payload={
      deviceId:4,
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

  const resultHours=await loadEngergyUsageKwhByDateRange(4,1,"2024-02-20","2024-02-20");
  console.log('EngergyUsagekwhByDateRangeHours',resultHours.data)
  setEngergyUsagekwhByDateRangeHours(resultHours.data.recordsets);

  const resultmins=await loadEngergyUsageKwhByDateRange(4,2,"2024-02-20","2024-02-20");
  console.log('engergyUsagekwhByDateRangeMins',resultmins.data)
  setEngergyUsagekwhByDateRangeMins(resultmins.data.recordsets);


  const resultdays=await loadEngergyUsageKwhByDateRange(4,3,"2024-02-18","2024-02-24");
  console.log('engergyUsagekwhByDateRangeDays',resultdays.data)
  setEngergyUsagekwhByDateRangeDays(resultdays.data.recordsets);

  // const resultCustom=await loadEngergyUsageKwhByDateRange("D-0003",3,"2024-02-01","2024-03-20");
  // console.log('engergyUsagekwhByDateRange Custom',resultCustom.data)
  // setEngergyUsagekwhByDateRangeCustom(resultCustom.data.recordsets);


  const resultMonth=await loadEngergyUsageKwhByDateRange(4,4,"2024-02-01","2024-02-29");
  console.log('engergyUsagekwhByDateRange Month',resultMonth.data)
  setEngergyUsagekwhByDateRangeMonth(resultMonth.data.recordsets);

  // const resultYear=await loadEngergyUsageKwhByDateRange("D-0003",4,"2024-01-01","2024-12-31");
  // console.log('engergyUsagekwhByDateRange Month',resultYear.data)
  // setEngergyUsagekwhByDateRangeYear(resultYear.data.recordsets);

  //  loadEnergyMeterDataKwhPersecsByDateRangeHour();
  //  loadEnergyMeterDataKwhPersecsByDateRangeMin();
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
    <h4>Engergy Usage - Hours</h4>
    {JSON.stringify(engergyUsagekwhByDateRangeHours)}
    <hr/>
    <br/>
    <h4>Engergy Usage - Mins</h4>
    {JSON.stringify(engergyUsagekwhByDateRangeMins)}
    <hr/>
    <br/>
    <h4>Engergy Usage- Days</h4>
    {JSON.stringify(engergyUsagekwhByDateRangeDays)}
    <hr/>
    <br/>

    <h4>Engergy Usage- Month</h4>
    {JSON.stringify(engergyUsagekwhByDateRangeMonth)}
    <hr/>
    <br/>

    {/* <h4>Engergy Usage By Date Range - Year</h4>
    {JSON.stringify(engergyUsagekwhByDateRangeYear)}
    <hr/>
    <br/> */}

    {/* <h4>Engergy Usage By Date Range - Custom</h4>
    {JSON.stringify(engergyUsagekwhByDateRangeCustom)}
    <hr/>
    <br/> */}

    {/* <h4>Engergy Usage kwh/s By DateRange - Hours</h4>
    {JSON.stringify(engergyUsagekwhPersecsByDateRangeHour)}
    <hr/>
    <br/>

    <h4>Engergy Usage kwh/s By DateRange - Mins</h4>
    {JSON.stringify(engergyUsagekwhPersecsByDateRangeMin)}
    <hr/>
    <br/> */}

    </>
  
  )
}

export default APIData