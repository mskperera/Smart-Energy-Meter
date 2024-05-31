import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Homechart.css';
import { getEngergyUsageNow } from '../../action/device';
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip);

const HomeCostChart = ({ selectedDevice, budgetedValueAmount, selectedLine }) => {
  const [device, setDevice] = useState('');
  const deviceNames = useSelector((state) => state.device.dropDeviceList);
  const defaultSelectedDevice = deviceNames[0];

  useEffect(() => {
    setDevice(defaultSelectedDevice);
  }, [deviceNames]);

  const [obj, setObj] = useState({
    maxValue: budgetedValueAmount,
    minValue: 0,
    currentValue: 0,
    measurementUnit: "Rs"
  });

  const [remainingValue, setRemainingValue] = useState(budgetedValueAmount);

  useEffect(() => {
    setObj((prevObj) => ({
      ...prevObj,
      maxValue: budgetedValueAmount
    }));
  }, [budgetedValueAmount]);

  useEffect(() => {
    setRemainingValue(obj.maxValue - obj.currentValue);
  }, [obj.currentValue, obj.maxValue]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadChartData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [device, defaultSelectedDevice, selectedLine]);

  const loadChartData = async () => {
    const payload = {
      deviceId: selectedDevice.id,
      measurementUnitId: 1,
    };
    const result = await getEngergyUsageNow(payload);
    console.log('result222222', result);

    if (device.deviceTypeId === 1) {
      const { usageBill, usageBill2, usageBill3 } = result.data;
      const totalUsageBill = (usageBill || 0) + (usageBill2 || 0) + (usageBill3 || 0);
      setObj((prevObj) => ({
        ...prevObj,
        currentValue: totalUsageBill,
      }));
    } else if (device.deviceTypeId === 2) {
      const { usageBill, usageBill2, usageBill3 } = result.data;
      let selectedUsageBill = usageBill;
      if (selectedLine === 'L1') {
        selectedUsageBill = usageBill;
      }else if (selectedLine === 'L2') {
        selectedUsageBill = usageBill2;
      } else if (selectedLine === 'L3') {
        selectedUsageBill = usageBill3;
      }
      setObj((prevObj) => ({
        ...prevObj,
        currentValue: selectedUsageBill,
      }));
    }
  };

  const data = {
    labels: ['Used Amount', `Remaining Rs: ${remainingValue ? remainingValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}`],
    datasets: [
      {
        data: [obj.currentValue, remainingValue],
        backgroundColor: [
          obj.currentValue > obj.maxValue ? '#ff0000' : '#ff0066',
          '#F5F5DC'
        ],
        circumference: 270,
        rotation: 225,
        cutout: '80%',
        borderWidth: 0,
        borderRadius: 0,
        budgetedValueAmount,
      },
    ],
  };

  const gaugeText = {
    id: 'gaugeText',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data, chartArea: { top, bottom, left, right, width, height } } = chart;
      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.font = '40px Trebuchet MS';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.fillText(data.datasets[0].data[0] ? data.datasets[0].data[0].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '', xCenter, yCenter);
      ctx.font = '30px Trebuchet MS';
      ctx.fillText("Rs", xCenter, yCenter + 40);
      ctx.font = '20px Trebuchet MS';
      ctx.fillText("Usage Amount", xCenter, yCenter + 80);
      ctx.font = '15px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.fillText("Budget", xCenter, yCenter - 90);
      ctx.font = '25px Trebuchet MS';
      ctx.fillText(`Rs ${data.datasets[0].budgetedValueAmount}`, xCenter, yCenter - 60);
    }
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          usePointStyle: true,
          pointStyle: 'square',
        },
      },
    },
  };

  return (
    <div className='text-p'>
      <Doughnut data={data} options={options} plugins={[gaugeText]} className='chart3' id='box3' />
    </div>
  );
};

export default HomeCostChart;
