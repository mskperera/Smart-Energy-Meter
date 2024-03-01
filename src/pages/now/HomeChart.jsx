import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {getEngergyUsageNow} from '../../action/device';

import { Chart as ChartJS, ArcElement, Tooltip, Colors } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

const HomeChart = () => {

  const [objKw,setObjKw] = useState({

    // maxKwValue:1000,
    // minKwValue:0,
    // currentKwValue:0,
    // mesurementUnitKw:"kW",
    maxKwValue:450,
    minKwValue:0,
    currentKwValue:0,
    mesurementUnitKw:"kWh",
    kwhPerSeconds:0,
  });

  // const [engergyUsageNow ,setEngergyUsageNow ] = useState(null);

  const [remaningkwvalue,setRemainingKwValue]= useState(null);

  useEffect(()=>{
    setRemainingKwValue(objKw.maxKwValue-objKw.currentKwValue);
  },[objKw]);

  useEffect(()=>{
    loadChartData();
  },);

  const loadChartData=async()=>{
    const payload={
      deviceId:"4",
      mesurementUnitId:1,
      // mesurementUnitId:8
    }
   const result=await getEngergyUsageNow(payload);
   console.log('resultwww',result.data)
  //  {"kwh":308.02,"deviceTimeStamp":1708324999,"kwhPerSec":0,"deviceTimeStampDate_UTC":"2024-02-19T06:43:19.000Z","kwh_MeasurementValue_max":100,"kwh_MeasurementValue_min":0,"Voltage":233.4}
 
   const {kwh,kwh_MeasurementValue_max,kwh_MeasurementValue_min}=result.data;
  
  
   setObjKw({...objKw,maxKwValue:kwh_MeasurementValue_max,minKwValue:kwh_MeasurementValue_min,currentKwValue:kwh,kwhPerSeconds:objKw.kwhPerSec});
  }

  const data = {
    labels: ['kWh'],
    datasets: [
      {
        data: [objKw.currentKwValue,remaningkwvalue],
        backgroundColor: [ '#36A2EB','#F5F5DC'],
        // hoverBackgroundColor: ['#FFCE56'],
        circumference:270,
        rotation:225,
        cutout:'75%',
        borderWidth: 0,
        borderRadius: 50,
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
      ctx.fillStyle='black';
      ctx.font ='50px Trebuchet MS ';

      ctx.textAlign= 'center';
      ctx.textBaseline = 'baseline';
      ctx.fillText(data.datasets[0].data[0],centerX,centerY)
      ctx.fillText("kW",centerX,centerY +40)
    }
  }


  const options = {
    // customize chart options
    plugins: {
      legend: {
        labels: {
          color: 'Black', 
        },
      },
    },
  };

  return <Doughnut data={data} options={options} plugins={[gaugeText]}/>;
};

export default HomeChart;