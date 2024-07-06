import React, { useEffect, useState } from 'react';
import './Home.css';
import Menu from '../../components/menu/Menu';
import BottomNav from '../../components/bottommenu/BottomNav';
import { useSelector } from 'react-redux';
import { getEngergyUsageNow } from '../../action/device';
import DeviceChart3p from './DeviceChart';
import { ThreeDots } from 'react-loader-spinner';
// import { getBillingSessionNameCurrentByDeviceId } from '../../action/billingSession';
// import { useSessionDate } from '../../context/SessionDateContext';

const Home = () => {
  // const { sessionDate, setSessionDate, numberOfDays, setNumberOfDays } = useSessionDate();
  const selectedDevice = useSelector((state) => state.device.selectedDevice);

  const [loading, setLoading] = useState(null);

  useEffect(() => {
    loadChartData();
    setLoading(true);
    const intervalId = setInterval(() => {
      loadChartData();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [selectedDevice]);

  const loadChartData = async () => {
    const payload = {
      deviceId: selectedDevice?.id,
      measurementUnitId: 1,
    };
    const result = await getEngergyUsageNow(payload);

    console.log('result---11111', result.data);

    setDevices(result.data);
    setLoading(false);
  };

  // useEffect(() => {
  //   if (selectedDevice) {


  //     const deviceId = selectedDevice.id;
  //     loadCurrentBillingSessionInfoByDeviceId(deviceId);
  //   }
  // }, [selectedDevice]);

  // const loadCurrentBillingSessionInfoByDeviceId = async (deviceId) => {
  //   const result = await getBillingSessionNameCurrentByDeviceId(deviceId);
  //   const billingSessionInfo = result.data;
  //   console.log('Current-BillingSession-Info-By-DeviceId', billingSessionInfo);

  //   if (billingSessionInfo && billingSessionInfo.data && billingSessionInfo.data.length > 0) {
  //     const session = billingSessionInfo.data[0];
  //     if (session.startDate) {
  //       setSessionDate(new Date(session.startDate).toLocaleString());
  //     }
  //     if (session.numberOfDays) {
  //       setNumberOfDays(session.daysElapsed);
  //     }
  //   }
  // };

  const [devices, setDevices] = useState([]);

  const totalUsageBill = devices.reduce((total, line) => total + line.usageBill, 0);
  const totalUsageKwh = devices.reduce((total, line) => total + line.kwh, 0);

  return (
    <div className="home">
      <Menu className="nav-bar" />
      <div className="body">
        {/* <div className="session-name">
          <h6>Session Date :<b> {sessionDate}</b></h6>
          <p>Days Elapsed : <b>{numberOfDays}</b></p>
        </div> */}
        <div className="container">
          {loading ? (
            <div>
              <ThreeDots
                className="d-flex align-items-center justify-content-center"
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
            <>
              {devices.length > 1 && (
                <div className='budget-values' style={{ display: "flex", justifyContent: "space-between" }}>
                  <h2 style={{ color: 'black' }}>
                    Total kWh: <span style={{ color: '#fff346' }}>{totalUsageKwh?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </h2>
                  <h2 style={{ color: 'black' }}>
                    Total Bill: <span style={{ color: '#4484ff' }}>{totalUsageBill?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </h2>
                </div>
              )}

              {devices?.map((device, index) => (
                <div key={index}>
                  <div className="device-name-state align-items-center justify-content-center w-100">
                    <DeviceChart3p deviceName={device.deviceName} deviceLocation={device.deviceLocation} device={device} />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <BottomNav className="bottombar1" />
    </div>
  );
};

export default Home;
