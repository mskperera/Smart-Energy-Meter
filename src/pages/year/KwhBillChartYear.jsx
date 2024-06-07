import React from 'react'
import YearKw from './YearKw'
import YearCost from './YearCost'

function KwhBillChartYear({maxKwh,usageBill}) {
  return (
    <div className='page-4 body'>
          <div className='chart-year-kw'>
             <YearKw maxKwh={maxKwh} />
          </div>
          <div className='chart-year-cost'>
             <YearCost usageBill={usageBill} />
          </div>
    </div>
  )
}

export default KwhBillChartYear