import React, { useEffect, useState } from 'react'
import { addDevice, getDeviceByDeviceId, getDevices, updateDevice } from '../../action/device';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { getDrpDeviceType } from '../../action/dropdown';


function DeviceRegister() {

  const { deviceRegId, saveType } = useParams();

  const [deviceNo, setDeviceNo] = useState('');
  const [hardwareVersion, setHardwareVersion] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [firmwareVersion, setFirmwareVersion] = useState('');
  const [product, setProduct] = useState('');
  const [chipId, setChipId] = useState('');
  const [deviceType, setDeviceType] = useState('');

  const [dropDeviceType, setDropDeviceType] = useState([]);
  const [device, setDevice] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  // const deviceNames = useSelector(state => state.device.dropDeviceList);
  // const defaultSelectedDevice = deviceNames[0];
  const selectedDevice = useSelector((state) => state.device.selectedDevice);

  useEffect(() => {
    setDevice(selectedDevice);
  }, [selectedDevice]);

  useEffect(() => {
    if (saveType === "U") {
      loadDevices();
    }
    loadDrpDeviceType();
  }, []);

  const loadDrpDeviceType = async () => {
    const result = await getDrpDeviceType();
    console.log("result - drop", result.data);
    setDropDeviceType(result.data);
  }

  const loadDevices = async () => {
    try {
      const result = await getDeviceByDeviceId(deviceRegId);
      const device = result.data;
      console.log("result data:", result);

      setDeviceNo(device.deviceNo || '');
      setHardwareVersion(device.hardwareVersion || '');
      setSerialNo(device.serialNo || '');
      setFirmwareVersion(device.firmwareVersion || '');
      setProduct(device.product || '');
      setChipId(device.chipId || '');
      setDeviceType(device.deviceType || '');
    } catch (err) {
      console.log(err);
    }
  };

  const [message, setMessage] = useState('');
  // const [errormessage, setErrorMessage] = useState('');

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      setMessage('');

      const payload = {
        deviceId: selectedDevice.id,
        deviceNo: deviceNo,
        hardwareVersion: hardwareVersion,
        serialNo: serialNo,
        firmwareVersion: firmwareVersion,
        product: product,
        chipId: chipId,
        deviceTypeId: deviceType,
      };

      console.log('payload', payload);
      if (saveType === 'I') {
        const res = await addDevice(payload);
        handleResponse(res);
      } else if (saveType === 'U') {
        const res = await updateDevice(payload, deviceRegId);
        console.log('update res', res);
        handleResponse(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleResponse = (res) => {
    const { responseStatus, outputMessage } = res.data;
    if (responseStatus === 'error') {
      setErrorMessage(outputMessage);
      return;
    } else {
      setMessage(outputMessage);
      swal('Added Successful', '', 'success').then(() => {
        window.location = '/management';
      });
    }
  };

  return (
    <div className='wrapper-register d-flex align-items-center justify-content-center w-100'>
      <div className='register'>
        {saveType === "I" ? (
          <h2 className='d-flex align-items-center justify-content-center mb-2'>Device Registration</h2>
        ) : (
          <h2 className='d-flex align-items-center justify-content-center mb-2'>Update Device Details</h2>
        )}

        <form className='needs-validation' onSubmit={onsubmitHandler}>
          <div className='row'>
            <div className='mb-1'>
              <div className='form-group was-validated'>
                <label htmlFor='username' className='form-label'>
                  Device No
                </label>
                <input type='text' className='form-control' value={deviceNo} onChange={(e) => setDeviceNo(e.target.value)} required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='firmwareVersion' className='form-label'>
                  Firmware Version
                </label>
                <input type='text' className='form-control' value={firmwareVersion} onChange={(e) => setFirmwareVersion(e.target.value)} required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='hardwareVersion' className='form-label'>
                  Hardware Version
                </label>
                <input type='text' className='form-control' value={hardwareVersion} onChange={(e) => setHardwareVersion(e.target.value)} required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='product' className='form-label'>
                  Product
                </label>
                <input type='text' className='form-control' value={product} onChange={(e) => setProduct(e.target.value)} required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='address' className='form-label'>
                  Serial No
                </label>
                <input type='text' className='form-control' value={serialNo} onChange={(e) => setSerialNo(e.target.value)} required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='chipid' className='form-label'>
                  Chip Id
                </label>
                <input type='text' className='form-control' value={chipId} onChange={(e) => setChipId(e.target.value)} required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='devicetype' className='form-label'>
                  Device Type
                </label>
                <select onChange={(e) => setDeviceType(e.target.value)} className='form-control' required
                  name='deviceType'
                  value={deviceType}
                >
                  {dropDeviceType.map((mode) => (
                    <option key={mode.DeviceTypeId} value={mode.DeviceTypeId}>
                      {mode.DeviceTypeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button type='submit' className='btn btn-primary w-100 mt-3'>
            Save
          </button>
        </form>
        {message && <div className="alert alert-success mt-2">{message}</div>}
        {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default DeviceRegister;
