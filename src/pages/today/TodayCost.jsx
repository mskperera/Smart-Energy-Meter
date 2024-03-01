import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getEngergyUsageKwhByDateRange } from '../../action/device';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);



const TodayCost = () => {

    useEffect(()=>{
        loadEngergyUsageKwhByDateRange();
      },);
    

      // const getCurrentDateWithoutTime = () => {
      //   const currentDate = new Date();
      //   currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
      //   return currentDate;
      // };

      const loadEngergyUsageKwhByDateRange=async()=>{
        const payload={
            deviceId:"4",
            mesurementUnitId:7,//1-kwh,7-usage bill
            frequencyId:1,
            startDate: "2024-02-20",
            endDate: "2024-02-20",
        }
       const result=await getEngergyUsageKwhByDateRange(payload);
       console.log('engergyUsagekwhByDateRange',result.data)
    //    setEngergyUsagekwhByDateRange(result.data.recordsets);
      
         
           console.log('getEnergyMeterDataKwhPersecsByDateRange',result.data.recordsets)
         
           const charData=result.data.recordsets[0];
         
        
           const ruppys=[];
        //    const dataKwArr=[];
           const ruppyArr=[];
    
           for(let i=0;i<charData.length;i++){
            ruppys.push(charData[i].hour);
            // dataKwArr.push(charData[i].maxKwh)
            ruppyArr.push(charData[i].usageBillPerHour)
           }
          
           console.log('lll',ruppys)
          
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
            backgroundColor:'aqua',
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
                  labels: {
                    color: 'white', 
                  },
                },
              },
        }
     return(
         <Bar data={data} options={options} />
  )
}

export default TodayCost