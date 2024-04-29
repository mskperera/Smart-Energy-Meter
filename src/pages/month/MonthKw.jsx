import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getEngergyUsageKwhByDateRange } from '../../action/device';
import moment from 'moment';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

const MonthKw = ({selectedDevice}) => {
  

    useEffect(()=>{
        loadEngergyUsageKwhByDateRange();
    },[selectedDevice]);

    const loadEngergyUsageKwhByDateRange=async()=>{
      
      const startOfMonth = moment().utc().startOf('month').add('minutes').format('YYYY-MM-DD'); 
       const endOfMonth = moment().utc().endOf('month').add('minutes').format('YYYY-MM-DD');

       console.log('month Range',startOfMonth,endOfMonth);
        const payload={
            deviceId:selectedDevice.id,//"4",
            // mesurementUnitId:1,//1-kwh,7-usage bill
            frequencyId:3,
            // startDate:'2024-03-01',
            // endDate:'2024-03-31',
            startDate: startOfMonth, 
            endDate: endOfMonth,
        }

        // console.log('payload kwwwww',payload);

    const resultMonth=await getEngergyUsageKwhByDateRange(payload);
    console.log('engergyUsagekwhByDateRange Month',resultMonth.data)
    // setEngergyUsagekwhByDateRangeMonth(resultMonth.data.recordsets);

    console.log('getEnergyMeterDataKwhPersecsByDateRange',resultMonth.data);
         
           const charData=resultMonth.data.recordset;
         
        
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
              label:'kWh',
              data:monthKwArr,
              backgroundColor:'#00ff99',
              borderWidath:1,
            }
          ]
            setData({...data,labels:months,datasets:datasets0})
          }
          
    const [data,setData]=useState({
        labels:[],
    
        datasets:[
            {
            label:'kWh',
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
              grid: {
                display:false,
                color: 'gray', // color of x-axis labels
              },
              title: {
                display: true,
                text: 'Date No',
                color: 'white',
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
              title: {
                display: true,
                text: 'kWh',
                color: 'white',
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
                color: 'white', // color for the chart labels
              },
            },

          },  
    }
 return <Bar data={data} options={options}className='chart' id='box'/>
}
export default MonthKw