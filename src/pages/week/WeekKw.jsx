import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

const WeekKw = () => {
    const data={
        labels:['Week1','Week2','Week3','Week4'],
    
        datasets:[
            {
            label:'kW',
            data:[24,50,30,25],
            backgroundColor:'#36A2EB',
            borderWidath:1,
        },
        {
            label:'Rs',
            data:[35,70,60,50],
            backgroundColor:'aqua',
            borderWidath:1,
        },
    ]     
    }
    const options={

    }
 return <Bar data={data} options={options}/>
}

export default WeekKw