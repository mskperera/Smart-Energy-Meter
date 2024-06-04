import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getEngergyUsageKwhByDateRange } from '../../action/device';
import moment from 'moment';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);


const YearCost = ({selectedDevice}) => {

//   const getCurrentYearDates = () => {
//     const startOfYear = moment().startOf('year').toDate();
//     const endOfYear = moment().endOf('year').toDate();
//     return { startDate: startOfYear, endDate: endOfYear };
// };


// const { startDate, endDate } = getCurrentYearDates();

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
            mesurementUnitId:7,//1-kwh,7-usage bill
            frequencyId:4,
            // startDate:'2024-01-01',
            // endDate:'2024-12-31',
            startDate: startOfYear,
            endDate:  endOfYear,
        }

    const resultMonth=await getEngergyUsageKwhByDateRange(payload);
    // console.log('engergyUsagekwhByDateRange Month',resultMonth.data)
    // setEngergyUsagekwhByDateRangeMonth(resultMonth.data.recordsets);

    console.log('22222',resultMonth.data)
         
           const charData=resultMonth.data.recordset;
         
        
           const months=[];
           const monthCostArr=[];
        //    const ruppyArr=[];
    
           for(let i=0;i<charData.length;i++){
            months.push(charData[i].month);
            monthCostArr.push(charData[i].usageBill)
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
      // labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
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
              title:{
                display:true,
                text:'Months',
                color: 'white', // color of x-axis labels
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
                text:'Rs',
                color: 'white', // color of x-axis labels
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
 return <Bar data={data} options={options} className='chart' id='box'/>
 
}

export default YearCost