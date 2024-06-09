import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);



const TodayCost = ({days,isSearchLoading,chartFrequencty}) => {

  
  useEffect(()=>{
    loadChartData();
  },[isSearchLoading]);
  
  
    const loadChartData = async () => {
      const labels = [];
      const data = [];
  
      for (const e of days) {
        if(chartFrequencty==="hours"){
          data.push(e.usageBillPerHour);
          labels.push(e.hour);
        }
        else    
         if(chartFrequencty==="days"){
          data.push(e.usageBillPerDay);
          labels.push(e.day);
        }
        else    
        if(chartFrequencty==="months"){
         data.push(e.usageBillPerMonth);
         labels.push(e.month);
       }
      }
  
      const datasets0 = [{
          label: "Cost",
          data: data,
          backgroundColor: "#00ff99",
          borderWidath: 1,
        }];
  
        setChartData({ ...data, labels:labels,  datasets: datasets0 });
    };
  
  
      const [chartData,setChartData]=useState({
          labels:[
      //       '1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h',
      // '19h','20h','21h','22h','23h','24h'
      ],
      
          datasets: [{
              label:'Cost',
              data:[],
              backgroundColor:'#36A2EB',
              borderWidath:1,
          }],
  
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
         <Bar data={chartData} options={options} id='box' className='chart'/>
  )
}

export default TodayCost