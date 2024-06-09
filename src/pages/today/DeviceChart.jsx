import React from 'react'
import KwhBillChart from './KwhBillChart'


function DeviceCharts({device,isSearchLoading}) {
    const {deviceId,deviceName,lines}=device;
  return (
    <>
    <h2>Device {deviceId}</h2>
     {lines.map((line,index) => (
        
            <KwhBillChart 
            line={line}
            key={index}
            isSearchLoading={isSearchLoading}
        />
       
      ))} 
        
    </>
  )
}

export default DeviceCharts