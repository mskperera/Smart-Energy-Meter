import React from 'react'
import KwhBillChart from './KwhBillChart'

function DeviceChart({deviceName,lines}) {

const totalKwh=0;//sum of kwh;
const totalBill=0;//sum of bill;

  return (
      <>
          <div className='section' style={{marginTop:'50px'}}>
            <h3>{deviceName}</h3>
            <div>Total kwh{totalKwh}</div>
            <div>Total Bill{totalBill}</div>
          </div>
              {lines.map(line=>(
                <KwhBillChart lineNo={line.lineNo} voltage={line.voltage} current={line.current} pf={line.pf} hertz={line.hertz} power={line.power} 
                kwh={line.kwh} bill={line.bill}
                budgetedKwh={line.budgetedKwh} budgetedBill={line.budgetedBill}
                />
              )
            )}
      </>
    )
  }

export default DeviceChart;