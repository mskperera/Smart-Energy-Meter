import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getDeviceDetailsByDeviceId, getDevicesByUserId, getEngergyUsageKwhByDateRange } from '../../action/device';
// import { GlobalContext } from '../../context/GlobalContext';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);


const TodayKw = ({selectedDevice}) => {

  // const [deviceIdDetails, setDeviceIdDetails] = useState('');
  
//  const {device,setDevice}=useContext(GlobalContext);
    
  useEffect(()=>{
    if(selectedDevice){

      loadEngergyUsageKwhByDateRange(selectedDevice.id);
    }
    console.log('device context',selectedDevice);

  },[selectedDevice]);



  // const getCurrentDateWithoutTime = () => {
    // return moment().startOf('day').add(24, 'hours').toDate();
  // };

/////
// const loadDevicesByUserId = async (userId) => {
//   const userData=JSON.parse(localStorage.getItem('userData'));  
  
//   console.log('userData',userData.userId);
//     const result = await getDevicesByUserId(userData.userId);
//     console.log('deviceDetails', result);
    
// }
 ////  


  const loadEngergyUsageKwhByDateRange=async(deviceId)=>{
    const todayUtc = moment(); 
    const startOfDay = todayUtc.startOf('day').format('YYYY-MM-DD HH:mm:ss');

    const endOfDay = todayUtc.endOf('day').format('YYYY-MM-DD HH:mm:ss');

    const utcOffSet= moment().utcOffset();

    const startOfDayUtc = moment(startOfDay).subtract(utcOffSet,'minutes').format('YYYY-MM-DD HH:mm:ss');
    const endOfDayUtc = moment(endOfDay).subtract(utcOffSet,'minutes').format('YYYY-MM-DD HH:mm:ss');



    console.log('selectedDevice.deviceId',selectedDevice);

    
    console.log("66666666",startOfDay,endOfDay);
    // date.utcOffset(moment().utcOffset());
console.log('startOfDayUtc',moment().utcOffset());
    // console.log('loadEngergyUsageKwhByDateRange')
    const payload={
        deviceId:deviceId,//"4",
        mesurementUnitId:1,//1-kwh,7-usage bill
        frequencyId:1,
        // startDate:getCurrentDateWithoutTime(),
        // endDate:getCurrentDateWithoutTime(),
        // startDate:"2024-04-06 12:00",
        // endDate:"2024-04-06 11:59:59",
        startDate: startOfDayUtc,
        endDate: endOfDayUtc,
    }
console.log('payload',payload);
    
   const result=await getEngergyUsageKwhByDateRange(payload);
   console.log(' hour ',result.data);
//    setEngergyUsagekwhByDateRange(result.data.recordsets);
  
     
      //  console.log('getEnergyMeterDataKwhPersecsByDateRange',result.data.recordsets)
       
      const charData = result.data.recordset.map(i => {
          return {...i,date:moment(i.date).format('YYYY-MM-DD HH:mm:ss')}
      });
     
      console.log(' chartdata ',charData);
       const hours=[];
       const dataKwArr=[];
    //    const ruppyArr=[];

       for(let i=0;i<charData.length;i++){
        hours.push(moment(charData[i].date).format("HH A"));
        dataKwArr.push(charData[i].kwhPerHour)
        // console.log('kwhPerHour',charData[i].kwhPerHour)
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
            text:"12:00:00am - 11:59:59pm horus",
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
          display:true,
          labels: {
            color: 'white', 
            display:false
          },
        },
        
      },
    }
 return(
     <Bar data={data} options={options} className='chart' id='box'/>
     )
     
    
}

export default TodayKw