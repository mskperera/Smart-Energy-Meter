import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import './Homechart.css';
import { GiTwoCoins } from "react-icons/gi";

ChartJS.register(ArcElement, Tooltip);

const HomeCostChart = ({ budgetedBill, currentValue, selectedLine }) => {

  const data = {
    labels: [
      'Used Rs', 
      `Remaining: ${(budgetedBill - currentValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    ],
    datasets: [
      {
        data: [currentValue || 0, budgetedBill || 0],
        backgroundColor: [currentValue > budgetedBill ? '#ff0000' : '#00bbf0', '#3b3b3b'],
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
      ctx.fillStyle = [currentValue > budgetedBill ? '#ff0000' : '#00bbf0'];//#ff0066
      ctx.font = 'bold 22px Trebuchet MS';
      ctx.textAlign = 'center';

      const currentValueFormatted = (data.datasets[0].data[0] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      ctx.fillText(currentValueFormatted, centerX, centerY +8);

      ctx.font = 'bold 20px Trebuchet MS';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = [currentValue > budgetedBill ? '#ff0000' : '#00bbf0'];
      ctx.fillText('Rs', centerX, centerY -30);

      ctx.font = '13px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.fillText("", centerX, centerY -30);
      ctx.fillText('Energy Usage', centerX, centerY - 10);

      if (data.datasets[0].data[1] !== undefined) {
        ctx.font = '13px Trebuchet MS';
        ctx.fillStyle = 'white';
        ctx.fillText('Budget', centerX, centerY + 28);

        const budgetedBillFormatted = (data.datasets[0].data[1] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        ctx.font = 'bolder 16px Trebuchet MS';
        ctx.fillStyle = 'white';
        ctx.fillText(`/ ${budgetedBillFormatted}`, centerX, centerY + 45);
      }
    },
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'white',
          usePointStyle: true,
          pointStyle: 'square',
          boxWidth: 20,
          filter: function(legendItem, data){
            return legendItem.text.includes('Remaining');
          },
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
        <div className='' style={{position:'static', display:'flex'}}>
          <GiTwoCoins className='icon' size={20} style={{ color:'00bbf0', marginLeft:'115px', marginTop:'55px'}}/>
        </div>
        <Doughnut data={data} options={options} plugins={[gaugeText]} id='box3' className='chart' />
      </div>
    </>
  );
};

export default HomeCostChart;
