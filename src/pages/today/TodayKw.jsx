import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement,CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);


const TodayKw = () => {
    const data={
        labels:['1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h',
    '19h','20h','21h','22h','23h','24h'
    ],
    
        datasets:[
            {
            label:'kW',
            data:[18,50,10,25,35,36,89,98,50,90,75,62,54,75,88,45,33,56,44,72,41,31,20,66],
            backgroundColor:'#36A2EB',
            borderWidath:1,
        },
        {
            label:'Rs',
            data:[80,50,15,25,35,60,89,98,10,90,70,20,54,75,88,40,77,22,51,33,66,32,47,40],
            backgroundColor:'aqua',
            borderWidath:1,
        },
    ]     
    }
    const options={
     
    }
 return(
     <Bar data={data} options={options} />
     )
     
    
}

export default TodayKw