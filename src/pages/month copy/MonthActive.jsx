import React, { useEffect, useState } from 'react';
import './Month.css';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/bottommenu/BottomNav';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getEngergyUsageKwhByDateRange } from '../../action/device';
import moment from 'moment';
import DeviceCharts from '../today/DeviceChart';
import { ThreeDots } from 'react-loader-spinner';
import { useSessionDate } from '../../context/SessionDateContext';
import { IoMdArrowDropdown } from 'react-icons/io';
import { GrFormNext,GrFormPrevious } from "react-icons/gr";


function MonthActive() {
  const [activeTab, setActiveTab] = useState('Month'); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().startOf('month').toDate()); 
  const [devices, setDevices] = useState([]);
  const [dropdownLabel, setDropdownLabel] = useState('Month'); 
  const selectedDevice = useSelector(state => state.device.selectedDevice);
  const { sessionDate, setSessionDate, numberOfDays, setNumberOfDays } = useSessionDate();

  // Handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Session') {
      setDropdownLabel('Session');
      setIsDropdownOpen(false); 
    } else {
      setIsDropdownOpen(false);
    }
  };

  // Handle month change
  const handleMonthChange = (date) => {
    setSelectedDate(date); 
  };

  // Set current billing session
  useEffect(() => {
    setCurrentBillingSession();
  }, [sessionDate]);

  const setCurrentBillingSession = () => {
    setSelectedDate(sessionDate ? new Date(sessionDate) : moment().startOf('month').toDate());
  };

 
  useEffect(() => {
    if (selectedDate && selectedDevice) {
      loadChartData(selectedDevice.id, selectedDate);
    }
  }, [selectedDate, selectedDevice, activeTab]);

  // Fetch data for the entire month
  const loadChartData = async (deviceId, selectedDate) => {
    setIsSearchLoading(true);

    const utcOffSet = moment().utcOffset();
    const startOfMonth = moment(selectedDate).startOf('month');
    const endOfMonth = moment(selectedDate).endOf('month');
    const startOfMonthUtc = startOfMonth.subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');
    const endOfMonthUtc = endOfMonth.subtract(utcOffSet, 'minutes').format('YYYY-MM-DDTHH:mm:ss[Z]');

    const payload = {
      deviceId: deviceId,
      mesurementUnitId: 1,
      frequencyId: 3,
      startDate: startOfMonthUtc,
      endDate: endOfMonthUtc,
    };

    const result = await getEngergyUsageKwhByDateRange(payload);
    setDevices(result.data);
    setIsSearchLoading(false);
  };

  const handlePrevMonth = () => {
    const prevMonth = moment(selectedDate).subtract(1, 'month').toDate();
    setSelectedDate(prevMonth);
  };

  
  const handleNextMonth = () => {
    const nextMonth = moment(selectedDate).add(1, 'month').toDate();
    setSelectedDate(nextMonth);
  };

  return (
    <div className='home'>
      <div className='nav-bar d-flex align-items-center justify-content-center w-100'>
        <div className='back'>
          <ul className='nav-bar-links'>
            <Link to={"/home"}>
              <li 
            
               className={`btn btn-sm  ${activeTab === 'Now' ? 'active' : ''}`} onClick={() => handleTabClick('Now')}>
                Live
              </li>
            </Link>
            <Link to={"/today"}>
              <li 
           
              className={`btn btn-sm  ${activeTab === 'Day' ? 'active' : ''}`} onClick={() => handleTabClick('Day')}>
                Day
              </li>
            </Link>
            <Link to={"/week"}>
              <li 
             
              className={`btn btn-sm  ${activeTab === 'Week' ? 'active' : ''}`} onClick={() => handleTabClick('Week')}>
                Week
              </li>
            </Link>
            <li className={`btn btn-sm btn-primary ${activeTab === 'Month' ? 'active' : ''}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {dropdownLabel} <IoMdArrowDropdown size={20} />
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
             
              className={`btn btn-sm ${activeTab === 'Year' ? 'active' : ''}`} onClick={() => handleTabClick('Year')}>
                Year
              </li>
            </Link>
            <Link to={"/custom"}>
              <li
             
              className={`btn btn-sm  ${activeTab === 'Custom' ? 'active' : ''}`} onClick={() => handleTabClick('Custom')}>
                Custom
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className='body'>
        <div className='date'>
            <div style={{display:'flex', position:'relative'}}>
              <button onClick={handlePrevMonth} className='arrow-button-left'><GrFormPrevious /></button>
            </div>
          <div className='picker'>
            <DatePicker
              selected={selectedDate}
              onChange={handleMonthChange}
              dateFormat="MMM yyyy"
              showMonthYearPicker
              placeholderText="Select Month"
            />
          </div>
            <div style={{display:'flex', position:'relative'}}>
              <button onClick={handleNextMonth} className='arrow-button-right'><GrFormNext /></button>  
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
          devices.length > 0 && devices.map((device, index) => (
            <div key={index}>
              <DeviceCharts
                device={device}
                className="device-name-state"
                isSearchLoading={isSearchLoading}
                chartFrequencty="days"
              />
            </div>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}

export default MonthActive;
