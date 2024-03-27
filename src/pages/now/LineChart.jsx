import React from 'react';
import './AreaChart.css';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,LineElement, CategoryScale, LinearScale,PointElement,Filler} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale,PointElement,Filler);


function LineChart() {
  // Sample data for the chart
  const data = {
    labels: ['01', '02', '03', '04', '05', '06', '07','08','09'],
    datasets: [
      {
        label: 'kWh',
        data: [35, 38, 48, 59, 66, 76, 89, 98, 113], // Sample data points
        borderColor: 'rgba(0, 255, 153)',
        pointBortderColor: 'aqua',
        // pointStyle: 'rect',
        tension: 0.3,
        backgroundColor: 'rgba(0, 255, 153, 0.5)',
        fill: true,
        showLine: false,
      },
      {
        label: 'Prediction',
        data: [40, 45, 57, 68, 80, 90, 100, 110, 120], // Sample data points
        borderColor: 'rgba(54, 162, 235)',
        pointBortderColor: 'aqua',
        tension: 0.5,
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        fill: true,
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    scales: {
      x: {
        grid: {
          display:false,
          color: 'white', //  color of x-axis grid lines
        },
        beginAtZero: true,
        // title:{
        //   display:true,
        //   text:"h",
        //   color:'white'
        // },
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
      filler: {
        propagate: false,
      },
        legend: {
            display: true,
            labels: {
                color: 'white',
                border: 'none',
            },
        },
    },
  };

  return (
    <div className='chart2'>
      <Line data={data} options={options} id='box2' />
    </div>
  );
}

export default LineChart;
