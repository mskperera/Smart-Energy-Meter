import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import moment from 'moment';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);



const TodayCost = ({days,isSearchLoading,chartFrequencty}) => {

  
  useEffect(()=>{
    loadChartData();
  },[isSearchLoading]);


  const getXAxisTitle = (frequency) => {
    switch (frequency) {
      case "hours":
        return "Hours";
      case "days":
        return "Days";
      case "months":
        return "Months";
      default:
        return "Time";
    }
  };
  
  
    const loadChartData = async () => {
      const labels = [];
      const data = [];
  
      for (const e of days) {
        if(chartFrequencty === "hours"){
          data.push(e.usageBillPerHour);
          labels.push(moment(e.date).format('HH'));
        }
        else    
         if(chartFrequencty === "days"){
          data.push(e.usageBillPerDay);
          labels.push(moment(e.date).format('DD / MMM'));
        }
        else    
        if(chartFrequencty === "months"){
         data.push(e.usageBillPerMonth);
         moment(e.date).format('MM')
        //  labels.push(e.month);
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        labels.push(monthNames[e.month - 1]);
       }
      }
  
      const datasets0 = [{
          label: "Cost",
          data: data,
          backgroundColor: "#ff0066",
          borderWidath: 1,
        }];
  
        setChartData({ ...data, labels:labels,  datasets: datasets0 });

        const newOptions = {
          scales: {
            x: {
              grid: {
                display: false,
                color: 'Gray',
              },
              beginAtZero: true,
              title:{
                display:true,
                text:getXAxisTitle(chartFrequencty),
                color:'white'
              },
              ticks: {
                color: 'white',
              },
            },
            y: {
              grid: {
                color: 'Gray',
              },
              beginAtZero: true,
              title:{
                display:true,
                text:"Rs",
                color:'white'
              },
              ticks: {
                color: 'white',
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
        };

        setOptions(newOptions);
    };
  
  
      const [chartData,setChartData]=useState({
          labels:[],
          datasets: [{
              label:'Cost',
              data:[],
              backgroundColor:'#36A2EB',
              borderWidath:1,
          }],
  
      });


      const [options,setOptions]=useState({
        scales: {
          x: {
            grid: {
              display: false,
              color: 'Gray',
            },
            beginAtZero: true,
            title:{
              display:true,
              text:"Time",
              color:'white'
            },
            ticks: {
              color: 'white',
            },
          },
          y: {
            grid: {
              color: 'Gray',
            },
            beginAtZero: true,
            title:{
              display:true,
              text:"Rs",
              color:'white'
            },
            ticks: {
              color: 'white',
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
      });


        // const options={

        //     scales: {
              
        //         x: {
        //           grid: {
        //             display:false,
        //             color: 'Gray', //  color of x-axis grid lines
        //           },
        //           beginAtZero: true,
        //           title:{
        //             display:true,
        //             text:"Hours",
        //             color:'white'
        //           },
        //           ticks: {
        //             color: 'white', // color of x-axis labels
        //           },
        //         },
        //         y: {

        //           grid: {
        //             color: 'Gray', //  color of x-axis grid lines
        //           },

        //           beginAtZero: true,
        //           title:{
        //             display:true,
        //             text:"Rs",
        //             color:'white'
        //           },
        //           ticks: {
        //             color: 'white', //color of y-axis labels
        //           },
        //         },
        //       },
              
        //     plugins: {
        //         legend: {
        //           display:true,
        //           labels: {
        //             color: 'white', 
        //           },
        //         },
        //       },
        // }


     return(
         <Bar data={chartData} options={options} id='box' className='chart'/>
  )
}

export default TodayCost