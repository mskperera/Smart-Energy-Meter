import React from 'react'
import KwhBillChartMonth from './KwhBillChartMonth';

function DeviceChartMonth({deviceName,device}) {
    const {lines}=device;
  return (
    <>
    {lines.map((line) => (
        <>
        <KwhBillChartMonth
              kwhPerDay={line.kwhPerDay}
              usageBillPerDay={line.usageBillPerDay}
        />
        </>
        ))}
    </>
  )
}

export default DeviceChartMonth