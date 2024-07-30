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
// page-bottom --> page-bottom-mode  #fff346
function OperationalChart({lineNo,voltage,current,pf,hertz,power,kwh,bill,budgetedKwh,budgetedBill}) {
  return (
          <div className='page-bottom-mode'> 
            
            {/* <div className="vol mode1">
              <h6 style={{color:'#00bbf0',marginTop:'5px'}}>Voltage</h6>  
              <span style={{marginTop:'-5px', color:'#fffff'}}>{voltage}V</span>
            </div>
            <div className="vol mode1">
              <h6 style={{color:'#00bbf0',marginTop:'5px'}}>Current</h6> 
              <span style={{marginTop:'-5px', color:'#fffff'}}>{current}A</span>
            </div>
            <div className="vol mode1">
              <h6 style={{color:'#00bbf0',marginTop:'5px'}}>Power Fact</h6> 
              <span style={{marginTop:'-5px', color:'#fffff'}}>{pf}pf</span>
              
            </div>
            <div className="pow mode2">
              <h6 style={{color:'#00bbf0',marginTop:'5px'}}>Power</h6> 
              <span style={{marginTop:'-5px', color:'#fffff'}}>{formatValue(power, 'W')}</span>
            </div>
            <div className="pow mode2">
             <h6 style={{color:'#00bbf0',marginTop:'5px'}}>Hertz</h6> 
              <span style={{marginTop:'-5px', color:'#fffff'}}>{hertz}Hz</span>
            </div> */}
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