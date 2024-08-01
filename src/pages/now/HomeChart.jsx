import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Homechart.css';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { MdEnergySavingsLeaf } from "react-icons/md";


ChartJS.register(ArcElement, Tooltip);

const HomeChart = ({ currentKwValue, budgetedKwhValue, deviceTypeId, deviceMeasuringModeId }) => {
  const data = {
    labels: ['Used kWh', `Remaining kWh: ${((budgetedKwhValue - currentKwValue) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
    datasets: [
      {
        data: [currentKwValue, budgetedKwhValue],
        backgroundColor: [currentKwValue > budgetedKwhValue ? '#ff0000' : '#00bbf0', '#3b3b3b'],
        circumference: 350,
        rotation: 200,
        cutout: '85%',
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
      ctx.fillStyle = [currentKwValue > budgetedKwhValue ? '#ff0000' : '#00bbf0'];
      ctx.font = 'bold 22px Trebuchet MS';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const currentValueFormatted = (data.datasets[0].data[0] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      ctx.fillText(currentValueFormatted, centerX, centerY +5);

      ctx.font = 'bold 20px Trebuchet MS';
      ctx.fillStyle = [currentKwValue > budgetedKwhValue ? '#ff0000' : '#00bbf0'];
      ctx.fillText('kWh', centerX, centerY - 25);

      ctx.font = '15px Trebuchet MS';
      ctx.fillStyle = 'white';
      // ctx.fillText('Energy Usage', centerX, centerY + 70);

      if (data.datasets[0].data[1] !== undefined) {
        ctx.font = '18px Trebuchet MS';
        ctx.fillStyle = 'white';
        // ctx.fillText('Budget', centerX, centerY - 40);

        ctx.font = ' 16px Trebuchet MS';
        ctx.fillStyle = 'white';
        ctx.fillText(`/ ${data.datasets[0].data[1].toLocaleString()}`, centerX, centerY  + 30);
      }

      ctx.restore();
    },
  };

  const options = {
    plugins: {
      legend: {
        display:false,
        position: 'bottom',
        labels: {
          color: 'white',
          usePointStyle: true,
          pointStyle: 'square',
          boxWidth: 20,
        },
        onClick: () => {},
      },
    },
    layout: {
      padding: {
        top: 0,
      },
    },
  };

  // const backgroundColor = deviceTypeId === 2 && deviceMeasuringModeId === 1 ? '#FF5733' : '#131a25';  //style={{ backgroundColor }}

  return (
    <div className='text-p'>
      {/* <div id='box3' className='chart' style={{ backgroundColor }}> */}
      <div style={{position:'static', display:'flex'}}>
        <MdEnergySavingsLeaf className='icon' size={20} style={{ color:'00bbf0', marginLeft:'90px', marginTop:'55px'}}/>
      </div>
        <Doughnut data={data} options={options} plugins={[gaugeText]} id='box3' className='chart' /> 
      {/* </div> */}
    </div>
  );
};

export default HomeChart;
