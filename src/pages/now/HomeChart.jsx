import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {getEngergyUsageNow} from '../../action/device';

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

const HomeChart = () => {

  const [objKw,setObjKw] = useState({
    maxKwValue:5000,
    minKwValue:0,
    currentKwValue:1050,
    mesurementUnitKw:"kW",
    kwhPerSeconds:0,
  });

  // const [engergyUsageNow ,setEngergyUsageNow ] = useState(null);

  const [remaningkwvalue,setRemainingKwValue]= useState(null);

  useEffect(()=>{
    setRemainingKwValue(objKw.maxKwValue-objKw.currentKwValue);
  },[objKw]);

  useEffect(()=>{
    loadChartData();
  },[objKw]);

  const loadChartData=async()=>{
    const payload={
      deviceId:"D-0003",
   mesurementUnitId:1
    }
   const result=await getEngergyUsageNow(payload);
   console.log('resultwww',result.data)
  //  {"kwh":308.02,"deviceTimeStamp":1708324999,"kwhPerSec":0,"deviceTimeStampDate_UTC":"2024-02-19T06:43:19.000Z","kwh_MeasurementValue_max":100,"kwh_MeasurementValue_min":0,"Voltage":233.4}
 
   const {kwh,kwh_MeasurementValue_max,kwh_MeasurementValue_min}=result.data;
  
  
   setObjKw({...objKw,maxKwValue:kwh_MeasurementValue_max,minKwValue:kwh_MeasurementValue_min,currentKwValue:kwh,kwhPerSeconds:objKw.kwhPerSec});
  }

  const data = {
    labels: ['Used kW'],
    datasets: [
      {
        data: [objKw.currentKwValue,remaningkwvalue],
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