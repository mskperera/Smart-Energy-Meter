import React, { useEffect, useState } from 'react';
import './Today.css';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/bottommenu/BottomNav';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DeviceChart from './DeviceChart';
import { getEngergyUsageKwhByDateRange } from '../../action/device';
import moment from 'moment';
import { ThreeDots } from 'react-loader-spinner';
import { IoMdArrowDropdown } from 'react-icons/io';
import { GrFormNext,GrFormPrevious } from "react-icons/gr";
// import { GrFormNext } from "react-icons/gr";

function Today() {
  const [activeTab, setActiveTab] = useState('Day');
  const selectedDevice = useSelector((state) => state.device.selectedDevice);
  const [startDate, setStartDate] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Session') {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleSearch = () => {
    loadChartData(selectedDevice.id, startDate);
  };

  useEffect(() => {
    const todayUtc = moment(); 
    console.log('todayUtc---2222', todayUtc.format('yyyy-MM-DD'));
    setStartDate(todayUtc.format('yyyy-MM-DD'));
  }, []);

  useEffect(() => {
    if (startDate && selectedDevice) {
      loadChartData(selectedDevice.id, startDate);
    }
  }, [startDate, selectedDevice]);

  const loadChartData = async (deviceId, startDay) => {
    setIsSearchLoading(true);

    const utcOffSet = moment().utcOffset();
    const startOfDayUtc = moment(startDay).startOf('day').subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
    const endOfDayUtc = moment(startDay).endOf('day').subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');

    console.log('startOfDayUtc---2222', startOfDayUtc);
    console.log('endOfDayUtc---2222', endOfDayUtc);
    const payload = {
      deviceId: deviceId,
      mesurementUnitId: 1,
      frequencyId: 1,
      startDate: startOfDayUtc,
      endDate: endOfDayUtc,
    };
    const result = await getEngergyUsageKwhByDateRange(payload);

    console.log('result--result', result.data);
    setDevices(result.data);

    setIsSearchLoading(false);
  };

  const currentDate = moment().toDate();

  const handlePrevDay = () => {
    const prevDay = moment(startDate).subtract(1, 'days').toDate();
    setStartDate(prevDay);
  };

  
  const handleNextDay = () => {
    const nextDay = moment(startDate).add(1, 'days').toDate();
    setStartDate(nextDay);
  };


  return (
    <div className='home'>
      <div className='nav-bar d-flex align-items-center justify-content-center w-100'>
        <div className='back'>
          <ul className='nav-bar-links'>
            <Link to={"/home"}>
              <li
                className={`btn btn-sm  ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}
              >
                Live
              </li>
            </Link>
            <Link to={"/today"}>
              <li
                className={`btn btn-sm btn-primary ${activeTab === 'Day' ? 'active' : ''}`}
                onClick={() => handleTabClick('Day')}
              >
                Day
              </li>
            </Link>
            <Link to={"/week"}>
              <li
                className={`btn btn-sm ${activeTab === 'Week' ? 'active' : ''}`}
                onClick={() => handleTabClick('Week')}
              >
                Week
              </li>
            </Link>
            <li
              className={`btn btn-sm  ${activeTab === 'Session' ? 'active' : ''}`}
              onClick={() => handleTabClick('Session')}
            >
              Session<IoMdArrowDropdown size={20} />
              <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <Link to={"/month"} className='dropdown-item' onClick={() => handleTabClick('Session')}>
                  Session
                </Link>
                <Link to={"/monthactive"} className='dropdown-item' onClick={() => handleTabClick('Month')}>
                  Month
                </Link>
              </div>
            </li>
            <Link to={"/year"}>
              <li
                className={`btn btn-sm  ${activeTab === 'Year' ? 'active' : ''}`}
                onClick={() => handleTabClick('Year')}
              >
                Year
              </li>
            </Link>
            <Link to={"/custom"}>
              <li
                className={`btn btn-sm  ${activeTab === 'Custom' ? 'active' : ''}`}
                onClick={() => handleTabClick('Custom')}
              >
                Custom
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className='body'>
        <div className='date'>
          <div className='picker'>
            <div style={{display:'flex', position:'relative'}}>
              <button onClick={handlePrevDay} className='arrow-button-left'><GrFormPrevious /></button>
            </div>
            <div>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                placeholderText="Start Date"
                dateFormat='dd MMM yyyy'
                dayClassName={(date) => date.toDateString() === currentDate.toDateString() ? 'highlight-today' : undefined}
              />
            </div> 
            <div style={{display:'flex', position:'relative'}}>
              <button onClick={handleNextDay} className='arrow-button-right'><GrFormNext /></button>  
            </div> 
          </div>
        </div>
        {isSearchLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <ThreeDots
              height={100}
              width={100}
              color="#36A2EB"
              ariaLabel="loading"
              secondaryColor="#36A2EB"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        ) : (
          devices.length === 0 ? (
            <div className="no-data-message1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <p id='no-data'>No data Found</p>
            </div>
          ) : (
            devices.map((device, index) => (
              <div key={index}>
                <DeviceChart  
                  device={device}
                  className="device-name-state body d-flex align-items-center justify-content-center w-100"
                  chartFrequencty="hours"
                />
              </div>
            ))
          )
        )}
      </div>
      <BottomNav />
    </div>
  );
}

export default Today;
