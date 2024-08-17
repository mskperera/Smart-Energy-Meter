import React, { useEffect, useState } from 'react';
import './AreaChart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import moment from 'moment';
import { getEngergyUsageKwhByDateRangePrediction } from '../../action/device';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

function LineChartActual({ device }) {
  const selectedDevice = useSelector((state) => state.device.selectedDevice);
  const [loading, setLoading] = useState(null);
  const [totalForecast, setTotalForecast] = useState(0);
  const [totalUsed, setTotalUsed] = useState(0); 
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: ['kWh', 'Forecast'],
        data: [],
      },
    ],
  });

  useEffect(() => {
    // if (selectedDevice) {
      loadEngergyUsageKwhByDateRangePrediction();
    // }
  }, []);

  const loadEngergyUsageKwhByDateRangePrediction = async () => {
    setLoading(true);
    const startDate = moment(device?.startDate).format('YYYY-MM-DD');
    const endDate = moment(device?.endDate).format('YYYY-MM-DD');

    const payload = {
      deviceId: device?.deviceId,
      frequencyId: 3,
      startDate: startDate,
      endDate: endDate,
    };

    console.log('payload', payload);

    const resultMonth = await getEngergyUsageKwhByDateRangePrediction(payload);
    console.log('1 Month', resultMonth.data);

    const charData = resultMonth.data.chartData;

    if (!Array.isArray(charData)) {
      console.error('charData is not an array or is undefined');
      setLoading(false);
      return;
    }

    const months = [];
    const kwhCumActualArr = [];
    const kwhCumForcastArr = [];

    // let totalForecastValue = 0;
    // let totalUsedValue = 0;

    for (let i = 0; i < charData.length; i++) {
      console.log('1 Month', charData[i]);
      months.push(moment(charData[i].timeStamp_local).format('M-DD'));
      kwhCumActualArr.push(charData[i].kwhCumActual);
      kwhCumForcastArr.push(charData[i].kwhCumForcast);
      // totalForecastValue += charData[i].kwhPerDayForecast;
      // totalUsedValue += charData[i].kwhPerDay;
    }

    const lastForecast = kwhCumForcastArr[kwhCumForcastArr.length - 1];
    setTotalForecast(lastForecast || 0);
    // setTotalForecast(totalForecastValue);
    // setTotalUsed(totalUsedValue); 

    let lastActualValue = 0;
    for (let i = kwhCumActualArr.length - 1; i >= 0; i--) {
      if (kwhCumActualArr[i] !== null) {
        lastActualValue = kwhCumActualArr[i];
        break;
      }
    }
    setTotalUsed(lastActualValue || 0);
    

    const datasets0 = [
      {
        label: 'Forecast',
        data: kwhCumForcastArr,
        borderColor: '#fff346',
        pointBortderColor: 'rgba(0, 255, 153)',
        tension: 0.3,
        borderDash: [8, 10],
      },
      {
        label: 'Actual',
        data: kwhCumActualArr,
        borderColor: 'rgba(54,162,235)',
        pointBortderColor: 'aqua',
        tension: 0.3,
        backgroundColor: 'rgba(54,162,235, 0.5)',
        fill: true,
        showLine: true,
      },
    ];

    setData({ ...data, labels: months, datasets: datasets0 });
    setLoading(false);
  };

  const customTextPlugin = {
    id: 'customTextPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { top, right } } = chart;
      ctx.save();
      ctx.font = 'bold 13px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'right';
      ctx.fillText(`Forecast : ${(Number(totalForecast.toFixed(2))).toLocaleString()} kWh`, right, top - 25);


      ctx.font = 'bold 11px Trebuchet MS';
      ctx.fillText(`Actual Used: ${(Number(totalUsed.toFixed(2))).toLocaleString()} kWh`, right, top - 8);
      ctx.restore();
    },
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: true,
          color: '#4f4f4f', //  color-x-axis grid lines
        },
        beginAtZero: true,
        title: {
          position: 'top',
          display: false,
          text: 'Session',
          color: 'white',
        },
        ticks: {
          color: 'white', //x axis labels
          font: {
            size: 10, 
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: '#4f4f4f', //  color-x-axis grid lines
        },
        beginAtZero: true,
        title: {
          display: true,
          position: 'top',
          text: 'kWh',
          color: 'white',
          font: {
            size: 10,
          },
        },
        ticks: {
          color: 'white', //y axis labels
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
        align: 'start',
        labels: {
          color: 'white',
          usePointStyle: true,
          pointStyle: 'rectRounded',
          font: {
            size: 10,
          },
        },
        onClick: () => { },
      },
      // title: {
      //   display: true,
      //   text: `Actual Value Used: ${(Number(totalUsed.toFixed(2))).toLocaleString()} kWh`,
      //   color: 'white',
      //   font: {
      //     size: 18,
      //   },
      // },
    },
  };

  return (
    <div className='chart2'>
      {loading ? (
        <div className="spinner-container d-flex align-items-center justify-content-center">
          <ThreeDots color={"#36A2EB"} loading={loading} size={50} />
        </div>
      ) : (
        <Line data={data} options={options} plugins={[customTextPlugin]} id='box22' className='chart box22' />
      )}
    </div>
  );
}

export default LineChartActual;
