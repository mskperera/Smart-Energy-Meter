import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getEngergyUsageKwhByDateRange } from '../../action/device';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

const MonthKw = () => {

    useEffect(()=>{
        loadEngergyUsageKwhByDateRange();
    });

    const loadEngergyUsageKwhByDateRange=async()=>{
        const payload={
            deviceId:"4",
            // mesurementUnitId:1,//1-kwh,7-usage bill
            frequencyId:3,
            startDate:'2024-02-01',
            endDate:'2024-02-29',
        }

    const resultMonth=await getEngergyUsageKwhByDateRange(payload);
    console.log('engergyUsagekwhByDateRange Month',resultMonth.data)
    // setEngergyUsagekwhByDateRangeMonth(resultMonth.data.recordsets);

    console.log('getEnergyMeterDataKwhPersecsByDateRange',resultMonth.data.recordsets)
         
           const charData=resultMonth.data.recordsets[0];
         
        
           const months=[];
           const monthKwArr=[];
        //    const ruppyArr=[];
    
           for(let i=0;i<charData.length;i++){
            months.push(charData[i].day);
            monthKwArr.push(charData[i].kwhPerDay)
           // ruppyArr.push(charData[i].usageBill)
           }
          
           const datasets0=[
            {
              label:'kW',
              data:monthKwArr,
              backgroundColor:'#36A2EB',
              borderWidath:1,
            }
          ]
            setData({...data,labels:months,datasets:datasets0})
          }
          
    const [data,setData]=useState({
        labels:[],
    
        datasets:[
            {
            label:'kW',
            data:[],
            backgroundColor:'#36A2EB',
            borderWidath:1,
        },
        // {
        //     label:'Rs',
        //     data:[60,89,98,10,90,70,20,54,75,88,40,10],
        //     backgroundColor:'aqua',
        //     borderWidath:1,
        // },
    ]     
    });
    const options={

        scales: {
            x: {
              ticks: {
                color: 'black', // color of x-axis labels
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: 'black', //color of y-axis labels
              },
            },
          },

        plugins: {
            legend: {
              labels: {
                color: 'black', // color for the chart labels
              },
            },
          },
    }
 return <Bar data={data} options={options}/>
}
export default MonthKw