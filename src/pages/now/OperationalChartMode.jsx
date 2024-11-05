import React from 'react'
// import Power from './Power'
// import Powerfact from './Powerfact'
// import Current from './Current'
// import Voltage from './Voltage'
// import Hertz from './Hertz'

function OperationalChartMode({lineNo,voltage,current,pf,hertz,power,kwh,bill,budgetedKwh,budgetedBill}) {
  return (
          <div className='page-bottom-mode'>
            
            <div className="vol mode1">
              <h6 style={{color:'#4484ff',marginTop:'5px'}}>Voltage</h6>  
              <span style={{marginTop:'-5px'}}>{voltage}V</span>
            </div>
            <div className="vol mode1">
              <h6 style={{color:'#4484ff',marginTop:'5px'}}>Current</h6> 
              <span style={{marginTop:'-5px'}}>{current}A</span>
            </div>
            <div className="vol mode1">
              <h6 style={{color:'#4484ff',marginTop:'5px'}}>Power Fact</h6> 
              <span style={{marginTop:'-5px'}}>{pf}pf</span>
              {/* style={{color:'#62bbfe'}} */}
            </div>
            <div className="pow mode2">
              <h6 style={{color:'#4484ff',marginTop:'5px'}}>Power</h6> 
              <span style={{marginTop:'-5px'}}>{power}W</span>
            </div>
            <div className="pow mode2">
             <h6 style={{color:'#4484ff',marginTop:'5px'}}>Hertz</h6> 
              <span style={{marginTop:'-5px'}}>{hertz}Hz</span>
            </div>
            <div className="pow mode2">
             <h6 style={{color:'#4484ff',marginTop:'5px'}}>Hertz</h6> 
              <span style={{marginTop:'-5px'}}>{hertz}Hz</span>
            </div>
         </div>
  // <div className='page-bottom-mode'>
     
  //                   <div className="mode1">
  //                     <Voltage currentValue={voltage} budgetedValue={250}/>
  //                   </div>
  //                   <div className="mode1">
  //                     <Current currentValue={current} budgetedValue={15}/>
  //                   </div>
  //                   <div className="mode1">
  //                     <Power currentValue={power} budgetedValue={2000}/>
  //                   </div>
  //                   <div className="mode2">
  //                     <Powerfact currentValue={pf} budgetedValue={1}/>
  //                   </div>
  //                   <div className="mode2">
  //                     <Hertz currentValue={hertz} budgetedValue={55}/>
  //                   </div>
                  
  // </div>
  )
}

export default OperationalChartMode