import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {getEngergyUsageNow} from '../../action/device';
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { FaMoneyBill1Wave } from "react-icons/fa6";
ChartJS.register(ArcElement, Tooltip);

const HomeCostChart = () => {
  const [obj,setObj]=useState({
    maxValue:50000,
    minValue:0,
    currentValue:0,
    mesurementUnit:"Rs"
    });
 
  const [remaningvalue,setRemainingValue]=useState(null)

  useEffect(()=>{
    setRemainingValue(obj.maxValue-obj.currentValue)
  },[
    obj
  ])

  useEffect(()=>{
    loadChartData();
  },);

  const loadChartData=async()=>{
    const payload={
      deviceId:"4",
      mesurementUnitId:1,
      // mesurementUnitId:1,
    }
   const result=await getEngergyUsageNow(payload);
   console.log('resultwww',result.data)
  //  {"kwh":308.02,"deviceTimeStamp":1708324999,"kwhPerSec":0,"deviceTimeStampDate_UTC":"2024-02-19T06:43:19.000Z","kwh_MeasurementValue_max":100,"kwh_MeasurementValue_min":0,"Voltage":233.4}
 
   const {usageBill}=result.data;
  
  
   setObj({...obj,currentValue:usageBill});
  }


  const data = {
    // labels: ['Label 1', 'Label 2', 'Label 3'],
    // labels: ['Rs.'],
    datasets: [
      {
        data: [obj.currentValue,remaningvalue],
        // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        backgroundColor: ['#ff0066','#F5F5DC'],
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
    beforeDatasetsDraw(chart,args, pluginOption){
      const {ctx,data} = chart;

      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.fillStyle='white';
      ctx.font ='50px Trebuchet MS ';
      ctx.textAlign= 'center';
      ctx.textBaseline = 'baseline';
      ctx.fillText(data.datasets[0].data[0],xCenter,yCenter)
      
      ctx.font ='30px Trebuchet MS ';
      ctx.fillText("Rs",xCenter,yCenter +40)

      ctx.font = '20px Trebuchet MS ';
      ctx.fillText("Usage Bill", xCenter, yCenter + 80);
    }
  }

  const options = {
    // customize chart options
    plugins: {
      legend: {
        labels: {
          color: 'black', // specify the color for the chart labels
        },
      },
    },
  };


  return(
    <div> 
      <FaMoneyBill1Wave size={45} color='#36A2EB' className='icon'/>
      <Doughnut data={data} options={options} plugins={[gaugeText]} className='chart' id='box' />
    </div>
   ) 
};

export default HomeCostChart;