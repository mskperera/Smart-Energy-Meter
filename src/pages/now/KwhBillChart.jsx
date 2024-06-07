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
            {/* <div class="progress" style={{height:'5px'}}>
                <div class="progress-bar progress-bar-striped" role="progressbar" style={{width: '10%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            </div> */}

         <div className="page">
            {/* {JSON.stringify(kwh)} */}
            <div className="chart-now-kw">
                {/* <div class="progress" style={{height:'5px'}}>
                    <div class="progress-bar progress-bar-striped" role="progressbar" style={{width: '10%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" currentKwValue={kwh} budgetedKwhValue={budgetedKwh}></div>
                </div> */}
                <HomeChart currentKwValue={kwh} budgetedKwhValue={budgetedKwh} />
            </div>
            {/* <div className='page-top'>
                <div className="line">
                    <span>{lineNo}</span>
                </div>
            </div> */}
            <div className="chart-now-cost">
                {/* <div class="progress" style={{height:'5px'}}>
                    <div class="progress-bar progress-bar-striped" role="progressbar" style={{width: '10%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" currentValue={usageBill} budgetedBill={budgetedBill}></div>
                </div> */}
                <HomeCostChart currentValue={usageBill} budgetedBill={budgetedBill} />
            </div>

          </div>


    </>
  )
}

export default KwhBillChart