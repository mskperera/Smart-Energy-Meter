import React from 'react'
import HomeChart from './HomeChart'
import HomeCostChart from './HomeCostChart'

function KwhBillChart({lineNo,voltage,current,pf,hertz,power,kwh,usageBill,budgetedKwh,budgetedBill}) {



  return (
    <>

            {/* <div className='page-top'>
                <div className="line">
                    <span>{lineNo}</span>
                </div>
            </div> */}

         <div className="page">
            {/* {JSON.stringify(kwh)} */}
            <div className="chart-now-kw">
                <HomeChart currentKwValue={kwh} budgetedKwhValue={budgetedKwh} />
              
            </div>
            {/* <div className='page-top'>
                <div className="line">
                    <span>{lineNo}</span>
                </div>
            </div> */}
            <div className="chart-now-cost">
             
                <HomeCostChart budgetedBill={budgetedBill} currentValue={usageBill} />
              
            </div>

          </div>


    </>
  )
}

export default KwhBillChart