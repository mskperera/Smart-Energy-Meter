import React, { useEffect, useState } from 'react';
import './Week.css';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/bottommenu/BottomNav';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getEngergyUsageKwhByDateRange } from '../../action/device';
import moment from 'moment';
import DeviceCharts from '../today/DeviceChart';
import { ThreeDots } from 'react-loader-spinner';
import { IoMdArrowDropdown } from 'react-icons/io';
import { GrFormNext,GrFormPrevious } from "react-icons/gr";

function Week() {
  const [activeTab, setActiveTab] = useState('Week');
  const selectedDevice = useSelector(state => state.device.selectedDevice);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const [weekStartDates, setWeekStartDates] = useState([]);
  const [chartLineOne, setChartLineOne] = useState([]);
  const [chartLineTwo, setChartLineTwo] = useState([]);
  const [chartLineThree, setChartLineThree] = useState([]);

  const handleTabClick = tab => {
    setActiveTab(tab);
    if (tab === 'Session') {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleStartDateChange = date => {
    setStartDate(date);
    calculateWeekStartDates(date);
  };

  const handleSearch = () => {
    loadChartData(selectedDevice.id, startDate);
  };

  useEffect(() => {
    const todayUtc = moment();
    setStartDate(todayUtc.toDate());
    calculateWeekStartDates(todayUtc.toDate());
  }, []);

  useEffect(() => {
    if (startDate && selectedDevice) loadChartData(selectedDevice.id, startDate);
  }, [startDate, selectedDevice]);

  const loadChartData = async (deviceId, startDay) => {
    setIsSearchLoading(true);

    const currentDate = moment.utc();
    const utcOffSet = moment().utcOffset();

    const startOfWeekUtc = moment(startDay).startOf('month').add(0, 'days', utcOffSet).format('YYYY-MM-DDTHH:mm:ss[Z]');
    const endOfWeekUtc = moment(startDay).endOf('month').subtract(0, 'days', utcOffSet).format('YYYY-MM-DDTHH:mm:ss[Z]');

    const payload = {
      deviceId: deviceId,
      mesurementUnitId: 1,
      frequencyId: 5,
      startDate: startOfWeekUtc,
      endDate: endOfWeekUtc,
    };
    const result = await getEngergyUsageKwhByDateRange(payload);
    console.log("111111",result);
    setDevices(result.data);

    setChartLineOne(result.data[0].lines[0]);
    setChartLineTwo(result.data[0].lines[1]);
    setChartLineThree(result.data[0].lines[2]);

    setIsSearchLoading(false);
  };

  const calculateWeekStartDates = (date) => {
    const monthStart = moment(date).startOf('month');
    const monthEnd = moment(date).endOf('month');
    const weekStarts = [];

    let current = monthStart.clone().startOf('week');
    while (current <= monthEnd) {
      weekStarts.push(current.clone());
      current.add(1, 'week');
    }

    setWeekStartDates(weekStarts);
  };

  const isCurrentWeek = (date) => {
    const startOfCurrentWeek = moment().startOf('week');
    return date.isSame(startOfCurrentWeek, 'day');
  };

  const handlePrevMon = () => {
    const prevMon = moment(startDate).subtract(1, 'month').toDate();
    setStartDate(prevMon);
  };
  
  const handleNextMon = () => {
    const nextMon = moment(startDate).add(1, 'month').toDate();
    setStartDate(nextMon);
  };

  return (
    <div className='home'>
      <div className='nav-bar d-flex align-items-center justify-content-center w-100'>
        <div className='back'>
          <ul className='nav-bar-links'>
            <Link to={"/home"}>
              <li
                className={`btn btn-sm ${activeTab === 'Now' ? 'active' : ''}`}
                onClick={() => handleTabClick('Now')}
              >
                Live
              </li>
            </Link>
            <Link to={"/today"}>
              <li
                className={`btn btn-sm ${activeTab === 'Day' ? 'active' : ''}`}
                onClick={() => handleTabClick('Day')}
              >
                Day
              </li>
            </Link>
            <Link to={"/week"}>
              <li
                className={`btn btn-sm btn-primary ${activeTab === 'Week' ? 'active' : ''}`}
                onClick={() => handleTabClick('Week')}
              >
                Week
              </li>
            </Link>
            <li
              className={`btn btn-sm ${activeTab === 'Session' ? 'active' : ''}`}
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
                className={`btn btn-sm ${activeTab === 'Year' ? 'active' : ''}`}
                onClick={() => handleTabClick('Year')}
              >
                Year
              </li>
            </Link>
            <Link to={"/custom"}>
              <li
                className={`btn btn-sm ${activeTab === 'Custom' ? 'active' : ''}`}
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
              <button onClick={handlePrevMon} className='arrow-button-left'><GrFormPrevious /></button>
            </div>
            <div>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                placeholderText="Start Date"
                dateFormat='MMM yyyy'
                dayClassName={(date) =>
                  weekStartDates.some(weekDate => weekDate.isSame(date, 'day')) 
                    ? isCurrentWeek(moment(date))
                      ? 'current-week'
                      : 'week-start'
                    : undefined
                }
              />
            </div>
            <div style={{display:'flex', position:'relative'}}>
              <button onClick={handleNextMon} className='arrow-button-right'><GrFormNext /></button>  
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
          devices.length > 0 && devices?.map((device, index) => (
            <div key={index}>
              <DeviceCharts
                device={device}
                chartLineOne={chartLineOne}
                chartLineTwo={chartLineTwo}
                chartLineThree={chartLineThree}
                className="device-name-state"
                isSearchLoading={isSearchLoading}
                chartFrequencty="weeks"
              />
            </div>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}

export default Week;
