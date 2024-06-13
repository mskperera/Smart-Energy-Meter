import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import './Homechart.css';

ChartJS.register(ArcElement, Tooltip);

const HomeCostChart = ({ budgetedBill, currentValue, selectedLine }) => {
  const data = {
    labels: [
      'Used Rs', 
      `Remaining Rs : ${(budgetedBill - currentValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    ],
    datasets: [
      {
        data: [currentValue || 0, budgetedBill || 0],
        backgroundColor: [currentValue > budgetedBill ? '#ff0000' : '#ff0066', '#F5F5DC'],
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
    beforeDatasetsDraw(chart) {
      const { ctx, data } = chart;
      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.fillStyle = '#ff0066';
      ctx.font = '35px Trebuchet MS';
      ctx.textAlign = 'center';

      const currentValueFormatted = (data.datasets[0].data[0] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      ctx.fillText(currentValueFormatted, centerX, centerY + 40);

      ctx.font = '25px Trebuchet MS';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ff0066';
      ctx.fillText('Rs', centerX, centerY);

      ctx.font = '20px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.fillText('Energy Usage(Value)', centerX, centerY + 80);

      if (data.datasets[0].data[1] !== undefined) {
        ctx.font = '15px Trebuchet MS';
        ctx.fillStyle = 'white';
        ctx.fillText('Budget', centerX, centerY - 90);

        const budgetedBillFormatted = (data.datasets[0].data[1] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        ctx.font = '25px Trebuchet MS';
        ctx.fillStyle = 'white';
        ctx.fillText(`${budgetedBillFormatted} Rs`, centerX, centerY - 60);
      }
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
    <>
      <div className='text-p'>
        <Doughnut data={data} options={options} plugins={[gaugeText]} id='box3' className='chart' />
      </div>
    </>
  );
};

export default HomeCostChart;
