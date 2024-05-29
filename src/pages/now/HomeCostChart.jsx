import React, { useEffect, useRef, useState } from 'react'

import { Doughnut } from 'react-chartjs-2';
import './Homechart.css'
import {getEngergyUsageNow} from '../../action/device';
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useSelector } from 'react-redux';
import { getBudgetedValues } from '../../action/deviceSettings';
// import { FaMoneyBill1Wave } from "react-icons/fa6";
// import { FaSackDollar } from "react-icons/fa6";
// import { BiSolidDollarCircle } from "react-icons/bi";
// import { FaCoins } from "react-icons/fa";
ChartJS.register(ArcElement, Tooltip);

const HomeCostChart = ({selectedDevice, budgetedValueAmount}) => {

// const [budgetedValues,setBudgetedValues]=useState('');
// const budgetedValuesRef=useRef(budgetedValues);


const [device, setDevice] = useState('');

const deviceNames = useSelector((state) => state.device.dropDeviceList);
const defaultSelctedDevie = deviceNames[0];

useEffect(() => {
  setDevice(defaultSelctedDevie);
}, [deviceNames]);

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
  },[selectedDevice]);

  // useEffect(() => {
  //   if (device) {
  //     const deviceId = device.id || defaultSelctedDevie.id;
  //     loadBudgetedValues(deviceId);
  //   }
  // }, [device]);

  // const loadBudgetedValues = async (deviceId) => {
  //   const result = await getBudgetedValues(deviceId);
  //   const budgetedValue = result.data;
  //   console.log('budgetedValue',budgetedValue)
  //   setBudgetedValues(budgetedValue.billAmount);
  //   budgetedValuesRef.current = budgetedValue.billAmount;
  // };

  const loadChartData=async()=>{
    const payload={
      deviceId:selectedDevice.id,//"4",
      mesurementUnitId:1,
      // mesurementUnitId:1,
    }
   const result=await getEngergyUsageNow(payload);
  //  console.log('resultwww',result.data)
  //  {"kwh":308.02,"deviceTimeStamp":1708324999,"kwhPerSec":0,"deviceTimeStampDate_UTC":"2024-02-19T06:43:19.000Z","kwh_MeasurementValue_max":100,"kwh_MeasurementValue_min":0,"Voltage":233.4}
 
   const {usageBill}=result.data;
  
  
   setObj({...obj,currentValue:usageBill});
  }


  const data = {
    // labels: ['Label 1', 'Label 2', 'Label 3'],
    // labels: ['Used Budget', `Remaining Budget ${remaningvalue.toFixed(2)}`],
    labels: ['Used Amount', `Remaining Rs : ${remaningvalue ? remaningvalue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","  ) : 0}`],
  
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
        budgetedValueAmount,
      },
    ],
  };

  const gaugeText={
    id:'gaugeText',
    beforeDatasetsDraw(chart,args, pluginOption){
      const {ctx,data,chartArea:{top,bottom,left,right,width,height}} = chart;

      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      // ctx.fillStyle='black';
      ctx.font ='40px Trebuchet MS ';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'baseline';
      // ctx.fillText(data.datasets[0].data[0] ? data.datasets[0].data[0].toFixed(2) : '', xCenter, yCenter);
      // ctx.strokeStyle = 'white';
      // ctx.lineWidth = 1;
      // ctx.strokeText(data.datasets[0].data[0], xCenter, yCenter);
      // ctx.strokeStyle = 'black';
      // ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.fillText(data.datasets[0].data[0] ? data.datasets[0].data[0].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '', xCenter, yCenter );
      // ctx.fillText(data.datasets[0].data[0], xCenter, yCenter);

      ctx.font = '30px Trebuchet MS ';
      ctx.fillText("Rs", xCenter, yCenter + 40)

      ctx.font = '20px Trebuchet MS ';
      ctx.fillText("Usage Amount", xCenter, yCenter + 80);


      ctx.font = '15px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.fillText("Budget", xCenter, yCenter -90);

      ctx.font = '25px Trebuchet MS';
      ctx.fillStyle = 'white';
      ctx.fillText(`Rs ${data.datasets[0].budgetedValueAmount}`, xCenter, yCenter - 60);

      // const xCoor = chart.getDatasetMeta(0).data[0].x;
      // const yCoor = chart.getDatasetMeta(0).data[0].y;

      // // ctx.fillRect(xCoor, yCoor, -200, 1);
      // ctx.font = '20px Trebuchet MS ';
      // ctx.fillStyle = 'white';
      // ctx.textBaseline = 'top';
      // ctx.textAlign = 'left';
      // ctx.fillText('0',left, yCoor +100);
  
    }
  }

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          usePointStyle: true,
          pointStyle: 'square', 
        },
      },
    },
  };


  return(
    <div className='text-p'> 
      {/* <p className=' text d-flex justify-content-center align-items-center'>Budgeted : {obj.maxValue.toFixed(2)} Rs</p> */}
      {/* <FaCoins size={45} className='icon'/> */}
      {/* <div>
       <img src='../../../public/image/coins.png' alt="money" className='image'/>
      </div> */}
      <Doughnut data={data} options={options} plugins={[gaugeText]} className='chart3' id='box3' />
    </div>
   ) 
};

export default HomeCostChart;