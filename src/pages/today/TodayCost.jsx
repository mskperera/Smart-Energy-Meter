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
          return "Billing Session";
      case "weeks":
          return "Weeks";
      default:
        return "Time";
    }
  };


  const loadChartData = async () => {
    const labels = [];
    const data = [];
    let totalSum = 0;

    for (const e of days) {
      if(chartFrequencty === "hours"){
        data.push(parseFloat(e.usageBillPerHour).toFixed(1));
        labels.push(moment(e.date).format('HH'));
        totalSum += e.usageBillPerHour;
      }
      else    
       if(chartFrequencty === "days"){
        data.push(parseFloat(e.usageBillPerDay).toFixed(1));
        labels.push(moment(e.date).format('DD / MMM'));
        totalSum += e.usageBillPerDay;
      }
      else if (chartFrequencty === "months") {
        data.push(parseFloat(e.usageBillPerMonth).toFixed(1));
       // console.log('months.find(m => m.number === e.date.month))',months.find(m => m.number === parseInt(e.date.month)))
        labels.push(`${months.find(m => m.number === parseInt(e.date.month)).shortName} / ${e.date.year}`);
        totalSum += e.usageBillPerMonth;
      }
    else if(chartFrequencty === "weeks"){
      data.push(parseFloat(e.usageBillPerWeek).toFixed(1));
      labels.push(moment(e.date).format('DD / MMM'));
      totalSum += e.usageBillPerWeek
   }
     console.log('datammmmm ',data)
    }

    const datasets0 = [{
        label: "Cost",
        data: data,
        backgroundColor: "#4484ff",
        // borderWidth: 1,
        borderRadius: 5,
      }];

      setChartData({ labels:labels,  datasets: datasets0 });

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
              display: false,
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
              usePointStyle: true, 
              pointStyle: 'rectRounded',
            },
            onClick: () =>{},
          },
          title: {
            display: true,
            text: `Total Cost Consumption Rs :${totalSum.toFixed(2)} `,
            color: 'white',
            font: {
              size: 13,
            }
          }
        },
      };

      setOptions(newOptions);
  };
  
  
  const months = [
    { shortName: "Jan", number: 1 },
    { shortName: "Feb", number: 2 },
    { shortName: "Mar", number: 3 },
    { shortName: "Apr", number: 4 },
    { shortName: "May", number: 5 },
    { shortName: "Jun", number: 6 },
    { shortName: "Jul", number: 7 },
    { shortName: "Aug", number: 8 },
    { shortName: "Sep", number: 9 },
    { shortName: "Oct", number: 10 },
    { shortName: "Nov", number: 11 },
    { shortName: "Dec", number: 12 },
  ];
  
  
   
  
  
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
          title: {
            display: true,
            text: 'Total Cost Consumption',
            color: 'white',
            font: {
              size: 13,
            }
          }
        },
      });




     return(
         <Bar data={chartData} options={options} id='box' className='chart'/>
  )
}

export default TodayCost