import React from 'react'
import KwhBillChart from './KwhBillChart'
import { FaLocationDot } from 'react-icons/fa6';


function DeviceCharts({device,isSearchLoading,chartFrequencty}) {
    const {deviceId,deviceName,deviceLocation,lines}=device;
  return (
    <>
    <div className='bar-chartss'>
      <h6 className='name-device'>{deviceName}  <FaLocationDot color={'red'} size={15} style={{marginTop:'-8px'}}/>{deviceLocation}</h6>
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