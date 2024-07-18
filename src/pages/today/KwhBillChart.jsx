import React from 'react'
import TodayKw from './TodayKw'
import TodayCost from './TodayCost'
// import CombinedChart from './CombinedChart';

function KwhBillChart({line,isSearchLoading,chartFrequencty}) {
  const {days}=line;
  return (
    <>
    {/* <div className='bar-charts'>       */}
      {/* <div className="page-5"> */}
        <h5 className='page-5-h5' style={{marginBottom:'5px'}}>{line.lineNo}</h5>
        <div className="page" style={{marginBottom:'5px'}}>
      {/* <CombinedChart days={days} isSearchLoading={isSearchLoading} chartFrequencty={chartFrequencty} /> */}
          <div className="chart-now-kw" style={{padding:'5px'}}>
            <TodayKw days={days} isSearchLoading={isSearchLoading} chartFrequencty={chartFrequencty} />
          </div>
          <div className="chart-now-cost" style={{padding:'5px'}}>
            <TodayCost  days={days} isSearchLoading={isSearchLoading} chartFrequencty={chartFrequencty} />
            </div>
        </div>
      {/* </div> */}
    {/* </div> */}
    </>
  );
}

export default KwhBillChart