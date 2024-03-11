import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {getEngergyUsageNow} from '../../action/device';
// import { TbHomeStats } from "react-icons/tb";
import './Homechart.css'
import { TbHomeStats } from "react-icons/tb";
import { Chart as ChartJS, ArcElement, Tooltip, Colors } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

const HomeChart = () => {

  const [objKw,setObjKw] = useState({

    // maxKwValue:1000,
    // minKwValue:0,
    // currentKwValue:0,
    // mesurementUnitKw:"kW",
    maxKwValue:1000,
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
  
  
   setObjKw({...objKw,currentKwValue:kwh});
  }

  const data = {
    // labels: ['Used kWh'],
    datasets: [
      {
        data: [objKw.currentKwValue,remaningkwvalue],
        backgroundColor: [ '#00ff99','#F5F5DC'],
        // hoverBackgroundColor: ['#FFCE56'],
        circumference:270,
        rotation:225,
        cutout:'80%',
        borderWidth: 0,
        borderRadius: 0,
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
      ctx.font ='50px Trebuchet MS ';

      ctx.textAlign= 'center';
      ctx.textBaseline = 'baseline';
      ctx.fillText(data.datasets[0].data[0],centerX,centerY)
      // ctx.fillText("kWh",centerX,centerY +40)

      // ctx.fillText(<TbHomeStats color='white' size={10}/>, centerX, centerY  -10);

      ctx.font = '30px Trebuchet MS ';
      ctx.fillText("kWh", centerX, centerY + 40);

      ctx.font = '20px Trebuchet MS ';
      ctx.fillText("Energy Usage", centerX, centerY + 80);
    
    }
  }


  const options = {
    // customize chart options
    plugins: {
      legend: {
        labels: {
          color: 'white', 
        },
      },
    },
  };

  


  return(
    <div>
      <TbHomeStats color='#36A2EB' size={45} className='icon'/>
      <Doughnut data={data} options={options} plugins={[gaugeText]} id='box' className='chart'/> 
    </div>
  );
  
};

export default HomeChart;