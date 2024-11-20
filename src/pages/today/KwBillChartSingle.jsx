import React from 'react'
import TodayKw from './TodayKw'
import TodayCost from './TodayCost'
import TodayKwSingle from './TodayKwSingle';
import TodayCostSingle from './TodayCostSingle';
// import CombinedChart from './CombinedChart';

function KwBillChartSingle({line,chartLineOne,isSearchLoading,chartFrequencty}) {
  const {days}=line;
  
  return (
    <>
    {/* <div className='bar-charts'>       */}
      {/* <div className="page-5"> */}
        {/* <h5 className='page-5-h5' style={{marginBottom:'10px', color:'white'}}>{line.lineNo}</h5> */}
        <div className="page" style={{marginBottom:'5px'}}>
      {/* <CombinedChart days={days} isSearchLoading={isSearchLoading} chartFrequencty={chartFrequencty} /> */}
          <div className="chart-now-kw" style={{padding:'5px'}}>
            <TodayKwSingle days={days} chartValueOne={chartLineOne}  isSearchLoading={isSearchLoading} chartFrequencty={chartFrequencty} />
          </div>
          <div className="chart-now-cost" style={{padding:'5px'}}>
            <TodayCostSingle  days={days} chartValueOne={chartLineOne}  isSearchLoading={isSearchLoading} chartFrequencty={chartFrequencty} />
          </div>
        </div>
      {/* </div> */}
    {/* </div> */}
    </>
  );
}

export default KwBillChartSingle