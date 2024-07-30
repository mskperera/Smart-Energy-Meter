import React from 'react'
import HomeChart from './HomeChart'
import HomeCostChart from './HomeCostChart'
import OperationalChart from './OperationalChart'


function KwhBillChart({lineNo,voltage,current,pf,hertz,power,kwh,usageBill,budgetedKwh,budgetedBill,deviceTypeId,deviceMeasuringModeId}) {



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
            {/* <p style={{color:'white', justifyContent:'center', display:'flex'}}>Your Budget</p> */}
            <div className='d-flex justify-content-center align-items-center page'>
                <div className="page">
                    {/* {JSON.stringify(kwh)} */}
                    <div className='page-bottom-mode-new1'>
                        <div className="chart-now-kw">
                            {/* <div class="progress" style={{height:'5px'}}>
                                <div class="progress-bar progress-bar-striped" role="progressbar" style={{width: '10%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" currentKwValue={kwh} budgetedKwhValue={budgetedKwh}></div>
                            </div> */}
                            <HomeChart currentKwValue={kwh} budgetedKwhValue={budgetedKwh} deviceTypeId={deviceTypeId} deviceMeasuringModeId={deviceMeasuringModeId}/>
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
                    <div className='page-bottom-mode-new'>
                        <div className='page-bottom-mode'> 
                            <div className="vol mode1">
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
                            {/* style={{color:'#62bbfe'}} */}
                            </div>
                            <div className="pow mode2">
                            <h6 style={{color:'#00bbf0',marginTop:'5px'}}>Power</h6> 
                            <span style={{marginTop:'-5px', color:'#fffff'}}>{power}W</span>
                            </div>
                            <div className="pow mode2">
                            <h6 style={{color:'#00bbf0',marginTop:'5px'}}>Hertz</h6> 
                            <span style={{marginTop:'-5px', color:'#fffff'}}>{hertz}Hz</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


    </>
  )
}

export default KwhBillChart