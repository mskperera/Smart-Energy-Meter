import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useState } from 'react';
import { getEngergyUsageKwhByDateRange } from '../../action/device';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

const WeekKw = () => {

    useEffect(()=>{
      loadEngergyUsageKwhByDateRange();
    },);

    const loadEngergyUsageKwhByDateRange=async()=>{
      const payload={
          deviceId:"4",
          // mesurementUnitId:1,//1-kwh,7-usage bill
          frequencyId:3,
          startDate:'2024-02-18',
          endDate:'2024-02-24',
      }
      const resultweeks=await getEngergyUsageKwhByDateRange(payload);
      // console.log('engergyUsagekwhByDateRangeWeeks',resultweeks.data)
      // setEngergyUsagekwhByDateRangeWeeks(resultweeks.data.recordsets);
    
       
         console.log('getEnergyMeterDataKwhPersecsByDateRange',resultweeks.data.recordsets)
       
         const charData=resultweeks.data.recordsets[0];
       
      
         const weeks=[];
         const weekKwArr=[];
      //    const ruppyArr=[];
  
         for(let i=0;i<charData.length;i++){
          weeks.push(charData[i].dayName);
          weekKwArr.push(charData[i].kwhPerDay)
         // ruppyArr.push(charData[i].usageBill)
         }
        
         const datasets0=[
          {
            label:'kWh',
            data:weekKwArr,
            backgroundColor:'#00ff99',
            borderWidath:1,
          }
        ]
          setData({...data,labels:weeks,datasets:datasets0})
        }

    const [data,setData] = useState({
        labels:['Mon','Tue','Wen','Thu','Fri','Sat','Sun'],
    
        datasets:[
            {
            label:'kWh',
            data:[],
            backgroundColor:'#36A2EB',
            borderWidath:1,
        },
        // {
        //     label:'Rs',
        //     data:[35,70,60,50],
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
          ticks: {
            color: 'white', // color of x-axis labels
          },
        },
        y: {
          grid: {
            color: 'Gray', //  color of x-axis grid lines
          },
          beginAtZero: true,
          ticks: {
            color: 'white', //color of y-axis labels
          },
        },
      },
      
      plugins: {
        legend: {
          display:false,
          labels: {
            color: 'white', 
          },
        },
      },
    }

 return (
   <Bar data={data} options={options} className='chart' id='box'/>
 )
}

export default WeekKw