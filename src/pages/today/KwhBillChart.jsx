import React from 'react'
import TodayKw from './TodayKw'
import TodayCost from './TodayCost'

function KwhBillChart({line,isSearchLoading}) {
  const {days}=line;
  return (
    <>
      <div className="page-5">
        <h2>{line.lineNo}</h2>
        <div className="chart-custom">
          <div className="chart-pick-kw">
            <TodayKw days={days} isSearchLoading={isSearchLoading} />
          </div>
          <div className="chart-pick-cost">
            <TodayCost  days={days} isSearchLoading={isSearchLoading} />
            
            </div>
        </div>
      </div>
    </>
  );
}

export default KwhBillChart