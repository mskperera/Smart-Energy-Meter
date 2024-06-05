import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getEngergyUsageKwhByDateRange } from '../../action/device';
import moment from 'moment';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);



const TodayCost = ({selectedDevice,startDate,endDate,isSearchLoading}) => {

    useEffect(()=>{
      if(selectedDevice){
        loadEngergyUsageKwhByDateRange1(selectedDevice.id);
      }
      
      },[isSearchLoading,selectedDevice]);


      useEffect(()=>{
        if(selectedDevice){
          loadEngergyUsageKwhByDateRange(selectedDevice.id);
        }
        
        },[selectedDevice]);
    

      // const getCurrentDateWithoutTime = () => {
      //   return moment().startOf('day').add(24, 'hours').toDate();
      // };

      const loadEngergyUsageKwhByDateRange1=async(deviceId)=>{
        // const currentDate = moment().utc(); 
        // const startDate = currentDate.clone().subtract(24, 'hours'); 
        // const endDate = currentDate.clone();
        // const todayUtc = moment(); 
        // const startOfDay = todayUtc.startOf('day').format('YYYY-MM-DD HH:mm:ss');
    
        // const endOfDay = todayUtc.endOf('day').format('YYYY-MM-DD HH:mm:ss');
    
        // const utcOffSet= moment().utcOffset();
    
        // const startOfDayUtc = moment(startOfDay).subtract(utcOffSet,'minutes').format('YYYY-MM-DD HH:mm:ss');
        // const endOfDayUtc = moment(endOfDay).subtract(utcOffSet,'minutes').format('YYYY-MM-DD HH:mm:ss');
    
        const startOfDayUtc = moment.utc(startDate).subtract('minutes').format('YYYY-MM-DD HH:mm:ss');
        const endOfDayUtc = moment.utc(endDate).subtract('minutes').format('YYYY-MM-DD HH:mm:ss');

        const payload={
            deviceId:deviceId,//"4",
            mesurementUnitId:7,//1-kwh,7-usage bill
            frequencyId:1,
            startDate: startOfDayUtc, 
            endDate: endOfDayUtc,
            // startDate:getCurrentDateWithoutTime(),
            // endDate:getCurrentDateWithoutTime(),
            // startDate:"2024-04-06 12:00",
            // endDate:"2024-04-06 11:59:59",
        }
       const result=await getEngergyUsageKwhByDateRange(payload);
       console.log('engergyUsagekwhByDateRange',result.data)
    //    setEngergyUsagekwhByDateRange(result.data.recordsets);
      
  //   const charData = result.data.recordset.map(i => {
  //     return {...i,date:moment(i.date).format('YYYY-MM-DD HH:mm:ss')}
  // });
          //  console.log('getEnergyMeterDataKwhPersecsByDateRange',result.data.recordsets)
    
         if(result.data.recordset){
          const charData = result.data.recordset;
        
           const ruppys=[];
        //    const dataKwArr=[];
           const ruppyArr=[];
    
           for(let i=0;i<charData.length;i++){
           // ruppys.push(charData[i].hour);
            ruppys.push(moment(charData[i].date).format("HH A"));
            // dataKwArr.push(charData[i].maxKwh)
            ruppyArr.push(charData[i].usageBillPerHour)
           }
          
          //  console.log('lll',ruppys)
          
          const datasets0=[
        //     {
        //     label:'kW',
        //     data:dataKwArr,
        //     backgroundColor:'#36A2EB',
        //     borderWidath:1,
        // },
        {
            label:'Rs',
            data:ruppyArr,
            backgroundColor:'#ff0066',
            borderWidath:1,
        }];
    
       // const dataSetKw=datasets[0];
        //dataSetKw.data=
          
           setData({...data,labels:ruppys,datasets:datasets0});
          }
        }


          const loadEngergyUsageKwhByDateRange=async(deviceId)=>{
            // const currentDate = moment().utc(); 
            // const startDate = currentDate.clone().subtract(24, 'hours'); 
            // const endDate = currentDate.clone();
            const todayUtc = moment(); 
            const startOfDay = todayUtc.startOf('day').format('YYYY-MM-DD HH:mm:ss');
        
            const endOfDay = todayUtc.endOf('day').format('YYYY-MM-DD HH:mm:ss');
        
            const utcOffSet= moment().utcOffset();
        
            const startOfDayUtc = moment(startOfDay).subtract(utcOffSet,'minutes').format('YYYY-MM-DD HH:mm:ss');
            const endOfDayUtc = moment(endOfDay).subtract(utcOffSet,'minutes').format('YYYY-MM-DD HH:mm:ss');
        
    
            const payload={
                deviceId:deviceId,//"4",
                mesurementUnitId:7,//1-kwh,7-usage bill
                frequencyId:1,
                startDate: startOfDayUtc, 
                endDate: endOfDayUtc,
                // startDate:getCurrentDateWithoutTime(),
                // endDate:getCurrentDateWithoutTime(),
                // startDate:"2024-04-06 12:00",
                // endDate:"2024-04-06 11:59:59",
            }

            console.log('payload --- 2',payload)
           const result=await getEngergyUsageKwhByDateRange(payload);
           console.log('engergyUsagekwhByDateRange',result.data)
        //    setEngergyUsagekwhByDateRange(result.data.recordsets);
          
        const charData = result.data.recordset.map(i => {
          return {...i,date:moment(i.date).format('YYYY-MM-DD HH:mm:ss')}
      });
              //  console.log('getEnergyMeterDataKwhPersecsByDateRange',result.data.recordsets)
        
             
            
               const ruppys=[];
            //    const dataKwArr=[];
               const ruppyArr=[];
        
               for(let i=0;i<charData.length;i++){
               // ruppys.push(charData[i].hour);
                ruppys.push(moment(charData[i].date).format("HH A"));
                // dataKwArr.push(charData[i].maxKwh)
                ruppyArr.push(charData[i].usageBillPerHour)
               }
              
              //  console.log('lll',ruppys)
              
              const datasets0=[
            //     {
            //     label:'kW',
            //     data:dataKwArr,
            //     backgroundColor:'#36A2EB',
            //     borderWidath:1,
            // },
            {
                label:'Rs',
                data:ruppyArr,
                backgroundColor:'#ff0066',
                borderWidath:1,
            }];
        
           // const dataSetKw=datasets[0];
            //dataSetKw.data=
              
               setData({...data,labels:ruppys,datasets:datasets0});
              }
    
    
        const [data,setData]=useState({
            labels:['1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h',
        '19h','20h','21h','22h','23h','24h'
        ],
        
             datasets:[
            //     {
            //     label:'kW',
            //     data:[18,50,10,25,35,36,89,98,50,90,75,62,54,75,88,45,33,56,44,72,41,31,20,66],
            //     backgroundColor:'#36A2EB',
            //     borderWidath:1,
            // },
            {
                label:'Rs',
                data:[],
                backgroundColor:'aqua',
                borderWidath:1,
            }
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
                    text:"12:00:00am - 11:59:59pm hours",
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
                    text:"Rs",
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
                  },
                },
              },
        }
     return(
         <Bar data={data} options={options} id='box' className='chart'/>
  )
}

export default TodayCost