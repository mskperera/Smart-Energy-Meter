import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {getEngergyUsageNow} from '../../action/device';


import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

const Current = () => {

  const [objC,setObjC] = useState({
    maxCValue:15,
    // minKwValue:0,
    currentCValue:0,
    mesurementUnitKw:"A",
    // kwhPerSeconds:0,
  });

  // const [engergyUsageNow ,setEngergyUsageNow ] = useState(null);

  const [remaningkwvalue,setRemainingKwValue]= useState(null);

  useEffect(()=>{
    setRemainingKwValue(objC.maxCValue-objC.currentCValue);
  },[objC]);

  useEffect(()=>{
    loadChartData();
  },);

  const loadChartData=async()=>{
    const payload={
      deviceId:"4",
      mesurementUnitId:3
    }
   const result=await getEngergyUsageNow(payload);
  //  console.log('resultwww',result.data)
  //  {"kwh":308.02,"deviceTimeStamp":1708324999,"kwhPerSec":0,"deviceTimeStampDate_UTC":"2024-02-19T06:43:19.000Z","kwh_MeasurementValue_max":100,"kwh_MeasurementValue_min":0,"Voltage":233.4}
 
   const {current}=result.data;
  
  
   setObjC({...objC,currentCValue:current});
  }

  const data = {
    // labels: ['A'],
    datasets: [
      {
        data: [objC.currentCValue,remaningkwvalue],
        backgroundColor: [ '#36A2EB','#F5F5DC'],
        // hoverBackgroundColor: ['#FFCE56'],
        circumference:270,
        rotation:225,
        cutout:'80%',
        borderWidth: 0,
        borderRadius: 25,
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
      ctx.fillStyle='white';
      ctx.font ='25px Trebuchet MS';
      ctx.textAlign= 'center';
      ctx.textBaseline = 'baseline';
      ctx.fillText(data.datasets[0].data[0],xCenter,yCenter -10)
      // ctx.fillText("A",xCenter,yCenter +10)


      ctx.fillStyle='white';
      ctx.font ='15px Trebuchet MS';
      ctx.fillText("A",xCenter,yCenter +10)

      ctx.font ='15px Trebuchet MS';
      ctx.fillText("Current",xCenter,yCenter +28)
    }
  }


  const options = {
    // customize chart options
  };

  return <Doughnut data={data} options={options} plugins={[gaugeText]} className='chart'/>;
};

export default Current;