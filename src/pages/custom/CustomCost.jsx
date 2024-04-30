import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getEngergyUsageKwhByDateRange } from '../../action/device';
import moment from 'moment';
import { color } from 'chart.js/helpers';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

const CustomCost = ({selectedDevice,startDate,endDate,isSearchLoading}) => {

    useEffect(()=>{
        loadEngergyUsageKwhByDateRange1();
    },[isSearchLoading]);

    useEffect(()=>{
      loadEngergyUsageKwhByDateRange();
  },[selectedDevice]);

    const loadEngergyUsageKwhByDateRange1=async()=>{

      const utcStartDate = moment.utc(startDate).add(1, 'day').utc().format();
      const utcEndDate = moment.utc(endDate).add(1, 'day').utc().format();
       
         const payload={
             deviceId:selectedDevice.id,//"4",
             // mesurementUnitId:1,//1-kwh,7-usage bill
             frequencyId:3,
             startDate:utcStartDate,
             endDate:utcEndDate,
         }

    const resultMonth=await getEngergyUsageKwhByDateRange(payload);
    console.log('engergyUsagekwhByDateRange Month',resultMonth.data)
    // setEngergyUsagekwhByDateRangeMonth(resultMonth.data.recordsets);

    console.log('getEnergyMeterDataKwhPersecsByDateRange',resultMonth.data);
         
    if (resultMonth.data.recordset) { // Add a check for undefined recordset
      const charData = resultMonth.data.recordset;

      const months = [];
      const monthCostArr = [];

      for (let i = 0; i < charData.length; i++) {
          months.push(charData[i].day);
          monthCostArr.push(charData[i].usageBillPerDay);
      }

      const datasets0 = [
          {
              label: 'Rs',
              data: monthCostArr,
              backgroundColor: '#ff0066',
              borderWidth: 1,
          }
      ];

      setData({ ...data, labels: months, datasets: datasets0 });
  }
}

    // const [data,setData]=useState({
    //     labels:[],
    
    //     datasets:[
    //     //     {
    //     //     label:'kW',
    //     //     data:[18,50,10,25,35,36,89,98,50,90,75,62],
    //     //     backgroundColor:'#36A2EB',
    //     //     borderWidath:1,
    //     // },
    //     {
    //         label:'Rs',
    //         data:[],
    //         backgroundColor:'aqua',
    //         borderWidath:1,
    //     },
    // ]     
    // });


    

  const loadEngergyUsageKwhByDateRange=async()=>{

    const startOfMonth = moment().utc().startOf('month').add('minutes').format('YYYY-MM-DD'); 
    const endOfMonth = moment().utc().endOf('month').add('minutes').format('YYYY-MM-DD');

      const payload={
          deviceId:selectedDevice.id,//"4",
          // mesurementUnitId:1,//1-kwh,7-usage bill
          frequencyId:3,
          // startDate:'2024-03-01',
          // endDate:'2024-03-31',
          startDate: startOfMonth, 
          endDate: endOfMonth,
      }

  const resultMonth=await getEngergyUsageKwhByDateRange(payload);
  console.log('engergyUsagekwhByDateRange Month',resultMonth.data)
  // setEngergyUsagekwhByDateRangeMonth(resultMonth.data.recordsets);

  console.log('getEnergyMeterDataKwhPersecsByDateRange',resultMonth.data);
       
         const charData=resultMonth.data.recordset;
       
      
         const months=[];
         const monthCostArr=[];
      //    const ruppyArr=[];
  
         for(let i=0;i<charData.length;i++){
          months.push(charData[i].day);
          monthCostArr.push(charData[i].usageBillPerDay)
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
              title:{
                display:true,
                text:'Date No',
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
                color:'white'
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
export default CustomCost