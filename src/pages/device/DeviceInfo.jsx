import React, { useEffect, useState } from 'react';
import BottomNav from '../../components/bottommenu/BottomNav';
import './DeviceInfo.css';
import '../management/Management.css';
import { getDeviceInfoByUserId } from '../../action/device';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
// import { de } from 'date-fns/locale';

const DeviceInfo = () => {
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedDevice = useSelector((state) => state.device.selectedDevice);

  useEffect(() => {
    if (selectedDevice) {
      const userData = localStorage.getItem('userData');
      const userId = JSON.parse(userData).userId;
      loadDeviceInfoByUserId(userId);
    }
  }, [selectedDevice]);

  const loadDeviceInfoByUserId = async (userId) => {
    setLoading(true);
    try {
      const result = await getDeviceInfoByUserId(userId);
      console.log('Result 11111111', result);
      setDeviceDetails(result.data);
    } catch (error) {
      console.error('Error loading device info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='home'>
      <div className="body">
        <div className="rounded p-2">
          <h2 className='d-flex justify-content-center align-items-center'>Device Information</h2>
          {loading ? (
            // <p className="loading-message">Loading please wait...</p>
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
            <div className='table-view'>
              <table className="table table-hover rounded">
                <thead className='table-dark'>
                  <tr>
                    <th>Device ID</th>
                    <th>Device No</th>
                    <th>Firmware Version</th>
                    <th>Hardware version</th>
                    <th>Product</th>
                    <th>Serial No</th>
                    <th>Meter Type</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceDetails.map((device) => (
                    <tr key={device.deviceNo}>
                      <td>{device.DeviceId}</td>
                      <td>{device.deviceNo}</td>
                      <td>{device.firmwareVersion}</td>
                      <td>{device.hardwareVersion}</td>
                      <td>{device.product}</td>
                      <td>{device.serialNo}</td>
                      <td>{device.deviceTypeName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className='form-view'>
          {deviceDetails && deviceDetails.map((device) => (
            <div className='notification3' key={device.deviceNo}>
              <div className='bill-background1'>
                <div className='bill-ground1 device-form-main'>
                  <form className='needs-validation device-form'>
                    <div className='form-containerr'>
                      <div className='form-groupp form-group1'>
                        <div className="form-groupp">
                          <label htmlFor='deviceno' className='form-lablel'>Device No</label>
                          <input type="text" style={{width:'90%'}} className="form-controll" value={device.deviceNo} disabled />
                        </div>

                        <div className="form-groupp">
                          <label htmlFor='firmwareversion' className='form-lablel'>Firmware Version</label>
                          <input type="text" style={{width:'90%'}} className="form-controll" value={device.firmwareVersion} disabled />
                        </div>

                        <div className="form-groupp">
                          <label htmlFor='hardwareversion' className='form-lablel'>Hardware Version</label>
                          <input type="text"style={{width:'90%'}} className="form-controll" value={device.hardwareVersion} disabled />
                        </div> 
                      </div>

                      <div className='form-groupp form-group2'>
                        <div className="form-groupp">
                          <label htmlFor='product' className='form-lablel'>Product</label>
                          <input type="text" style={{width:'90%'}} className="form-controll" value={device.product} disabled />
                        </div>

                        <div className="form-groupp">
                          <label htmlFor='serialno' className='form-lablel'>Serial No</label>
                          <input type="text" style={{width:'90%'}} className="form-controll" value={device.serialNo} disabled />
                        </div>

                        <div className="form-groupp">
                          <label htmlFor='metertype' className='form-lablel'>Meter Type</label>
                          <input type="text"style={{width:'90%'}} className="form-controll" value={device.deviceTypeName} disabled />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <BottomNav />
    </div>
  );
}

export default DeviceInfo;
