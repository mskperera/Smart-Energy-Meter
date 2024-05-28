import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Homechart.css';
import { getEngergyUsageNow } from '../../action/device';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { useSelector } from 'react-redux';
import { getBudgetedValues } from '../../action/deviceSettings';

ChartJS.register(ArcElement, Tooltip);

function HomeCostChart({ selectedDevice }) {
  const [budgetedValues, setBudgetedValues] = useState('');
  const budgetedValuesRef = useRef(budgetedValues);

  const [device, setDevice] = useState('');

  const deviceNames = useSelector((state) => state.device.dropDeviceList);
  const defaultSelctedDevie = deviceNames[0];

  useEffect(() => {
    setDevice(defaultSelctedDevie);
  }, [deviceNames]);

  const [obj, setObj] = useState({
    maxValue: 100000,
    minValue: 0,
    currentValue: 0,
    mesurementUnit: 'Rs',
  });

  const [remaningvalue, setRemainingValue] = useState(null);

  useEffect(() => {
    setRemainingValue(obj.maxValue - obj.currentValue);
  }, [obj]);

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
    setBudgetedValues(budgetedValue.budgetedBill);
    budgetedValuesRef.current = budgetedValue.budgetedBill;
  };

  const loadChartData = async () => {
    const payload = {
      deviceId: selectedDevice.id,
      mesurementUnitId: 1,
    };
    const result = await getEngergyUsageNow(payload);
    const { usageBill } = result.data;

    setObj({ ...obj, currentValue: usageBill });
  };

  const data = {
    labels: ['Used Amount', `Remaining Rs : ${remaningvalue ? remaningvalue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}`],
    datasets: [
      {
        data: [obj.currentValue, remaningvalue],
        backgroundColor: ['#ff0066', '#F5F5DC'],
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
    beforeDatasetsDraw(chart, args, pluginOption) {
      const { ctx, data } = chart;
      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.font = '40px Trebuchet MS';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';

      // Format current value
      const formattedCurrentValue = data.datasets[0].data[0].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      ctx.fillText(formattedCurrentValue, centerX, centerY);

      ctx.font = '30px Trebuchet MS';
      ctx.fillText('Rs', centerX, centerY + 40);

      ctx.font = '20px Trebuchet MS';
      ctx.fillText('Usage Amount', centerX, centerY + 80);

      ctx.font = '15px Trebuchet MS';
      ctx.fillText('Budget', centerX, centerY - 90);

      ctx.font = '25px Trebuchet MS';
      // Format budgeted value
      const formattedBudgetedValue = budgetedValuesRef.current.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      ctx.fillText(`Rs ${formattedBudgetedValue}`, centerX, centerY - 60);
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
        },
      },
    },
  };

  return (
    <div className='text-p'>
      <Doughnut data={data} options={options} plugins={[gaugeText]} className='chart3' id='box3' />
    </div>
  );
}

export default HomeCostChart;
