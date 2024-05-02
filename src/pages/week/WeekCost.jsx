import React,{useEffect,useState} from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getEngergyUsageKwhByDateRange } from '../../action/device';
import moment from 'moment';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

const WeekCost = ({selectedDevice}) => {

  // const getCurrentWeekDates = () => {
  //   const startOfWeek = moment().utc().startOf('week');
  //   const endOfWeek = moment().utc().endOf('week');

  //   return { startDate: startOfWeek.toDate(), endDate: endOfWeek.toDate() };
  // };

  // const { startDate, endDate } = getCurrentWeekDates();
  
    useEffect(()=>{
        if(selectedDevice){
          loadEngergyUsageKwhByDateRange(selectedDevice.id);
        }
      },[selectedDevice]);
  
      const loadEngergyUsageKwhByDateRange=async(deviceId)=>{
        const currentDate = moment.utc();

        const startDate = currentDate.startOf('week').format('YYYY-MM-DD');
        const endDate = currentDate.endOf('week').format('YYYY-MM-DD');
    
          const utcOffset = moment().utcOffset();
          const startDateUTC = moment.utc(moment(startDate).startOf('week').subtract(utcOffset, 'minutes').format('YYYY-MM-DDTHH:mm:ss'));
          const endDateUTC = moment.utc(moment(endDate).endOf('week').subtract(utcOffset, 'minutes').format('YYYY-MM-DDTHH:mm:ss'));
          
          console.log('startDateUTC:', startDateUTC.format());
          console.log('endDateUTC:', endDateUTC.format());

        const payload={
            deviceId:deviceId,//"4",
            // mesurementUnitId:1,//1-kwh,7-usage bill
            frequencyId:3,
            // startDate:'2024-04-01 12:00',
            // endDate:'2024-04-05 11:59:59',
            startDate:startDateUTC.format(),
            endDate:endDateUTC.format(),
        }
        const resultweeks=await getEngergyUsageKwhByDateRange(payload); 
         
          //  console.log('55555555555',resultweeks);
           
         
           const charData=resultweeks.data.recordset;
         
        
           const weeks=[];
           const weekCostArr=[];
        //    const ruppyArr=[];
    
           for(let i=0;i<charData.length;i++){
            weeks.push(moment(charData[i].date).format("ddd DD"));
            // console.log('daysss154954851649',charData[i].day)
            // weeks.push(moment(charData[i].day).format('D'));
            weekCostArr.push(charData[i].usageBillPerDay)
           // ruppyArr.push(charData[i].usageBill)
           }
          
           weeks.shift();
           weekCostArr.shift();
           
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
            title:{
              display:true,
              text:'Week Days',
              color:'white',
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
              text:'Rs',
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