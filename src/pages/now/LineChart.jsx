import React, { useEffect, useState } from 'react';
import './AreaChart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import moment from 'moment';
import { getEngergyUsageKwhByDateRange } from '../../action/device';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

function LineChart() {

  useEffect(() => {
    loadEngergyUsageKwhByDateRange();
  }, []);

  const loadEngergyUsageKwhByDateRange = async () => {
    const currentYear = moment().utc();
    const startOfYear = currentYear.startOf('year').format('YYYY-MM-DD HH:mm:ss');
    const endOfYear = currentYear.endOf('year').format('YYYY-MM-DD HH:mm:ss');

    const payload = {
      deviceId: "4",
      frequencyId: 4,
      // measurementUnitId: 0,
      startDate: startOfYear,
      endDate: endOfYear,
    }

    const resultMonth = await getEngergyUsageKwhByDateRange(payload);
    console.log('1 Month', resultMonth.data)

    const charData = resultMonth.data.recordset;
    const months = [];
    const monthKwArr = [];
    const predictArr = [];

    for (let i = 0; i < charData.length; i++) {
      months.push(charData[i].month);
      monthKwArr.push(charData[i].kwhPerMonth);
      // predictArr.push(charData[i].predictedKwhPerMonth);
    }

    for (let i = 0; i < charData.length; i++) {
      months.push(charData[i].month);
      // monthKwArr.push(charData[i].kwhPerMonth);
      predictArr.push(charData[i].predictedKwhPerMonth);
    }

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
          text: "Trending To:",
          font: {
            size: 20
          },
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
