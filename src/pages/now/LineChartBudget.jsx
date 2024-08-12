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
  const [lastForecastValue, setLastForecastValue] = useState(0); 
  const [totalUsed, setTotalUsed] = useState(0);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: ['Rs', 'Forecast'],
        data: [],
      },
    ],
  });

  useEffect(() => {
    loadEngergyUsageKwhByDateRangePrediction();
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
    const costCumForcastArr = [];
    const costCumActualArr = [];

    for (let i = 0; i < charData.length; i++) {
      months.push(moment(charData[i].timeStamp_local).format('M-DD'));
      costCumForcastArr.push(charData[i].costCumForcast);
      costCumActualArr.push(charData[i].costCumActual);
    }

    const lastForecast = costCumForcastArr[costCumForcastArr.length - 1];
    setLastForecastValue(lastForecast || 0); 

    
    let lastActualValue = 0;
    for (let i = costCumActualArr.length - 1; i >= 0; i--) {
      if (costCumActualArr[i] !== null) {
        lastActualValue = costCumActualArr[i];
        break;
      }
    }
    setTotalUsed(lastActualValue || 0);

    const datasets0 = [
      {
        label: 'Cost',
        data: costCumForcastArr,
        borderColor: '#fff346',
        tension: 0.3,
        backgroundColor: 'rgba(255,243,70, 0.5)',
        borderDash: [8, 10],
      },
      {
        label: 'Actual',
        data: costCumActualArr,
        borderColor: 'rgba(54,162,235)',
        tension: 0.3,
        backgroundColor: 'rgba(54,162,235, 0.5)',
        fill: true,
        showLine: true,
      }
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

      ctx.font = 'bolder 12px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'right';
      ctx.fillText(`Actual : Rs.${(Number(totalUsed.toFixed(2))).toLocaleString()}`, right, top - 5);

      ctx.restore();
    },
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
          text: 'Session',
          color: 'white',
        },
        ticks: {
          color: 'white',
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
          text: 'Rs',
          color: 'white',
        },
        ticks: {
          color: 'white',
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
