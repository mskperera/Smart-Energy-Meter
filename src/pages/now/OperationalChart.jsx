import React from 'react'
// import Power from './Power'
// import Powerfact from './Powerfact'
// import Current from './Current'
// import Voltage from './Voltage'
// import Hertz from './Hertz'
function formatValue(value, unit) {
  if (value > 1000) {
    return `${(value / 1000).toFixed(2)} k${unit}`;
  }
  return `${value} ${unit}`;
}
// page-bottom --> page-bottom-mode
function OperationalChart({lineNo,voltage,current,pf,hertz,power,kwh,bill,budgetedKwh,budgetedBill}) {
  return (
          <div className='page-bottom-mode'> 
            
            <div className="vol mode1">
              <h6 style={{color:'#4484ff',marginTop:'5px'}}>Voltage</h6>  
              <span style={{marginTop:'-5px', color:'#fff346'}}>{voltage}V</span>
            </div>
            <div className="vol mode1">
              <h6 style={{color:'#4484ff',marginTop:'5px'}}>Current</h6> 
              <span style={{marginTop:'-5px', color:'#fff346'}}>{current}A</span>
            </div>
            <div className="vol mode1">
              <h6 style={{color:'#4484ff',marginTop:'5px'}}>Power Fact</h6> 
              <span style={{marginTop:'-5px', color:'#fff346'}}>{pf}pf</span>
              {/* style={{color:'#62bbfe'}} */}
            </div>
            <div className="pow mode2">
              <h6 style={{color:'#4484ff',marginTop:'5px'}}>Power</h6> 
              <span style={{marginTop:'-5px', color:'#fff346'}}>{formatValue(power, 'W')}</span>
            </div>
            <div className="pow mode2">
             <h6 style={{color:'#4484ff',marginTop:'5px'}}>Hertz</h6> 
              <span style={{marginTop:'-5px', color:'#fff346'}}>{hertz}Hz</span>
            </div>
         </div>
  // <div className='page-bottom'>
     
  //                   <div className="">
  //                     <Voltage currentValue={voltage} budgetedValue={250}/>
  //                   </div>
  //                   <div className="">
  //                     <Current currentValue={current} budgetedValue={15}/>
  //                   </div>
  //                   <div className="">
  //                     <Power/>
  //                   </div>
  //                   <div className="">
  //                     <Powerfact/>
  //                   </div>
  //                   <div className="">
  //                     <Hertz/>
  //                   </div>
                  
  // </div>
  )
}

export default OperationalChart