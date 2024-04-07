import React,{useEffect,useState} from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getEngergyUsageKwhByDateRange } from '../../action/device';
import moment from 'moment';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

const WeekCost = () => {

  const getCurrentWeekDates = () => {
    const startOfWeek = moment().startOf('week'); 
    const endOfWeek = moment().endOf('week'); 

    return { startDate: startOfWeek.toDate(), endDate: endOfWeek.toDate() }; 
  };

  const { startDate, endDate } = getCurrentWeekDates();
  
    useEffect(()=>{
        loadEngergyUsageKwhByDateRange();
      },[]);
  
      const loadEngergyUsageKwhByDateRange=async()=>{
        const payload={
            deviceId:"4",
            // mesurementUnitId:1,//1-kwh,7-usage bill
            frequencyId:3,
            // startDate:'2024-03-25',
            // endDate:'2024-03-31',
            startDate:startDate.toDateString(),
            endDate:endDate.toDateString(),
        }
        const resultweeks=await getEngergyUsageKwhByDateRange(payload);
        console.log('daysss',resultweeks.data);
        // console.log('engergyUsagekwhByDateRangeWeeks',resultweeks.data)
        // setEngergyUsagekwhByDateRangeWeeks(resultweeks.data.recordsets);
      
         
           console.log('55555555555',resultweeks);
         
           const charData=resultweeks.data.recordset;
         
        
           const weeks=[];
           const weekCostArr=[];
        //    const ruppyArr=[];
    
           for(let i=0;i<charData.length;i++){
            weeks.push(charData[i].DayName);
            weekCostArr.push(charData[i].usageBillPerDay)
           // ruppyArr.push(charData[i].usageBill)
           }
          
           const datasets0=[
            {
              label:'Rs',
              data:weekCostArr,
              backgroundColor:'#ff0066',
              borderWidath:1,
            }
          ]
            setData({...data,labels:weeks,datasets:datasets0})
          }
  
      const [data,setData] = useState({
          labels:[],
      
          datasets:[
        //       {
        //       label:'kWh',
        //       data:[],
        //       backgroundColor:'#36A2EB',
        //       borderWidath:1,
        //   },
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
            display:false,
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
export default WeekCost