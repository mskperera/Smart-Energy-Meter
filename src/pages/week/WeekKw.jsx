import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useState } from 'react';
import { getEngergyUsageKwhByDateRange } from '../../action/device';
import moment from 'moment';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

const WeekKw = ({selectedDevice}) => {

 

    useEffect(()=>{
      if(selectedDevice){
        loadEngergyUsageKwhByDateRange(selectedDevice.id);
      }
    },[selectedDevice]);

    const loadEngergyUsageKwhByDateRange=async(deviceId)=>{
    //   const todayUtc = moment(); 
    // const startOfDay = todayUtc.startOf('week').format('YYYY-MM-DD HH:mm:ss');

    // const endOfDay = todayUtc.endOf('week').format('YYYY-MM-DD HH:mm:ss');

     //const utcOffSet= moment().utcOffset();

    // const startOfDayUtc = moment(startOfDay).subtract(utcOffSet,'minutes').format('YYYY-MM-DD HH:mm:ss');
    // const endOfDayUtc = moment(endOfDay).subtract(utcOffSet,'minutes').format('YYYY-MM-DD HH:mm:ss');

    const currentDate = moment.utc();

    const startDate = currentDate.startOf('week').format('YYYY-MM-DD');
    const endDate = currentDate.endOf('week').format('YYYY-MM-DD');

      const utcOffset = moment().utcOffset();
      const startDateUTC = moment.utc(moment(startDate).startOf('week').subtract(utcOffset, 'minutes').format('YYYY-MM-DDTHH:mm:ss'));
      const endDateUTC = moment.utc(moment(endDate).endOf('week').subtract(utcOffset, 'minutes').format('YYYY-MM-DDTHH:mm:ss'));
      
      console.log('startDateUTC:', startDateUTC.format());
      console.log('endDateUTC:', endDateUTC.format());



      
      console.log('78787878',startDate,endDate);
      const payload={
        
          deviceId:deviceId,//"4",
          mesurementUnitId:1,//1-kwh,7-usage bill
          frequencyId:3,
          startDate:startDateUTC.format(),
          endDate:endDateUTC.format(),

      }
       console.log('payload',payload);


      const resultweeks=await getEngergyUsageKwhByDateRange(payload);
      // console.log('engergyUsagekwhByDateRangeWeeks',resultweeks.data)
      // setEngergyUsagekwhByDateRangeWeeks(resultweeks.data.recordsets);
      
       
         const charData=resultweeks.data.recordset;      
         console.log('charData',charData);
         const weeks=[];
         const weekKwArr=[];
      //    const ruppyArr=[];
  
         for(let i=0;i<charData.length;i++){
        
          const utcDate=moment(charData[i].date);
          console.log('utcDate',utcDate)
          weeks.push(moment(charData[i].date).format("ddd DD"));
          weekKwArr.push(charData[i].kwhPerDay)
         // ruppyArr.push(charData[i].usageBill)
         }
         weeks.shift();
         weekKwArr.shift();

         console.log('weeks',weeks);
         console.log('weekKwArr',weekKwArr);
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
          title:{
            display:true,
            text:'Week Days',
            color:'white',
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
            text:'kWh',
            color:'white',
          },
          ticks: {
            color: 'white', //color of y-axis labels
          },
        },
      },
      
      plugins: {
        legend: {
          display:true,
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