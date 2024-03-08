import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getEngergyUsageKwhByDateRange } from '../../action/device';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);


const TodayKw = () => {
    
  useEffect(()=>{
    loadEngergyUsageKwhByDateRange();
  },);

  const getCurrentDateWithoutTime = () => {
    const currentDate = new Date();
    currentDate.setHours(24, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
    return currentDate;
  };

  const loadEngergyUsageKwhByDateRange=async()=>{
    const payload={
        deviceId:"4",
        mesurementUnitId:1,//1-kwh,7-usage bill
        frequencyId:1,
        startDate:getCurrentDateWithoutTime(),
        endDate:getCurrentDateWithoutTime(),
    }
   const result=await getEngergyUsageKwhByDateRange(payload);
   console.log('engergyUsagekwhByDateRange',result.data)
//    setEngergyUsagekwhByDateRange(result.data.recordsets);
  
     
       console.log('getEnergyMeterDataKwhPersecsByDateRange',result.data.recordsets)
     
       const charData=result.data.recordsets[0];
     
    
       const hours=[];
       const dataKwArr=[];
    //    const ruppyArr=[];

       for(let i=0;i<charData.length;i++){
        hours.push(charData[i].hour);
        dataKwArr.push(charData[i].kwhPerHour)
       // ruppyArr.push(charData[i].usageBill)
       }
      
       console.log('lll',hours)
      
      const datasets0=[
        {
        label:'kWh',
        data:dataKwArr,
        backgroundColor:'#00ff99',
        borderWidath:1,
    }
    // {
    //     label:'Rs',
    //     data:[],
    //     backgroundColor:'aqua',
    //     borderWidath:1,
    // }
];

   // const dataSetKw=datasets[0];
    //dataSetKw.data=
      
       setData({...data,labels:hours,datasets:datasets0});
      }


    const [data,setData]=useState({
        labels:['1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h',
    '19h','20h','21h','22h','23h','24h'
    ],
    
        datasets:[
            {
            label:'kWh',
            data:[],
            backgroundColor:'#36A2EB',
            borderWidath:1,
        },
        // {
        //     label:'Rs',
        //     data:[80,50,15,25,35,60,89,98,10,90,70,20,54,75,88,40,77,22,51,33,66,32,47,40],
        //     backgroundColor:'aqua',
        //     borderWidath:1,
        // },
    ]     
    });
    const options={

      scales: {
        x: {
          grid: {
            display:false,
            color: 'Gray', //  color of x-axis grid lines
          },
          beginAtZero: true,
          title:{
            display:true,
            text:"h",
            color:'white'
          },
          ticks: {
            color: 'white', // color of x-axis labels
          },
        },
        y: {
          grid: {
            color: 'Gray', //  color of x-axis grid lines
          },
          beginAtZero: true,
          title:{
            display:true,
            text:"kWh",
            color:'white'
          },
          ticks: {
            color: 'white', //color of y-axis labels
          },
        },
      },
      
      plugins: {
        legend: {
          display:false,
          // labels: {
          //   color: 'white', 
          //   display:false
          // },
        },
        
      },
    }
 return(
     <Bar data={data} options={options} className='chart' id='box'/>
     )
     
    
}

export default TodayKw