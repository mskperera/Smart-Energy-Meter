import React from 'react'
import KwhBillChart from './KwhBillChart'


function DeviceCharts({device,isSearchLoading,chartFrequencty}) {
    const {deviceId,deviceName,lines}=device;
  return (
    <>
    <h4>Device {deviceName}</h4>
     {lines.map((line,index) => (
        
            <KwhBillChart 
            line={line}
            key={index}
            isSearchLoading={isSearchLoading}
            chartFrequencty={chartFrequencty}
        />
       
      ))} 
        
    </>
  )
}

export default DeviceCharts