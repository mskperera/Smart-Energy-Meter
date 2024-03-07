import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getEngergyUsageKwhByDateRange } from '../../action/device';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);


const YearCost = () => {

    useEffect(()=>{
        loadEngergyUsageKwhByDateRange();
    });

    const loadEngergyUsageKwhByDateRange=async()=>{
        const payload={
            deviceId:"4",
            // mesurementUnitId:1,//1-kwh,7-usage bill
            frequencyId:4,
            startDate:'2024-02-01',
            endDate:'2024-02-29',
        }

    const resultMonth=await getEngergyUsageKwhByDateRange(payload);
    console.log('engergyUsagekwhByDateRange Month',resultMonth.data)
    // setEngergyUsagekwhByDateRangeMonth(resultMonth.data.recordsets);

    console.log('getEnergyMeterDataKwhPersecsByDateRange',resultMonth.data.recordsets)
         
           const charData=resultMonth.data.recordsets[0];
         
        
           const months=[];
           const monthCostArr=[];
        //    const ruppyArr=[];
    
           for(let i=0;i<charData.length;i++){
            months.push(charData[i].monthName);
            monthCostArr.push(charData[i].usageBillPerMonth)
           // ruppyArr.push(charData[i].usageBill)
           }
          
           const datasets0=[
            {
              label:'Rs',
              data:monthCostArr,
              backgroundColor:'#ff0066',
              borderWidath:1,
            }
          ]
            setData({...data,labels:months,datasets:datasets0})
          }

    const [data,setData]=useState({
        labels:[],
    
        datasets:[
        //     {
        //     label:'kW',
        //     data:[18,50,10,25,35,36,89,98,50,90,75,62],
        //     backgroundColor:'#36A2EB',
        //     borderWidath:1,
        // },
        {
            label:'Rs',
            data:[],
            backgroundColor:'aqua',
            borderWidath:1,
        },
    ]     
    });
    const options={

        scales: {
            x: {
              grid: {
                display:false,
                color: 'gray', // color of x-axis labels
              },
              ticks: {
                color: 'white', // color of x-axis labels
              },
            },
            y: {
              grid: {
                color: 'gray', // color of x-axis labels
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
                color: 'white', // color for the chart labels
              },
            },
          },
    }
 return <Bar data={data} options={options} className='chart'/>
 
}

export default YearCost