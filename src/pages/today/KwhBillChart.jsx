import React from 'react'
import TodayKw from './TodayKw'
import TodayCost from './TodayCost'

function KwhBillChart({line,isSearchLoading,chartFrequencty}) {
  const {days}=line;
  return (
    <>
      <div className="page-5">
        <h5>{line.lineNo}</h5>
        <div className="chart-custom">
          {/* {JSON.stringify(days)} */}
          <div className="chart-pick-kw">
            <TodayKw days={days} isSearchLoading={isSearchLoading} chartFrequencty={chartFrequencty} />
          </div>
          <div className="chart-pick-cost">
            <TodayCost  days={days} isSearchLoading={isSearchLoading} chartFrequencty={chartFrequencty} />
            
            </div>
        </div>
      </div>
    </>
  );
}

export default KwhBillChart