import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);

const MonthKw = () => {
    const data={
        labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    
        datasets:[
            {
            label:'kW',
            data:[18,50,10,25,35,36,89,98,50,90,75,62],
            backgroundColor:'#36A2EB',
            borderWidath:1,
        },
        {
            label:'Rs',
            data:[60,89,98,10,90,70,20,54,75,88,40,10],
            backgroundColor:'aqua',
            borderWidath:1,
        },
    ]     
    }
    const options={

    }
 return <Bar data={data} options={options}/>
}
export default MonthKw