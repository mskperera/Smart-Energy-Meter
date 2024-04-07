import React from 'react';
import './AreaChart.css';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,LineElement, CategoryScale, LinearScale,PointElement,Filler} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale,PointElement,Filler);


function LineChart() {
  const data = {
    labels: ['01', '02', '03', '04', '05', '06', '07','08','09'],
    datasets: [
      {
        label: 'kWh',
        data: [35, 38, 48, 59, 66, 76, 89, 98, 113], 
        borderColor: 'rgba(0, 255, 153)',
        pointBortderColor: 'aqua',
        // pointStyle: 'rect',
        tension: 0.3,
        backgroundColor: 'rgba(0, 255, 153, 0.5)',
        fill: true,
        showLine: false,
      },
      {
        label: 'Prediction',
        data: [40, 45, 57, 68, 80, 90, 100, 110, 120], 
        borderColor: 'rgba(54, 162, 235)',
        pointBortderColor: 'aqua',
        tension: 0.5,
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        fill: true,
      },
    ],
  };

  const gaugeText={
    id:'gaugeText',
    beforeDatasetsDraw(chart,args, plugins){
      const {ctx,data} = chart;

      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.fillStyle='white';
      // ctx.font ='35px Trebuchet MS ';
      // ctx.textAlign= 'center';
      // ctx.textBaseline = 'baseline';
      // ctx.strokeStyle = 'white';
      // ctx.lineWidth = 1;
      // ctx.strokeText(data.datasets[0].data[0], centerX, centerY);
      // ctx.strokeStyle = 'black';
      // ctx.stroke();
      ctx.fillStyle = 'white';
      // ctx.fillText(data.datasets[0].data[0], centerX +200 , centerY -190);

      // ctx.fillText(<TbHomeStats color='white' size={10}/>, centerX, centerY  -10);

      ctx.font = '15px Trebuchet MS ';
      ctx.fillText("Prediction Rs", centerX +250, centerY -190);

      // ctx.font = '20px Trebuchet MS ';
      // ctx.fillText("Energy Usage", centerX, centerY + 80);
    
    }
  }

  
  const options = {
    scales: {
      x: {
        grid: {
          display:false,
          color: 'white', //  color-x-axis grid lines
        },
        beginAtZero: true,
        title:{
          position:'top',
          display:true,
          text:"Trending To:",
          font:{
            size:20
          },
          color:'white'
        },
        ticks: {
          color: 'white', // color-x-axis labels
        },
      },
      y: {
        grid: {
          color: 'Gray', //  color-x-axis grid lines
        },
        beginAtZero: true,
        title:{
          display:true,
          text:"kWh",
          color:'white'
        },
        ticks: {
          color: 'white', //color of y-axis labels
        },
      },
    },
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: 'Trending Power Usage',
      },
        legend: {
          //  position:'bottom',
            display: true,
            labels: {
                color: 'white',
                border: 'none',
            },
        },
    },
  };

  return (
    <div className='chart2'>
        <Line data={data} options={options} id='box2'/>
    </div>
  );
}

export default LineChart;
