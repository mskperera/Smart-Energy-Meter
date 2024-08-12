import React from 'react'
import HomeChart from './HomeChart'
import HomeCostChart from './HomeCostChart'
import OperationalChart from './OperationalChart'
import LineChartCost from './LineChartCost'


function KwhBillChart({lineNo,device,voltage,current,pf,hertz,power,kwh,usageBill,budgetedKwh,budgetedBill,deviceTypeId,deviceMeasuringModeId}) {



  return (
    <>
            <div className='d-flex justify-content-center align-items-center page'>
                <div className="page">
                    
                    <div className='page-bottom-mode-new1'>
                        <div className="chart-now-kw">
                           
                            <HomeChart currentKwValue={kwh} budgetedKwhValue={budgetedKwh} deviceTypeId={deviceTypeId} deviceMeasuringModeId={deviceMeasuringModeId}/>
                        </div>
                       
                        <div className="chart-now-cost">
                           
                            <HomeCostChart currentValue={usageBill} budgetedBill={budgetedBill} deviceTypeId={deviceTypeId} deviceMeasuringModeId={deviceMeasuringModeId}/>
                        </div>
                    </div>
                    <div className='page-bottom-mode-new'>
                        <div className='page-bottom-mode'> 
                            <div className="vol mode1">
                            <h6 style={{marginTop:'5px'}}>Voltage</h6>  
                            <span style={{marginTop:'-5px'}}>{voltage}V</span>
                            </div>
                            <div className="vol mode1">
                            <h6 style={{marginTop:'5px'}}>Current</h6> 
                            <span style={{marginTop:'-5px'}}>{current}A</span>
                            </div>
                            <div className="vol mode1">
                            <h6 style={{marginTop:'5px'}}>Power Fact</h6> 
                            <span style={{marginTop:'-5px'}}>{pf}pf</span>
                           
                            </div>
                            <div className="pow mode2">
                            <h6 style={{marginTop:'5px'}}>Power</h6> 
                            <span style={{marginTop:'-5px'}}>{power}W</span>
                            </div>
                            <div className="pow mode2">
                            <h6 style={{marginTop:'5px'}}>Hertz</h6> 
                            <span style={{marginTop:'-5px'}}>{hertz}Hz</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    </>
  )
}

export default KwhBillChart