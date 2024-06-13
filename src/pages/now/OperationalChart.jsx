import React from 'react'
// import Power from './Power'
// import Powerfact from './Powerfact'
// import Current from './Current'
// import Voltage from './Voltage'
// import Hertz from './Hertz'

function OperationalChart({lineNo,voltage,current,pf,hertz,power,kwh,bill,budgetedKwh,budgetedBill}) {
  return (
<div className='page-bottom'>
            
            <div className="vol">
              <h6 style={{color:'#00ff99',marginTop:'5px'}}>Voltage</h6>  
              <span>{voltage}V</span>
            </div>
            <div className="vol">
              <h6 style={{color:'#00ff99',marginTop:'5px'}}>Current</h6> 
              <span>{current}A</span>
            </div>
            <div className="vol">
              <h6 style={{color:'#00ff99',marginTop:'5px'}}>Power Fact</h6> 
              <span>{pf}pf</span>
              {/* style={{color:'#62bbfe'}} */}
            </div>
            <div className="pow">
              <h6 style={{color:'#00ff99',marginTop:'5px'}}>Power</h6> 
              <span>{power}W</span>
            </div>
            <div className="pow">
             <h6 style={{color:'#00ff99',marginTop:'5px'}}>Hertz</h6> 
              <span >{hertz}Hz</span>
            </div>
                  {/* <>
                    <div className="vol">
                      <Voltage/>
                    </div>
                    <div className="vol">
                      <Current/>
                    </div>
                    <div className="vol">
                      <Power/>
                    </div>
                    <div className="pow">
                      <Powerfact/>
                    </div>
                    <div className="pow">
                      <Hertz/>
                    </div>
                  </> */}

  </div>
  )
}

export default OperationalChart