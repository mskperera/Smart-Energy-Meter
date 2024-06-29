import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import moment from 'moment';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TodayKw = ({ days, isSearchLoading, chartFrequencty }) => {

  useEffect(() => {
    loadChartData();
  }, [isSearchLoading]);

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
    //console.log(' e.kwhPerWeek ',days)
    for (const e of days) {
      if (chartFrequencty === "hours") {
        data.push(e.kwhPerHour);
        labels.push(moment(e.date).format('HH'));
      }
      else if (chartFrequencty === "days") {
        data.push(e.kwhPerDay);
        labels.push(moment(e.date).format('DD / MMM'));
      }
      else if (chartFrequencty === "months") {
        data.push(e.kwhPerMonth);
       // console.log('months.find(m => m.number === e.date.month))',months.find(m => m.number === parseInt(e.date.month)))
        labels.push(`${months.find(m => m.number === parseInt(e.date.month)).shortName} / ${e.date.year}`);
      }
      else if (chartFrequencty === "weeks") {
    
        data.push(e.kwhPerWeek);
        labels.push(moment(e.date).format('DD / MMM'));
      }
     // console.log('labelsllll ',labels)
    }

    
    const datasets0 = [{
      label: "kWh",
      data: data,
      backgroundColor: "#fff346",
      // borderColor: "#ff6347",
      // borderWidth: 2,
      borderRadius: 5, 
      // barPercentage: 1, 
      // barThickness: 15, 
    }];

    setChartData({ ...data, labels: labels, datasets: datasets0 });

    const newOptions = {
      scales: {
        x: {
          grid: {
            display: false,
            color: 'Gray',
          },
          beginAtZero: true,
          title: {
            display: true,
            text: getXAxisTitle(chartFrequencty),
            color: 'white'
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
          title: {
            display: true,
            text: "kWh",
            color: 'white'
          },
          ticks: {
            color: 'white',
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'white',
            font: {
              // size: 14, 
              // family: 'Arial', 
            },
            // padding: 20, 
            // boxWidth: 20, 
            usePointStyle: true, 
            pointStyle: 'rectRounded', // Change to desired shape: 'circle', 'rect', 'triangle', 'star', 'line', 'dash', 'cross', 'rectRounded', 'rectRot', 'crossRot'
          },
          onClick: () =>{},
        },
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
  

  
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'kWh',
      data: [],
      backgroundColor: '#36A2EB',
      borderWidth: 1,
    }],
  });

  const [options, setOptions] = useState({
    scales: {
      x: {
        grid: {
          display: false,
          color: 'Gray',
        },
        beginAtZero: true,
        title: {
          display: true,
          text: "Time",
          color: 'white'
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
        title: {
          display: true,
          text: "kWh",
          color: 'white'
        },
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
        },
      },
    },
  });

  return (
    <Bar data={chartData} options={options} id='box' className='chart' />
  );
}

export default TodayKw;
