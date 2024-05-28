import React, { useEffect, useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getEngergyUsageNow } from '../../action/device';
import './Homechart.css';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { getBudgetedValues } from '../../action/deviceSettings';
import { useSelector } from 'react-redux';
ChartJS.register(ArcElement, Tooltip);

const HomeChart = ({ selectedDevice }) => {
  const [budgetedValues, setBudgetedValues] = useState('');
  const budgetedValuesRef = useRef(budgetedValues);

  const [device, setDevice] = useState('');

  const deviceNames = useSelector((state) => state.device.dropDeviceList);
  const defaultSelctedDevie = deviceNames[0];

  useEffect(() => {
    setDevice(defaultSelctedDevie);
  }, [deviceNames]);

  const [objKw, setObjKw] = useState({
    maxKwValue: 1000,
    minKwValue: 0,
    currentKwValue: 0,
    mesurementUnitKw: 'kWh',
    kwhPerSeconds: 0,
  });

  const [remaningkwvalue, setRemainingKwValue] = useState(null);

  useEffect(() => {
    setRemainingKwValue(objKw.maxKwValue - objKw.currentKwValue);
  }, [objKw]);

  useEffect(() => {
    loadChartData();
  }, [selectedDevice]);

  useEffect(() => {
    if (device) {
      const deviceId = device.id || defaultSelctedDevie.id;
      loadBudgetedValues(deviceId);
    }
  }, [device]);

  const loadBudgetedValues = async (deviceId) => {
    const result = await getBudgetedValues(deviceId);
    const budgetedValue = result.data;
    setBudgetedValues(budgetedValue.budgetedKwh);
    budgetedValuesRef.current = budgetedValue.budgetedKwh;
  };

  const loadChartData = async () => {
    const payload = {
      deviceId: selectedDevice.id,
      mesurementUnitId: 1,
    };
    const result = await getEngergyUsageNow(payload);
    const { kwh } = result.data;

    setObjKw({ ...objKw, currentKwValue: kwh });
  };

  const data = {
    labels: ['Used kWh', `Remaining kWh : ${remaningkwvalue ? remaningkwvalue.toFixed(2) : 0}`],
    datasets: [
      {
        data: [objKw.currentKwValue, remaningkwvalue],
        backgroundColor: ['#00ff99', '#F5F5DC'],
        circumference: 270,
        rotation: 225,
        cutout: '80%',
        borderWidth: 0,
        borderRadius: 0,
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
      ctx.fillText(`${budgetedValuesRef.current} kWh`, centerX, centerY - 60);
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
