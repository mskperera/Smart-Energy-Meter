import React, { useEffect, useState } from 'react'

// import { Doughnut } from 'react-chartjs-2';
import '../Home.css'
import {getEngergyUsageNow} from '../../../action/device';
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
// import { FaCoins } from "react-icons/fa";
ChartJS.register(ArcElement, Tooltip);

function CostChartData  ()  {
  const [obj,setObj]=useState({
    maxValue:100000,
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
    }
   const result=await getEngergyUsageNow(payload);
 
   const {usageBill}=result.data;
  
  
   setObj({...obj,currentValue:usageBill});
  }


  // const data = {
  //   labels: ['Used Budget', `Remaining Rs : ${remaningvalue ? remaningvalue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","  ) : 0}`],
  
  //   datasets: [
  //     {
  //       data: [obj.currentValue,remaningvalue],
  //       backgroundColor: ['#ff0066','#F5F5DC'],
  //       circumference:270,
  //       rotation:225,
  //       cutout:'80%',
  //       borderWidth: 0,
  //       borderRadius: 0, 
  //     },
  //   ],
  // };

  // const gaugeText={
  //   id:'gaugeText',
  //   beforeDatasetsDraw(chart,args, pluginOption){
  //     const {ctx,data,chartArea:{top,bottom,left,right,width,height}} = chart;

  //     const xCenter = chart.getDatasetMeta(0).data[0].x;
  //     const yCenter = chart.getDatasetMeta(0).data[0].y;

  //     ctx.save();
  //     ctx.font ='45px Trebuchet MS ';
  //     ctx.textAlign = 'center';
  //     ctx.textBaseline = 'baseline';
  //     ctx.fillText(data.datasets[0].data[0] ? data.datasets[0].data[0].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '', xCenter, yCenter);
      
  //     ctx.fillStyle = 'white';

  //     ctx.font = '30px Trebuchet MS ';
  //     ctx.fillText("Rs", xCenter, yCenter + 40)

  //     ctx.font = '20px Trebuchet MS ';
  //     ctx.fillText("Usage Bill", xCenter, yCenter + 80);

    
  
  //   }
  // }

  // const options = {
  //   plugins: {
  //     legend: {
  //       position: 'bottom',
  //       labels: {
  //         color: 'white',
  //         usePointStyle: true,
  //         pointStyle: 'square', 
  //       },
  //     },
  //   },
  // };


  return(
    <div className='text-p'> 
    <div className='text2'>
      <h2 className='  d-flex justify-content-center align-items-center'>Budget</h2>
        <p className='  d-flex justify-content-center align-items-center'>{obj.maxValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Rs</p>
    </div>
      {/* <FaCoins size={45} className='icon'/> */}
      {/* <Doughnut data={data} options={options} plugins={[gaugeText]} className='chart' id='box' /> */}
    </div>
   ) 
};

export default CostChartData;