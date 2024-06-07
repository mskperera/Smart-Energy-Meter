import React from 'react'
import KwhBillChart from './KwhBillChart'


function DeviceCharts({deviceName,device}) {
    const {days}=device;
  return (
    <>
    {JSON.stringify(device)}
     {/* {lines.map((line) => ( */}
        <>
        {/* {JSON.stringify(line)} */}
        {/* <KwhBillChart 
           kwhPerHour={line.kwhPerHour}
           usageBillPerHour={line.usageBillPerHour}
        /> */}
        </>
      {/* ))} */}
        
    </>
  )
}

export default DeviceCharts