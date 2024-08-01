import React, { useEffect, useState } from 'react';
import './AreaChart.css';
import { Line,Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler, BarController, BarElement } from 'chart.js';
import moment from 'moment';
import {  getEngergyUsageKwhByDateRangePrediction } from '../../action/device';
import { getbillingSessionByDeviceId } from '../../action/billingSession';
import { useSelector } from 'react-redux';
import {ThreeDots} from 'react-loader-spinner'; 

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, BarController, BarElement);

function LineChart({device}) {

  const selectedDevice = useSelector((state) => state.device.selectedDevice);

  const [loading, setLoading] = useState(true); 

   useEffect(() => {
    if (selectedDevice) {
      loadEngergyUsageKwhByDateRangePrediction();
    }
  }, []);

  const loadEngergyUsageKwhByDateRangePrediction = async () => {
    setLoading(true); 
    // const currentYear = moment().utc();
    // const startOfYear = currentYear.startOf('year').format('YYYY-MM-DD');
    // const endOfYear = currentYear.endOf('year').format('YYYY-MM-DD');

 //const sesstionDetailsRes= await getbillingSessionByDeviceId(selectedDevice.id);
 //const sesstionDetailsArr = sesstionDetailsRes.data;
// console.log('sesstionDetailsArr',sesstionDetailsArr);
// if(sesstionDetailsArr.length===0) return;

 //const currentSession=sesstionDetailsArr[sesstionDetailsArr.length-1];
// console.log('currentSession',currentSession);


// const startDate = moment(currentSession.startDate).utc().startOf('month').subtract('minutes').format('YYYY-MM-DD'); 
// const endDate = moment(currentSession.endDate).utc().endOf('month').subtract('minutes').format('YYYY-MM-DD');
// const startDate = moment().startOf('month').format('YYYY-MM-DD');
// const endDate = moment().endOf('month').format('YYYY-MM-DD');

const startDate = moment(device?.startDate).format('YYYY-MM-DD');
const endDate = moment(device?.endDate).format('YYYY-MM-DD');


    const payload = {
      deviceId:device?.deviceId,//selectedDevice.id,// "4",
      frequencyId:3,
      // measurementUnitId: 0,
      startDate:startDate,//"2024-07-01",//startDate,//currentSession"2024-04-01 18:30",// startOfYear,
      endDate:endDate//"2024-07-31"//endDate,//"2024-04-30 18:30",// endOfYear,
    }

    console.log('payload', payload);
    
    const resultMonth = await getEngergyUsageKwhByDateRangePrediction(payload);
    console.log('1 Month', resultMonth.data)

    const charData = resultMonth.data.chartData;
    const months = [];
    const monthKwArr = [];
    const predictArr = [];
    const kwhCumActualArr = [];
    const kwhCumForcastArr = [];

    for (let i = 0; i < charData.length; i++) {
      console.log('1 Month', charData[i])
      // months.push(charData[i].timeStamp_local);
      months.push(moment(charData[i].timeStamp_local).format('M-DD'));
      monthKwArr.push(charData[i].kwhPerDay);
      predictArr.push(charData[i].kwhPerDayForecast);
      kwhCumActualArr.push(charData[i].kwhCumActual);
      kwhCumForcastArr.push(charData[i].kwhCumForcast);
      // predictArr.push(charData[i].predictedKwhPerMonth);
    }

    // for (let i = 0; i < charData.length; i++) {
    //   months.push(charData[i].month);
    //   // monthKwArr.push(charData[i].kwhPerMonth);
      
    // }

    const datasets0 = [
      {
        label: 'Prediction',
        data: predictArr,
        borderColor: '#fff346',
        pointBortderColor: 'aqua',
        tension: 0.4,
        // backgroundColor: '#fff346',
        // backgroundColor: 'rgba(54,162,235, 0.3)',
        fill: false,
        showLine: true,
        borderDash: [8, 10]
      },
      // {
      //   label: 'Actual',
      //   data: kwhCumActualArr,
      //   borderColor: 'red',
      //   pointBortderColor: 'aqua',
      //   tension: 0.3,
      //   backgroundColor: 'green',
      //   fill: false,
      //   showLine: true,
      // },
      // {
      //   label: 'Forcast',
      //   data: kwhCumForcastArr,
      //   borderColor: 'rgba(0, 255, 153)',
      //   pointBortderColor: 'rgba(0, 255, 153)',
      //   tension: 0.3,
      // },
      {
        label: 'kWh',
        data: monthKwArr,
        borderColor: 'rgba(54,162,235)',
        pointBortderColor: 'aqua',
        tension: 0.3,
        backgroundColor: 'rgba(54,162,235, 0.7)',
        fill: true,
        showLine: true,
      },
      // {
      //   label: 'Bar Data',
      //   data: [10, 20, 30, 40, 50], 
      //   backgroundColor: 'rgba(255, 99, 132, 0.8)',
      //   type: 'bar', 
      // }
    ];

    setData({ ...data, labels: months, datasets: datasets0 });
    setLoading(false);
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


  const customTextPlugin = {
    id: 'customTextPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;
      ctx.save();

    
      ctx.font = '20px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      // ctx.fillText('Trending Power Usage', width / 2, top + 30);

     
      // ctx.font = '14px Trebuchet MS';
      // ctx.fillText('Trending Power Usage', left +30, top +310);

      ctx.restore();
    }
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
          display: true,
          text: "Date",
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
          display: false,
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
      // title: {
      //   display: true,
      //   text: 'Trending Power Usage',
      // },
      legend: {
        //  position:'bottom',
        display: true,
        labels: {
          color: 'white',
          // border: 'none',
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

export default LineChart;
