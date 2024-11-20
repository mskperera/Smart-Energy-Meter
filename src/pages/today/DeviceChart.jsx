import React from 'react';
import KwhBillChart from './KwhBillChart';
import { FaLocationDot } from 'react-icons/fa6';
import moment from 'moment';
import { ProgressBar } from 'react-bootstrap';
import { MdPermDeviceInformation } from 'react-icons/md';
import KwBillChartSingle from './KwBillChartSingle';

function DeviceCharts({ device,chartLineOne,chartLineTwo,chartLineThree, isSearchLoading, chartFrequencty }) {
  const { deviceId, deviceName, deviceLocation, lines, sessionDetails } = device;

  const session = sessionDetails[0];
  const formattedStartDate = moment(session.startDate).format('YYYY MMM DD');
  const formattedEndDate = moment(session.endDate).format('YYYY MMM DD');

  // const startDate = session.startDate;/
  const daysElapsed = session.daysElapsed;
  const maxDays = session.numberOfDays;

  const remainingDays = maxDays - daysElapsed;
  
  console.log('line data -----', chartLineOne);
  console.log('line data -----', chartLineTwo);
  console.log('line data -----', chartLineThree);

  return (
    <>
      <div className='bar-chartss'>
        <div className='name-session' style={{marginTop:'-4px'}}>
          <div>
            <h6 className='name-device'>
            <MdPermDeviceInformation size={18} style={{marginTop:'-10px', color:"grey"}}/>{deviceName} <FaLocationDot color={'red'} size={15} style={{ marginTop: '-8px' }} />{deviceLocation}
            </h6>
          </div>
          <div style={{marginTop:'30px'}}>
            {/* <h6 className='name-device name-device-date'>Start Date: {formattedStartDate} / End Date: {formattedEndDate} Days Elapsed {daysElapsed}</h6> */}
            <div className="days-bar-two">
                  <h6 style={{marginTop:'-30px', position:'relative', marginLeft:'5px',paddingBottom:'5px'}}>{formattedStartDate} / {formattedEndDate}</h6>
                <div className="d-flex justify-content-start">
                  <span className="session-number"></span>&nbsp;
                  <div className="progress d-flex justify-content-start">
                   <ProgressBar now={daysElapsed} 
                    max={maxDays} 
                    className="progress-bar progress-bar1" 
                    style={{ width: `${(daysElapsed / maxDays) * 100}%` }}>
                   <span 
                      style={{ 
                        position: 'inherit', 
                        left: '0%', 
                        transform: 'translateX(0%)',
                        fontWeight: '600',
                        color: 'white', 
                      }}
                    >
                      {daysElapsed}
                    </span>
                   </ProgressBar>
                   <span 
                      style={{ 
                        position: 'inherit', 
                        right: '5px', 
                        transform: 'translateX(0%)',
                        fontWeight: '550',
                        color: '#00bbf0', 
                      }}
                    >
                      {remainingDays}
                    </span>   
                  {/* /> */}
                  </div>
                  &nbsp;<span className="session-number"> &nbsp;</span>
                </div>
            </div>
          </div>
        </div>
        {/* <h6 className='name-device'></h6> */}
        {/* {lines.map((line, index) => (
          <KwhBillChart
            line={line}
            key={index}
            isSearchLoading={isSearchLoading}
            chartFrequencty={chartFrequencty}
          />  
        ))} */}
          {/* {JSON.stringify(device)} */}
        {/* {lines.map((line, index) => ( */}
          {/* <div key={index}> */}

          {device.deviceTypeId === 2 ? (
          <KwhBillChart
            line={lines[0]}
            chartLineOne={chartLineOne}
            chartLineTwo={chartLineTwo}
            chartLineThree={chartLineThree}
            isSearchLoading={isSearchLoading}
            chartFrequencty={chartFrequencty}
          />
        ) : (
          <KwBillChartSingle
            line={lines[0]}
            chartLineOne={chartLineOne}
            // chartLineTwo={chartLineTwo}
            // chartLineThree={chartLineThree}
            isSearchLoading={isSearchLoading}
            chartFrequencty={chartFrequencty}
          />
        )}
          {/* </div> */}
        {/* ))} */}
      </div>
    </>
  );
}

export default DeviceCharts;
