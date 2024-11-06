import React, { useEffect, useState } from 'react';
import './AreaChart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import moment from 'moment';
import { getEngergyUsageKwhByDateRangePrediction } from '../../action/device';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
// import { CrosshairPlugin } from 'chartjs-plugin-crosshair';
// ChartJS.register(CrosshairPlugin);


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

function LineChartBudget({ device, daysElapsed, numberOfDays, usageBill, budgetedBill, startDate, endDate }) {
  const selectedDevice = useSelector((state) => state.device.selectedDevice);
  const [loading, setLoading] = useState(null);
  const [lastForecastValue, setLastForecastValue] = useState(0);
  const [totalUsed, setTotalUsed] = useState(0);

  const [data, setData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    loadEngergyUsageKwhByDateRangePrediction();
  }, []);

  const loadEngergyUsageKwhByDateRangePrediction = async () => {
    setLoading(true);
    const formattedStartDate = moment(device?.startDate).format('YYYY-MM-DD');
    const formattedEndDate = moment(device?.endDate).format('YYYY-MM-DD');

    const payload = {
      deviceId: device?.deviceId,
      frequencyId: 3,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
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

    const labels = generateLabels(formattedStartDate, numberOfDays);

    const datasets = [
      {
        label: 'Budget',
        data: calculateCumulativeValues(budgetedBill, numberOfDays),
        borderColor: 'rgb(252,111,47)',
        tension: 0.3,
        backgroundColor: 'rgb(252,111,47, 0.4)',
        borderDash: [5, 5],
      },
      // {
      //   label: 'Usage Bill',
      //   data: calculateCumulativeValues(usageBill, daysElapsed),
      //   borderColor: 'rgb(254,170,131, 0.6)',
      //   tension: 0.3,
      //   backgroundColor: 'rgb(254,170,131, 0.4)',
      //   fill: false,
      // },
      {
        label: 'Actual',
        data: costCumActualArr,
        borderColor: 'rgba(54,162,235,0.5)',
        tension: 0.3,
        backgroundColor: 'rgba(54,162,235, 0.3)',
        fill: true,
        showLine: true,
      },
      {
        label: 'Prediction',
        data: costCumForcastArr,
        borderColor: 'rgb(255,243,70)',
        tension: 0.3,
        backgroundColor: 'rgba(255,243,70,0.50)',
        borderDash: [10, 5],
      },
    ];

    setData({ labels, datasets });
    setLoading(false);
  };

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

  const customTextPlugin = {
    id: 'customTextPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { top, right, left } } = chart;
      ctx.save();
      ctx.font = 'bold 12px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'right';
      ctx.fillText(`Prediction : Rs.${(Number(lastForecastValue?.toFixed(2))).toLocaleString()}`, right, top - 23);

      ctx.font = 'bold 10px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'right';
      ctx.fillText(`Budget : Rs.${(Number(budgetedBill?.toFixed(2))).toLocaleString()}`, right +0, top +8);


      ctx.font = 'bold 10px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'right';
      ctx.fillText(`Actual : Rs.${(Number(totalUsed.toFixed(2))).toLocaleString()}`, right, top - 9);

      ctx.restore();
    },
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: true,
          color: '#4f4f4f',
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
          font: {
            size: 10, 
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: '#4f4f4f',
        },
        beginAtZero: true,
        title: {
          display: true,
          position: 'top',
          text: 'Rs',
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
      // tooltip: {
      //   mode: 'index',
      //   intersect: false,
      //   callbacks: {
      //     label: function(context) {
      //       const label = context.dataset.label || '';
      //       const value = context.parsed.y;
      //       return `${label}: Rs.${value.toLocaleString()}`;
      //     },
      //   },
      // },
      // crosshair: {
      //   line: {
      //     color: 'rgba(255, 255, 255, 0.6)',
      //     width: 1,
      //     dashPattern: [5, 5],
      //   },
      //   sync: {
      //     enabled: false,
      //   },
      //   zoom: {
      //     enabled: false,
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
