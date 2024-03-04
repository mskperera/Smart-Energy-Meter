import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {getEngergyUsageNow} from '../../action/device';

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

const Powerfact = () => {

  const [objPf,setObjPf] = useState({
    maxPfValue:1,
    // minKwValue:0,
    currentPfValue:0,
    mesurementUnitPw:"pf",
    // kwhPerSeconds:0,
  });

  // const [engergyUsageNow ,setEngergyUsageNow ] = useState(null);

  const [remaningpfvalue,setRemainingPfValue]= useState(null);

  useEffect(()=>{
    setRemainingPfValue(objPf.maxPfValue-objPf.currentPfValue);
  },[objPf]);

  useEffect(()=>{
    loadChartData();
  },);

  const loadChartData=async()=>{
    const payload={
      deviceId:"4",
      mesurementUnitId:6
    }
   const result=await getEngergyUsageNow(payload);
   console.log('resultwww',result.data)
  //  {"kwh":308.02,"deviceTimeStamp":1708324999,"kwhPerSec":0,"deviceTimeStampDate_UTC":"2024-02-19T06:43:19.000Z","kwh_MeasurementValue_max":100,"kwh_MeasurementValue_min":0,"Voltage":233.4}
 
   const {pf}=result.data;
  
  
   setObjPf({...objPf,currentPfValue:pf});
  }

  const data = {
    // labels: ['V'],
    datasets: [
      {
        data: [objPf.currentPfValue,remaningpfvalue],
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
      ctx.font ='20px Trebuchet MS';
      ctx.textAlign= 'center';
      ctx.textBaseline = 'baseline';
      ctx.fillText(data.datasets[0].data[0],xCenter,yCenter -10)
      ctx.fillText("pf",xCenter,yCenter +10)


      ctx.font = '15px Trebuchet MS ';
      ctx.fillText("PowerFactor", xCenter, yCenter + 28);
    }
  }


  const options = {
    // customize chart options
  };

  // const responsiveOptions = {
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     gaugeText: gaugeText,

  //     beforeDatasetsDraw(chart,args, pluginOption){
  //       const {ctx,data} = chart;
  
  //       const xCenter = chart.getDatasetMeta(0).data[0].x;
  //       const yCenter = chart.getDatasetMeta(0).data[0].y;
  
  //       ctx.save();
  //       ctx.fillStyle='black';
  //       ctx.font ='10px Trebuchet MS';
  //       ctx.textAlign= 'center';
  //       ctx.textBaseline = 'baseline';
  //       ctx.fillText(data.datasets[0].data[0],xCenter,yCenter)
  //       ctx.fillText("V",xCenter,yCenter +28)
  //     }
  //   },
  // };

  return <Doughnut data={data} options={options} plugins={[gaugeText]} className='chart'/>;
};

export default Powerfact;