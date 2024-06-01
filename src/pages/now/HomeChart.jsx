import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getEngergyUsageNow } from '../../action/device';
import './Homechart.css';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip);

const HomeChart = ({objKw,selectedLine }) => {

 
  const data = {
    
    labels: ['Used kWh', `Remaining kWh : ${ ((objKw.budgetedKwhValue - objKw.currentKwValue) ||0 )?.toFixed(2)}`],
    datasets: [
      {
        data: [objKw.currentKwValue, objKw.budgetedKwhValue],
        backgroundColor: [objKw.currentKwValue > objKw.budgetedKwhValue ? '#ff0000' : '#00ff99', '#F5F5DC'],
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
      ctx.fillStyle = 'white';
      ctx.font = '40px Trebuchet MS';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(data.datasets[0].data[0], centerX, centerY);

      ctx.font = '30px Trebuchet MS';
      ctx.fillText('kWh', centerX, centerY + 40);

      ctx.font = '20px Trebuchet MS';
      ctx.fillText('Energy Usage', centerX, centerY + 80);

      ctx.font = '15px Trebuchet MS';
      ctx.fillText('Budget', centerX, centerY - 90);

      ctx.font = '25px Trebuchet MS';
      ctx.fillText(`${data.datasets[0].data[1]} kWh`, centerX, centerY - 60);
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
      {/* {JSON.stringify(selectedLine)} */}

      <div className='text-p'>
        <Doughnut data={data} options={options} plugins={[gaugeText]} id='box3' className='chart' />
      </div>
    </>
  );
};

export default HomeChart;
