import React from 'react'

function OperationalChart({lineNo,voltage,current,pf,hertz,power,kwh,bill,budgetedKwh,budgetedBill}) {
  return (
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
  )
}

export default OperationalChart