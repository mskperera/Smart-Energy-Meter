import React from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,LineElement, CategoryScale, LinearScale,PointElement} from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale,PointElement);


function LineChart() {
  // Sample data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Data',
        data: [65, 59, 80, 81, 56, 55, 40], // Sample data points
        fill: true,
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
        borderColor: 'black',
        pointBortderColor: 'aqua',
        tension: 0.5,
        
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    plugins: {
        legend: {
            display: false,
        },
        filler: {
            propagate: true,
            backgroundColor: 'rgba(0, 128, 128, 0.8)',
        }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      
      <Line data={data} options={options} id='' className='chart2'/>
    </div>
  );
}

export default LineChart;
