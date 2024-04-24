import React, { useEffect, useState } from 'react';
import './AreaChart.css';
import { Line,Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler, BarController, BarElement } from 'chart.js';
import moment from 'moment';
import {  getEngergyUsageKwhByDateRangePrediction } from '../../action/device';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, BarController, BarElement);

function LineChart({ selectedDevice}) {

  useEffect(() => {
    loadEngergyUsageKwhByDateRangePrediction();
  }, [selectedDevice]);

  const loadEngergyUsageKwhByDateRangePrediction = async () => {
    const currentYear = moment().utc();
    const startOfYear = currentYear.startOf('year').format('YYYY-MM-DD HH:mm:ss');
    const endOfYear = currentYear.endOf('year').format('YYYY-MM-DD HH:mm:ss');

    const payload = {
      deviceId:selectedDevice.id,// "4",
      frequencyId:3,
      // measurementUnitId: 0,
      startDate:"2024-04-01 18:30",// startOfYear,
      endDate:"2024-04-30 18:30",// endOfYear,
    }

    const resultMonth = await getEngergyUsageKwhByDateRangePrediction(payload);
    console.log('1 Month', resultMonth.data)

    const charData = resultMonth.data.recordset;
    const months = [];
    const monthKwArr = [];
    const predictArr = [];

    for (let i = 0; i < charData.length; i++) {
      months.push(charData[i].day);
      monthKwArr.push(charData[i].kwhPerDay);
      predictArr.push(charData[i].predictedKwhPerDay);
      // predictArr.push(charData[i].predictedKwhPerMonth);
    }

    // for (let i = 0; i < charData.length; i++) {
    //   months.push(charData[i].month);
    //   // monthKwArr.push(charData[i].kwhPerMonth);
      
    // }

    const datasets0 = [
      {
        label: 'kWh',
        data: monthKwArr,
        borderColor: 'rgba(0, 255, 153)',
        pointBortderColor: 'aqua',
        tension: 0.5,
        backgroundColor: 'rgba(0, 255, 153, 0.5)',
        fill: true,
        showLine: false,
      },
      {
        label: 'Prediction',
        data: predictArr,
        borderColor: 'rgba(54,162,235)',
        pointBortderColor: 'aqua',
        tension: 0.4,
        // backgroundColor: 'black',
        backgroundColor: 'rgba(54,162,235, 0.3)',
        fill: true,
      },
      {
        label: 'Bar Data',
        data: [10, 20, 30, 40, 50], // Sample data for the bar graph
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        type: 'bar', // Set the type to 'bar' for bar graph
      }
    ];

    setData({ ...data, labels: months, datasets: datasets0 });
  }

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: ['kWh', 'Prediction'],
        data: [],
      }
      
    ],
  });

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
          color: 'white', //  color-x-axis grid lines
        },
        beginAtZero: true,
        title: {
          position: 'top',
          display: true,
          text: "Month",
          // text: "Trending To:",
          // font: {
          //   size: 20
          // },
          color: 'white'
        },
        ticks: {
          color: 'white', // color-x-axis labels
        },
      },
      y: {
        grid: {
          color: 'Gray', //  color-x-axis grid lines
        },
        beginAtZero: true,
        title: {
          display: true,
          text: "kWh",
          color: 'white'
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
      title: {
        display: true,
        text: 'Trending Power Usage',
      },
      legend: {
        //  position:'bottom',
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
