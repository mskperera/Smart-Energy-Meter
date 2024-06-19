import React from 'react'
// import HomeChart from './HomeChart'
// import HomeCostChart from './HomeCostChart'
import HomeChartMode from './HomeChartMode'
import HomeCostChartMode from './HomeCostChartMode'

function KwhBillChartMode({lineNo,voltage,current,pf,hertz,power,kwh,usageBill,budgetedKwh,budgetedBill}) {



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

         <div className="page-mode">
            {/* {JSON.stringify(kwh)} */}
            {/* <div className='page-mode-charts'> */}
                <div className="chart-now-mode">
                    {/* <div className="progress" style={{height:'5px'}}>
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={kwh} aria-valuemin="0" aria-valuemax={budgetedKwh} style={{width: '75%'}} ></div>
                    </div> */}
                    <HomeChartMode currentKwValue={kwh} budgetedKwhValue={budgetedKwh}/>
                    {/* <HomeChart currentKwValue={kwh} budgetedKwhValue={budgetedKwh} /> */}
                </div>
                {/* <div className='page-top'>
                    <div className="line">
                        <span>{lineNo}</span>
                    </div>
                </div> */}
                <div className="chart-now-mode">
                    {/* <div className="progress" style={{height:'5px'}}>
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={usageBill} aria-valuemin="0" aria-valuemax={budgetedBill} style={{width: '75%'}} ></div>
                    </div> */}
                    <HomeCostChartMode currentValue={usageBill} budgetedBill={budgetedBill}/>
                    {/* <HomeCostChart currentValue={usageBill} budgetedBill={budgetedBill} /> */}
                </div>
            {/* </div> */}

          </div>


    </>
  )
}

export default KwhBillChartMode