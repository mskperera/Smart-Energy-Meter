import React from 'react'
import KwhBillChart from './KwhBillChart'


function DeviceCharts({device}) {
    const {lines}=device;
  return (
    <>
    {/* {JSON.stringify(device)} */}
    {/* {JSON.stringify(line)} */}
     {lines.map((line,index) => (
        
        line.days.map((day,dayIndex)=>(
            <KwhBillChart 
            key={`${index}-${dayIndex}`}
            kwhPerHour={day.lines[0].kwhPerHour}
            usageBillPerHour={day.lines[0].usageBillPerHour}
        //    kwhPerHour={lines.kwhPerHour}
        //    usageBillPerHour={lines.usageBillPerHour}
        />
        ))
        
      ))} 
        
    </>
  )
}

export default DeviceCharts