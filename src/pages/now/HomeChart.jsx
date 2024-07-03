import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getEngergyUsageNow } from '../../action/device';
import './Homechart.css';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip);

const HomeChart = ({currentKwValue,budgetedKwhValue,selectedLine }) => {

 //#00ff99
  const data = {
    
    labels: ['Used kWh', `Remaining kWh : ${ ((budgetedKwhValue - currentKwValue) ||0 )?.toLocaleString(undefined,{minimumFractionDigits: 2, maximumFractionDigits: 2})}`],
    datasets: [
      {
        data: [currentKwValue, budgetedKwhValue],
        backgroundColor: [currentKwValue > budgetedKwhValue ? '#ff0000' : '#fff346', '#F5F5DC'],
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
      ctx.fillStyle = [currentKwValue > budgetedKwhValue ? '#ff0000' : '#fff346'];
      ctx.font = 'bold 30px Trebuchet MS';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const currentValueFormatted = (data.datasets[0].data[0] || 0).toLocaleString(undefined,{minimumFractionDigits: 2, maximumFractionDigits: 2});
      ctx.fillText(currentValueFormatted, centerX, centerY -10);
      // ctx.fillText(data.datasets[0].data[0].toLocaleString(undefined,{minimumFractionDigits: 2, maximumFractionDigits: 2}), centerX, centerY);
  
      ctx.font = '22px Trebuchet MS';
      ctx.fillStyle = [currentKwValue > budgetedKwhValue ? '#ff0000' : '#fff346'];
      ctx.fillText('kWh', centerX, centerY + 35);
  
      ctx.font = '15px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.fillText('Energy Usage', centerX, centerY + 70);
  
      if (data.datasets[0].data[1] !== undefined) {
        ctx.font = '15px Trebuchet MS';
        ctx.fillStyle = 'white';
        ctx.fillText('Budget', centerX, centerY - 75);
  
        ctx.font = 'bold 22px Trebuchet MS';
        ctx.fillStyle = 'white';
        ctx.fillText(`${data.datasets[0].data[1].toLocaleString()} kWh`, centerX, centerY - 50);
      }
  
      ctx.restore();
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
        onClick: () =>{},
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

export default HomeChart;
