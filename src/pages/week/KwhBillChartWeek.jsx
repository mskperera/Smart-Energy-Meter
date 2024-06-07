import React from 'react'
import WeekKw from './WeekKw'
import WeekCost from './WeekCost'

function KwhBillChartWeek({usageBillPerDay,kwhPerDay}) {
  return (
    
    <div className='page-4 body'>
        {/* <div className='page-2'> */}
            <div className='chart-week-kw'>
                <WeekKw kwhPerDay={kwhPerDay}/>
            </div>
            <div className='chart-week-kw'>
                <WeekCost usageBillPerDay={usageBillPerDay}/>
            </div>
        {/* </div> */}
    </div>
    
  )
}

export default KwhBillChartWeek