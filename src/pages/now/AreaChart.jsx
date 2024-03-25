import React from 'react'
import Chart from 'react-apexcharts';
import './AreaChart.css'
import './Home.css'


const AreaChart = () => {
  const options = {
      series: [
        {
          name: 'kWh',
          type: 'area',
          data: [30, 35, 40, 50, 60, 68, 79, 91, 105]
        },
        {
          name: 'Prediction',
          type: 'line',
          data: [40, 50, 60, 70, 80, 90, 100, 110, 120],
          color: 'rgba(255, 99, 71)' 
        }
      ],
      title: {
        text: 'Trending Power Consumption',
        align: 'left',
        style: {
          fontSize: '15px',
          color: 'white',
          fontFamily: 'Trebuchet MS',
        }
      },
      xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labels: {
            style: {
              colors: ['white'],
            },
          },
      },
      yaxis: {
        labels: {
          style: {
            colors: ['white'],
          },
        },
      },
      dataLabels: {
        enabled: false
      },
  };
 


  return (
      <div className="chart2">
          <Chart options={options} series={options.series} type="area" id='box2' width={380} />
      </div>
  );
};

export default AreaChart;

