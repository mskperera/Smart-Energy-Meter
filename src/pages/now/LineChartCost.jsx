import React, { useEffect, useState } from 'react';
import './AreaChart.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

function LineChartCost({ device, daysElapsed, numberOfDays, usageBill, budgetedBill, startDate, endDate }) {
  const selectedDevice = useSelector((state) => state.device.selectedDevice);
  const [loading, setLoading] = useState(null);

  const calculateCumulativeValues = (value, days) => {
    const dailyValue = value / days;
    let cumulativeValue = 0;
    return Array.from({ length: days }, (_, index) => {
      cumulativeValue += dailyValue;
      return cumulativeValue;
    });
  };

  const generateLabels = (start, days) => {
    return Array.from({ length: days }, (_, index) => {
      return moment(start).add(index, 'days').format('M-DD');
    });
  };

  const labels = generateLabels(startDate, numberOfDays);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'KvA',
        data: calculateCumulativeValues(budgetedBill, numberOfDays),
        borderColor: '#fff346',
        tension: 0.3,
        backgroundColor: 'rgba(255,243,70)',
        // borderDash: [5, 5],
        fill: true,
      },
      {
        label: 'Kw',
        data: calculateCumulativeValues(usageBill, daysElapsed),
        borderColor: 'rgba(54,162,235, 1)',
        tension: 0.3,
        backgroundColor: 'rgba(54,162,235, 0.5)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
          color: 'gray',
        },
        beginAtZero: true,
        title: {
          position: 'top',
          display: false,
        },
        ticks: {
            color: 'white',
            font: {
              size: 10, 
            },
          },
      },
      y: {
        grid: {
          display: true,
          color: 'Gray',
        },
        beginAtZero: true,
        title: {
          display: true,
          position: 'top',
          text: 'Kw',
          color: 'white',
          font: {
            size: 10,
          },
        },
        ticks: {
            color: 'white',
            font: {
              size: 10, 
            },
          },
      },
    },
    plugins: {
      filler: {
        propagate: false,
      },
      legend: {
        display: true,
        position: 'top',
        align: 'centre',
        labels: {
          color: 'white',
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
        onClick: () =>[]
      },
    },
  };

  return (
    <div className='chart2'>
      {loading ? (
        <div className="spinner-container d-flex align-items-center justify-content-center">
          <ThreeDots color={"#36A2EB"} loading={loading} size={50} />
        </div>
      ) : (
        <Bar data={data} options={options} id='box22' className='chart box22' />
      )}
    </div>
  );
};

export default LineChartCost;
