import React from 'react';
import './Homechart.css';

const HomeCostChartMode = ({ budgetedBill, currentValue, selectedLine }) => {
  const progressPercentage = budgetedBill > 0 ? (currentValue / budgetedBill) * 100 : 0;
  const progressColor = currentValue > budgetedBill ? '#ff2f2f' : '#fe4a92'; //#fe4a92,#ff0066
  const progressBackgroundColor = '#ffffff'; //#ff2d2d,#ff0000
  const remainingValue = budgetedBill - currentValue;

  return (
    <>
      <div className='text-p'>
        <div className="progress" style={{ height: '50px', position: 'relative', backgroundColor: progressBackgroundColor }}>
          <div
            className="progress-bar progress-bar-animated"
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${progressPercentage}%`, backgroundColor: progressColor, borderRadius: '0px' }}
          ></div>
          <div
            className="progress-bar-text"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'black',
              fontWeight: 'bold'
            }}
          >
            Rs {currentValue != null ? currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
          </div>
          <div
            className="progress-bar-text-remaining"
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              color: 'black',
              fontWeight: 'bold'
            }}
          >
          </div>
        </div>
        <div className="progress-info">
          <p style={{textAlign:'right'}}><i>Budgeted Rs: </i><b>{budgetedBill != null ? budgetedBill.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}</b></p>
          {/* <p style={{textAlign:'left', display:'flex', marginTop:'-40px'}}>Rs {remainingValue != null ? remainingValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'} remaining</p> */}
        </div>
        
      </div>
    </>
  );
};

export default HomeCostChartMode;
