import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getEngergyUsageKwhByDateRange } from '../../action/device';
import moment from 'moment';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

const YearKw = ({selectedDevice}) => {
    
  // const getCurrentYearDates = () => {

    // const currentYear = moment().utc();
    // const startOfYear = currentYear.moment().startOf('year').toDate();
    // const endOfYear = currentYear.moment().endOf('year').toDate();
    // return { startDate: startOfYear, endDate: endOfYear };
// };

// const { startDate, endDate } = getCurrentYearDates();
// const { startDate, endDate } = getCurrentYearDates();

// console.log('year Range',startDate,endDate);

    useEffect(()=>{
       if(selectedDevice){
        loadEngergyUsageKwhByDateRange(selectedDevice.id);
       }
    },[selectedDevice]);

    const loadEngergyUsageKwhByDateRange=async(deviceId)=>{

      const currentYear = moment().utc();
    const startOfYear = currentYear.startOf('year').format('YYYY-MM-DD');
    const endOfYear = currentYear.endOf('year').format('YYYY-MM-DD');

    console.log('year Range',startOfYear,endOfYear);

        const payload={
            deviceId:deviceId, //"4",
            // mesurementUnitId:1,//1-kwh,7-usage bill
            frequencyId:4,
            // startDate:'2024-01-01',
            // endDate:'2024-12-31',
            startDate: startOfYear,
            endDate: endOfYear,
        }

        console.log('payload',payload);

    const resultMonth=await getEngergyUsageKwhByDateRange(payload);
   // console.log('engergyUsagekwhByDateRange Month',resultMonth.data)
    // setEngergyUsagekwhByDateRangeMonth(resultMonth.data.recordsets);

    // console.log('getEnergyMeterDataKwhPersecsByDateRange',resultMonth.data.recordsets)
         
           const charData=resultMonth.data.recordset;
         
        
           const months=[];
           const monthKwArr=[];
        //    const ruppyArr=[];
    
           for(let i=0;i<charData.length;i++){
            months.push(charData[i].month);
            monthKwArr.push(charData[i].maxKwh)
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
                text: 'Months',
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
                color: 'white',//color for the chart labels
              },
            },
          },
    }
 return <Bar data={data} options={options} className='chart' id='box'/>
}

export default YearKw