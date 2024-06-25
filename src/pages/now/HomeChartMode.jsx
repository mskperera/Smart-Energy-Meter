import React from 'react';
import './Homechart.css';

const HomeChartMode = ({ currentKwValue, budgetedKwhValue }) => {
  const progressPercentage = budgetedKwhValue > 0 ? (currentKwValue / budgetedKwhValue) * 100 : 0;
  const progressColor = currentKwValue > budgetedKwhValue ? '#ff2f2f' : '#fff346'; 
  const progressBackgroundColor = '#ffffff'; 


  //progress-bar-striped
  return (
    <>
      <div className='text-p'>
        <div className="progress" style={{ height: '50px', position: 'relative', backgroundColor: progressBackgroundColor, borderRadius: '5px' }}>
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
            {currentKwValue != null ? currentKwValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'} kWh
          </div>
        </div>
        <div className="progress-info">
          <p style={{textAlign:'right'}}><i>Budgeted kWh: </i><b>{budgetedKwhValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></p>
        </div>
      </div>
    </>
  );
};

export default HomeChartMode;
