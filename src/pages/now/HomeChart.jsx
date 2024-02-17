import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

const HomeChart = () => {

  const [objuse,objkw] = useState({
    maxKwValue:5000,
    minKwValue:0,
    currentKwValue:1050,
    mesurementUnitKw:"kW"
  });

  const [remaningkwvalue,setRemainingKwValue]= useState(null);

  useEffect(()=>{
    setRemainingKwValue(objuse.maxKwValue-objuse.currentKwValue);
  },[objuse]);


  const data = {
    labels: ['Used kW'],
    datasets: [
      {
        data: [objuse.currentKwValue,remaningkwvalue],
        backgroundColor: [ '#36A2EB','#F5F5DC'],
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
      ctx.font ='bold 100';
      ctx.textAlign= 'center';
      ctx.textBaseline = 'baseline';
      ctx.fillText(`kW:${data.datasets[0].data[0]}`,xCenter,yCenter +20)
    }
  }


  const options = {
    // customize chart options
  };

  return <Doughnut data={data} options={options} plugins={[gaugeText]} />;
};

export default HomeChart;