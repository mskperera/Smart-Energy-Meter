import React from 'react'
import HomeChart from './HomeChart'
import HomeCostChart from './HomeCostChart'

function KwhBillChart({lineNo,voltage,current,pf,hertz,power,kwh,bill,budgetedKwh,budgetedBill}) {

    const objKw={budgetedKwhValue:budgetedKwh , currentKwValue:kwh};
    const objBill={budgetedBillValue:budgetedBill , currentBillValue:bill};

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
             
                <HomeChart objKw={objKw} />
              
            </div>
            <div className='page-top'>
                <div className="line">
                    <span>{lineNo}</span>
                </div>
            </div>
            <div className="chart-now-cost">
             
                <HomeCostChart objBill={objBill}  />
              
            </div>

          </div>

          <div className='page-bottom'>
            
                    <div className="vol">
                      <h5>Voltage</h5>  
                      <span>{voltage}</span>
                    </div>
                    <div className="vol">
                      <h5>Current</h5> 
                      <span>{current}</span>
                    </div>
                    <div className="vol">
                      <h5>Power Fact</h5> 
                      <span>{pf}</span>
                    </div>
                    <div className="pow">
                      <h5>Power</h5> 
                      <span>{power}</span>
                    </div>
                    <div className="pow">
                     <h5>Hertz</h5> 
                      <span>{hertz}</span>
                    </div>

          </div>
    </>
  )
}

export default KwhBillChart