import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const Power = ({ budgetedValue, currentValue }) => {
  const data = {
    datasets: [
      {
        data: [currentValue, budgetedValue - currentValue],
        backgroundColor: ['#36A2EB', '#F5F5DC'],
        circumference: 270,
        rotation: 225,
        cutout: '80%',
        borderWidth: 0,
        borderRadius: 25,
      },
    ],
  };

  const gaugeText = {
    id: 'gaugeText',
    beforeDatasetsDraw(chart, args, pluginOption) {
      const { ctx, data } = chart;
      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.fillStyle = 'white';
      ctx.font = '25px Trebuchet MS';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const displayValue = currentValue > 1000 ? (currentValue / 1000).toFixed(2) : currentValue;
      const unit = currentValue > 1000 ? 'kW' : 'W';

      ctx.fillText(displayValue, xCenter, yCenter - 10);

      ctx.fillStyle = 'white';
      ctx.font = '15px Trebuchet MS';
      ctx.fillText(unit, xCenter, yCenter + 10);

      ctx.font = '15px Trebuchet MS';
      ctx.fillText('Load', xCenter, yCenter + 28);
      ctx.restore();
    },
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Doughnut data={data} options={options} plugins={[gaugeText]} className='chart' />;
};

export default Power;
