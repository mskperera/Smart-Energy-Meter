import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

const HomeCostChart = () => {
  const [obj,setobj]=useState({
    maxValue:10000,
    minValue:0,
    currentValue:4500,
    mesurementUnit:"Rs"
    });
 
  const [remaningvalue,setRemainingValue]=useState(null)

  useEffect(()=>{
    setRemainingValue(obj.maxValue-obj.currentValue)
  },[
    obj
  ])
  const data = {
    // labels: ['Label 1', 'Label 2', 'Label 3'],
    labels: ['Rs.'],
    datasets: [
      {
        data: [obj.currentValue,remaningvalue],
        // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        backgroundColor: ['#36A2EB','#F5F5DC'],
        // hoverBackgroundColor: ['#FFCE56'],
        circumference:270,
        rotation:225,
        cutout:'70%',
        borderWidth: 1, 
      },
    ],
  };

  const gaugeText={
    id:'gaugeText',
    beforeDatasetsDraw(chart,args, pluginOption){
      const {ctx,data} = chart;

      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.fillStyle='black';
      ctx.font ='bold 100rem';
      ctx.textAlign= 'center';
      ctx.textBaseline = 'baseline';
      ctx.fillText(`Rs:${data.datasets[0].data[0]}`,xCenter,yCenter +20)
    }
  }

  const options = {
    // customize chart options
  };

  return <Doughnut data={data} options={options} plugins={[gaugeText]} />;
};

export default HomeCostChart;