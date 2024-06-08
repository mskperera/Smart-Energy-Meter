import React from 'react'
import TodayKw from './TodayKw'
import TodayCost from './TodayCost'

function KwhBillChart({kwhPerHour,usageBillPerHour}) {
  return (
    <>
            <div className='page-5'>

            <div className='chart-custom'>
              {/* <div className='chart-today-kw'> */}
              {/* {JSON.stringify(line)} */}
              <div className='chart-pick-kw'>
                <TodayKw kwhPerHour={kwhPerHour}/>
              </div>
              {/* <div className='chart-today-cost'> */}
              <div className='chart-pick-cost'>
                <TodayCost usageBillPerHour={usageBillPerHour}/>
              </div>
            </div>
            </div>
    </>
  )
}

export default KwhBillChart