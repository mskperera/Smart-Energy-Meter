import React from 'react'
import KwhBillChartWeek from './KwhBillChartWeek';

function DeviceChartWeek({device}) {
    const {lines}=device;
  return (
    <>
    {lines.map((line) => (
        <>
        <KwhBillChartWeek 
              kwhPerDay={line.kwhPerDay}
              usageBillPerDay={line.usageBillPerDay}
        />
        </>
      ))}
    </>
  )
}

export default DeviceChartWeek