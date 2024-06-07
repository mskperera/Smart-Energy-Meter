import React from 'react'
import MonthKw from './MonthKw'
import MonthCost from './MonthCost'

function KwhBillChartMonth({kwhPerDay,usageBillPerDay}) {
  return (
    <>
    <div className='page-5'>
        <div className='chart-custom'>

             <div className='chart-pick-kw'>
                <MonthKw kwhPerDay={kwhPerDay}/>
              </div>
              <div className='chart-pick-cost'>
                <MonthCost usageBillPerDay = {usageBillPerDay}/>
              </div>
        </div>
    </div>
    </>
  )
}

export default KwhBillChartMonth