import React from 'react';
import KwhBillChart from './KwhBillChart';
import { FaLocationDot } from 'react-icons/fa6';
import moment from 'moment';

function DeviceCharts({ device, isSearchLoading, chartFrequencty }) {
  const { deviceId, deviceName, deviceLocation, lines, sessionDetails } = device;

  const session = sessionDetails[0];
  const formattedStartDate = moment(session.startDate).format('YYYY-MM-DD');
  // const startDate = session.startDate;/
  const daysElapsed = session.daysElapsed;

  return (
    <>
      <div className='bar-chartss'>
        <div className='name-session'>
          <h6 className='name-device'>
            {deviceName} <FaLocationDot color={'red'} size={15} style={{ marginTop: '-8px' }} />{deviceLocation}
          </h6>
          <h6 className='name-device name-device-date'>{formattedStartDate} / Days Elapsed {daysElapsed}</h6>
        </div>
        {/* <h6 className='name-device'></h6> */}
        {lines.map((line, index) => (
          <KwhBillChart
            line={line}
            key={index}
            isSearchLoading={isSearchLoading}
            chartFrequencty={chartFrequencty}
          />
        ))}
      </div>
    </>
  );
}

export default DeviceCharts;
