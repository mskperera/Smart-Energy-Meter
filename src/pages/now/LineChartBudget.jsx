import React, { useEffect, useState } from 'react';
import './AreaChart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import moment from 'moment';
import { getEngergyUsageKwhByDateRangePrediction } from '../../action/device';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

function LineChartBudget({ device }) {
  const selectedDevice = useSelector((state) => state.device.selectedDevice);
  const [loading, setLoading] = useState(null);
  // const [totalForecast, setTotalForecast] = useState(0);
  // const [totalUsed, setTotalUsed] = useState(0); 
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: ['Rs', 'Forecast'],
        data: [],
      },
    ],
  });

  const [lastForecastValue, setLastForecastValue] = useState(0); 

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
      setLoading(false);
      return;
    }
    const months = [];
    // const monthKwArr = [];
    // const predictArr = [];
    // const kwhCumActualArr = [];
    // const kwhCumForcastArr = [];
    const costCumForcastArr = [];

    

    for (let i = 0; i < charData.length; i++) {
      console.log('1 Month', charData[i]);
      months.push(moment(charData[i].timeStamp_local).format('M-DD'));
      // monthKwArr.push(charData[i].kwhPerDay);
      // predictArr.push(charData[i].kwhPerDayForecast);
      // kwhCumActualArr.push(charData[i].kwhCumActual);
      // kwhCumForcastArr.push(charData[i].kwhCumForcast);
      costCumForcastArr.push(charData[i].costCumForcast);
      // totalForecastValue += charData[i].kwhPerDayForecast;
      // totalUsedValue += charData[i].kwhPerDay;
    }

    const lastForecast = costCumForcastArr[costCumForcastArr.length - 1];
    setLastForecastValue(lastForecast || 0); 

    const datasets0 = [
      {
        label: 'Cost',
        data: costCumForcastArr,
        borderColor: '#fff346',
        // pointBortderColor: 'aqua',
        tension: 0.3,
        backgroundColor:'rgb(255,243,70, 0.5)',
        fill: true,
        // showLine: true,
        borderDash: [8, 10],
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
      ctx.font = 'bolder 14px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'right';
      ctx.fillText(`Forecast : Rs.${(Number(lastForecastValue.toFixed(2))).toLocaleString()}`, right, top - 20);
      ctx.restore();
    },
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
          color: 'gray', //  color-x-axis grid lines
        },
        beginAtZero: true,
        title: {
          position: 'top',
          display: false,
          text: 'Session',
          color: 'white',
        },
        ticks: {
          color: 'white', // color-x-axis labels
        },
      },
      y: {
        grid: {
          display: true,
          color: 'Gray', //  color-x-axis grid lines
        },
        beginAtZero: true,
        title: {
          display: true,
          position: 'top',
          text: 'Rs',
          color: 'white',
        },
        ticks: {
          color: 'white', // color of y-axis labels
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

export default LineChartBudget;
