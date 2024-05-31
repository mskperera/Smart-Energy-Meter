import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getEngergyUsageNow } from '../../action/device';
import './Homechart.css';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip);

const HomeChart = ({ selectedDevice, budgetedValues }) => {
  // const deviceType = 1;  

  const [device, setDevice] = useState('');
  const deviceNames = useSelector((state) => state.device.dropDeviceList);
  const defaultSelctedDevie = deviceNames[0];

  useEffect(() => {
    setDevice(defaultSelctedDevie);
  }, [deviceNames]);

  const [objKw, setObjKw] = useState({
    maxKwValue: budgetedValues,
    minKwValue: 0,
    currentKwValue: 0,
    mesurementUnitKw: 'kWh',
    kwhPerSeconds: 0,
  });

  const [remaningkwvalue, setRemainingKwValue] = useState(budgetedValues);

  useEffect(() => {
    setObjKw((prevObj) => ({
      ...prevObj,
      maxKwValue: budgetedValues,
    }));
  }, [budgetedValues]);

  useEffect(() => {
    setRemainingKwValue(objKw.maxKwValue - objKw.currentKwValue);
  }, [objKw.currentKwValue, objKw.maxKwValue]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadChartData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [device, defaultSelctedDevie]);

  const loadChartData = async () => {
    const payload = {
      deviceId: selectedDevice.id,
      mesurementUnitId: 1,
    };
    const result = await getEngergyUsageNow(payload);
    console.log('result11111', result.data);

    if (device.deviceTypeId === 1) {
      const { kwh } = result.data;
      setObjKw((prevObj) => ({
        ...prevObj,
        currentKwValue: kwh,
      }));
    } else if (device.deviceTypeId === 2) {
      const { kwh, kwh2, kwh3 } = result.data;
      const totalKwh = (kwh || 0) + (kwh2 || 0) + (kwh3 || 0);
      setObjKw((prevObj) => ({
        ...prevObj,
        currentKwValue: totalKwh,
      }));
    }
  };

  const data = {
    labels: ['Used kWh', `Remaining kWh : ${remaningkwvalue ? remaningkwvalue.toFixed(2) : 0}`],
    datasets: [
      {
        data: [objKw.currentKwValue, remaningkwvalue],
        backgroundColor: [objKw.currentKwValue > objKw.maxKwValue ? '#ff0000' : '#00ff99', '#F5F5DC'],
        circumference: 270,
        rotation: 225,
        cutout: '80%',
        borderWidth: 0,
        borderRadius: 0,
        budgetedValues,
      },
    ],
  };

  const gaugeText = {
    id: 'gaugeText',
    beforeDatasetsDraw(chart, args, plugins) {
      const { ctx, data } = chart;
      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.fillStyle = 'white';
      ctx.font = '40px Trebuchet MS ';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(data.datasets[0].data[0], centerX, centerY);

      ctx.font = '30px Trebuchet MS ';
      ctx.fillText('kWh', centerX, centerY + 40);

      ctx.font = '20px Trebuchet MS ';
      ctx.fillText('Energy Usage', centerX, centerY + 80);

      ctx.font = '15px Trebuchet MS';
      ctx.fillText('Budget', centerX, centerY - 90);

      ctx.font = '25px Trebuchet MS';
      ctx.fillText(`${data.datasets[0].budgetedValues} kWh`, centerX, centerY - 60);
    },
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          usePointStyle: true,
          pointStyle: 'square',
          boxWidth: 20,
        },
      },
    },
    layout: {
      padding: {
        top: 0,
      },
    },
  };

  return (
    <div className='text-p'>
      <Doughnut data={data} options={options} plugins={[gaugeText]} id='box3' className='chart' />
    </div>
  );
};

export default HomeChart;
