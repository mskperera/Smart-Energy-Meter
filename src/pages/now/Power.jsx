import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {getEngergyUsageNow} from '../../action/device';

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

const Power = () => {

  const [objP,setObjP] = useState({
    maxPValue:3000,
    // minKwValue:0,
    currentPValue:0,
    mesurementUnitKw:"W",
    // kwhPerSeconds:0,
  });

  // const [engergyUsageNow ,setEngergyUsageNow ] = useState(null);

  const [remaningkwvalue,setRemainingKwValue]= useState(null);

  useEffect(()=>{
    setRemainingKwValue(objP.maxPValue-objP.currentPValue);
  },[objP]);

  useEffect(()=>{
    loadChartData();
  },);

  const loadChartData=async()=>{
    const payload={
      deviceId:"4",
      mesurementUnitId:4
    }
   const result=await getEngergyUsageNow(payload);
   console.log('resultwww',result.data)
  //  {"kwh":308.02,"deviceTimeStamp":1708324999,"kwhPerSec":0,"deviceTimeStampDate_UTC":"2024-02-19T06:43:19.000Z","kwh_MeasurementValue_max":100,"kwh_MeasurementValue_min":0,"Voltage":233.4}
 
   const {power}=result.data;
  
  
   setObjP({...objP,currentPValue:power});
  }

  const data = {
    // labels: ['W'],
    datasets: [
      {
        data: [objP.currentPValue,remaningkwvalue],
        backgroundColor: [ '#36A2EB','#F5F5DC'],
        // hoverBackgroundColor: ['#FFCE56'],
        circumference:270,
        rotation:225,
        cutout:'90%',
        borderWidth: 1,
        borderRadius: 50,
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
      ctx.font ='bold 10';
      ctx.textAlign= 'center';
      ctx.textBaseline = 'baseline';
      ctx.fillText(data.datasets[0].data[0]+": W",xCenter,yCenter)
    }
  }


  const options = {
    // customize chart options
  };

  return <Doughnut data={data} options={options} plugins={[gaugeText]}/>;
};

export default Power;