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
          color: 'red' 
        }
      ],
      title: {
        text: 'Trending Power Consumption',
        align: 'left',
        style: {
          fontSize: '15px',
          color: 'black',
          fontFamily: 'Trebuchet MS',
        }
      },
      xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          labels: {
            style: {
              colors: ['black'],
            },
          },
      },
      yaxis: {
        labels: {
          style: {
            colors: ['black'],
          },
        },
      },
      dataLabels: {
        enabled: false
      }
  };
 


  return (
      <div className="chart2">
          <Chart options={options} series={options.series} type="area" id='box2' width={430} />
      </div>
  );
};

export default AreaChart;

