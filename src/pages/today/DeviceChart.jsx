import React from 'react'
import KwhBillChart from './KwhBillChart'


function DeviceCharts({device,isSearchLoading,chartFrequencty}) {
    const {deviceId,deviceName,lines}=device;
  return (
    <>
    <div className='bar-chartss'>
      <h6 className='name-device'>Device: {deviceName}</h6>
      {lines.map((line,index) => (
          
              <KwhBillChart 
              line={line}
              key={index}
              isSearchLoading={isSearchLoading}
              chartFrequencty={chartFrequencty}
          />
        
        ))} 

    </div>
        
    </>
  )
}

export default DeviceCharts