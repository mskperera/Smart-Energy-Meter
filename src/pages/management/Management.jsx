import React, { useEffect, useState } from 'react';
import './Management.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import Navbar from '../../components/navbar/Navbar';
// import { getUsers } from '../../action/user';
import { Link } from 'react-router-dom';
import { deleteDevice, getDevices } from '../../action/device';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

function Management() {
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    loadDevices();
    setLoading(true);
  }, []);

  const loadDevices = async () => {
    const result = await getDevices();
    setLoading(true);
    console.log('Result 222222222', result);
    setDeviceDetails(result.data);
    setLoading(false);
  };

  const onDeleteDeviceHandler = async (deviceId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, You will not be able to recover this Device Details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteDevice(deviceId);
        console.log(res);
        const { responseStatus, outputMessage } = res.data.output;
        if (responseStatus === "failed") {
          console.log("exception:", outputMessage);
        } else {
          console.log("successful:", outputMessage);
          swal("Success!", "Your Device Details have been deleted!", "success");
          loadDevices();
        }
      } else {
        swal("Device Details deletion has been cancelled!");
      }
    });
  };

  return (
    <div className='home'>
      {/* <Navbar onChangeDevice={onChangeDeviceHandler} className='navnav'/> */}
      <div className="body">
        <div className="rounded p-2 ">
          <h2 className='d-flex justify-content-center align-items-center'>Device Management</h2>
          
          {loading ? (
            // <p className="loading-message">Loading please wait...</p>
            <div className="d-flex align-items-center justify-content-center dots-animate">
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
            <>
              <div className='d-flex justify-content-end'>
                <Link to="/deviceregister/0/I" className='btn btn-info bbttnn'>Add Device</Link>
              </div>
              <div className='table-view'>
                <table className="table table-hover rounded">
                  <thead className='table-dark'>
                    <tr>
                      {/* <th>Device ID</th> */}
                      <th>Device No</th>
                      <th>Firmware Version</th>
                      <th>Hardware version</th>
                      <th>Product</th>
                      <th>Serial No</th>
                      <th>Chip Id</th>
                      <th>Device Type</th>
                      <th>Edit|Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deviceDetails && deviceDetails.map((device) => (
                      <tr key={device.deviceId}>
                        {/* {JSON.stringify(deviceDetails)}  */}
                        {/* <td>{device.deviceId}</td> */}
                        <td>{device.deviceNo}</td>
                        <td>{device.firmwareVersion}</td>
                        <td>{device.hardwareVersion}</td>
                        <td>{device.product}</td>
                        <td>{device.serialNo}</td>
                        <td>{device.chipId}</td>
                        <td>{device.deviceTypeName}</td>
                        <td>
                          <Link to={`/deviceregister/${device.deviceId}/U`} className="btn btn-sm btn-primary"> Edit</Link>&nbsp;
                          <button className="btn btn-sm btn-danger" onClick={() => onDeleteDeviceHandler(device.deviceId)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <div className='form-view'>
        {deviceDetails && deviceDetails.map((device) => (
          <div className='notification3' key={device.deviceId}>
            <div className='bill-background1'>
              <div className='bill-ground1 device-form-main'>
                  <form className='needs-validation device-form'>
                    <div className='form-containerr'>
                      <div className='form-groupp form-group1'>
                        <div className='form-groupp'>
                          <label htmlFor='deviceNo' className='form-lablel'>Device No</label>
                          <input type='text'style={{width:'90%'}} className='form-controll' required placeholder='deviceNo' value={device.deviceNo} disabled />
                        </div>
                        <div className='form-groupp'>
                          <label htmlFor='firmwareVersion' className='form-lablel'>Firmware Version</label>
                          <input type='text' style={{width:'90%'}} className='form-controll' required placeholder='firmwareVersion' value={device.firmwareVersion} disabled />
                        </div>
                        <div className='form-groupp'>
                          <label htmlFor='hardwareVersion' className='form-lablel'>Hardware Version</label>
                          <input type='text' style={{width:'90%'}} className='form-controll' required placeholder='hardwareVersion' value={device.hardwareVersion} disabled />
                        </div>
                        <div className='form-groupp'>
                          <label htmlFor='product' className='form-lablel'>Product</label>
                          <input type='text' style={{width:'90%'}} className='form-controll' required placeholder='product' value={device.product} disabled />
                        </div>
                      </div>
                      <div className='form-groupp form-group2'>
                        <div className='form-groupp'>
                          <label htmlFor='serialNo' className='form-lablel'>Serial No</label>
                          <input type='text'style={{width:'90%'}} className='form-controll' required placeholder='serialNo' value={device.serialNo} disabled />
                        </div>
                        <div className='form-groupp'>
                          <label htmlFor='chipId' className='form-lablel'>Chip Id</label>
                          <input type='text'style={{width:'90%'}} className='form-controll' required placeholder='chipId' value={device.chipId} disabled />
                        </div>
                        <div className='form-groupp'>
                          <label htmlFor='deviceTypeName' className='form-lablel'>Device Type</label>
                          <input type='text' style={{width:'90%'}} className='form-controll' required placeholder='deviceTypeName' value={device.deviceTypeName} disabled />
                        </div>
                      </div>
                    </div>
                  </form>

                  <div className='form-actions'>
                    <Link to={`/deviceregister/${device.deviceId}/U`} className="btn btn-sm btn-primary"> Edit</Link>&nbsp;
                    <button className="btn btn-sm btn-danger" onClick={() => onDeleteDeviceHandler(device.deviceId)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
        ))}
        </div>
      </div>
      <BottomNav className="bottombar" />
    </div>
  );
}

export default Management;
