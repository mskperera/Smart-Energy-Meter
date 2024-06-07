import React from 'react'
import KwhBillChartYear from './KwhBillChartYear';


function DeviceChartYear({device}) {
    const {lines}=device;
  return (
    <>
    {lines.map((line) => (
    <>
    <KwhBillChartYear 
            maxKwh={line.maxKwh}
            usageBill={line.usageBill}
    />
    </>
    ))}
    </>
  )
}

export default DeviceChartYear