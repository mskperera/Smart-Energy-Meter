import React, { useEffect, useState } from 'react';
import { addDevice, getDeviceByDeviceId, updateDevice } from '../../action/device';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { getDrpDeviceType } from '../../action/dropdown';
import { ThreeDots } from 'react-loader-spinner';
import { IoClose } from 'react-icons/io5';

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
  const [loading, setLoading] = useState(false);

  const selectedDevice = useSelector((state) => state.device.selectedDevice);

  // useEffect(() => {
  //   setDevice(selectedDevice);
  // }, [selectedDevice]);

  useEffect(() => {
    if (saveType === 'U') {
      loadDevice();
      setLoading(true);
    }
    loadDrpDeviceType();
    setLoading(true);
  }, [saveType, deviceRegId]);

  const loadDrpDeviceType = async () => {
    const result = await getDrpDeviceType();
    setLoading(true);
    setDropDeviceType(result.data);
    setLoading(false);
  };

  const loadDevice = async () => {
    try {
      const result = await getDeviceByDeviceId(deviceRegId);
      setLoading(true);
      const device = result.data;
      setDeviceNo(device.deviceNo || '');
      setHardwareVersion(device.hardwareVersion || '');
      setSerialNo(device.serialNo || '');
      setFirmwareVersion(device.firmwareVersion || '');
      setProduct(device.product || '');
      setChipId(device.chipId || '');
      setDeviceType(device.deviceTypeId || ''); 
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [message, setMessage] = useState('');
  const [errormessage, setErrorMessage] = useState('');

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      setMessage('');
      setLoading(true);

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

      let res;
      if (saveType === 'I') {
         res = await addDevice(payload);
      } else if (saveType === 'U') {
         res = await updateDevice(payload, deviceRegId);
      }
      handleResponse(res);
    } catch (err) {
      console.log(err);
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = (res) => {
    const { responseStatus, outputMessage } = res.data.output;
    if (responseStatus === 'failed') {
      setErrorMessage(outputMessage);
      clearForm();
      return;
    } else {
      setMessage(outputMessage);
      swal(saveType === 'I' ? 'Device Added Successfully' : 'Device Updated Successfully', "",'success').then(() => {
        window.location = '/management';
      });
    }
  };

  const clearForm = () => {
    setDeviceNo('');
    setHardwareVersion('');
    setSerialNo('');
    setFirmwareVersion('');
    setProduct('');
    setChipId('');
    setDeviceType('');
  };


  return (
    <div className='wrapper-register d-flex align-items-center justify-content-center w-100'>
      {loading ? (
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
        <div className='register'>
          <div className="d-flex justify-content-end">
            <Link to="/management" className="button-close"><IoClose size={25}/></Link>
          </div>
          {saveType === 'I' ? (
            <h2 className='d-flex align-items-center justify-content-center mb-2'>Device Registration</h2>
          ) : (
            <h2 className='d-flex align-items-center justify-content-center mb-2'>Update Device Details</h2>
          )}

          <form className='needs-validation' onSubmit={onsubmitHandler}>
            <div className='row'>
                <div className='col-md-6 mb-1'>
                    <div className='form-group was-validated mb-2'>
                      <label htmlFor='deviceNo' className='form-check-label'>
                        Device No
                      </label>
                      <input type='text' className='form-control' value={deviceNo} onChange={(e) => setDeviceNo(e.target.value)} required />
                    </div>

                    <div className='form-group was-validated mb-2'>
                      <label htmlFor='firmwareVersion' className='form-check-label'>
                        Firmware Version
                      </label>
                      <input type='text' className='form-control' value={firmwareVersion} onChange={(e) => setFirmwareVersion(e.target.value)} required />
                    </div>

                    <div className='form-group was-validated mb-2'>
                      <label htmlFor='hardwareVersion' className='form-check-label'>
                        Hardware Version
                      </label>
                      <input type='text' className='form-control' value={hardwareVersion} onChange={(e) => setHardwareVersion(e.target.value)} required />
                    </div>

                    <div className='form-group was-validated mb-2'>
                      <label htmlFor='product' className='form-check-label'>
                        Product
                      </label>
                      <input type='text' className='form-control' value={product} onChange={(e) => setProduct(e.target.value)} required />
                    </div>

                </div>

                <div className='col-md-6 mb-1'>
                  
                  <div className='form-group was-validated mb-2'>
                    <label htmlFor='serialNo' className='form-check-label'>
                      Serial No
                    </label>
                    <input type='text' className='form-control' value={serialNo} onChange={(e) => setSerialNo(e.target.value)} required />
                  </div>

                  <div className='form-group was-validated mb-2'>
                    <label htmlFor='chipId' className='form-check-label'>
                      Chip Id
                    </label>
                    <input type='text' className='form-control' value={chipId} onChange={(e) => setChipId(e.target.value)} required />
                  </div>

                  <div className='form-group was-validated mb-2'>
                    <label htmlFor='deviceType' className='form-check-label'>
                      Device Type
                    </label>
                    <select onChange={(e) => setDeviceType(e.target.value)} className='form-control' required
                      name='deviceType'
                      value={deviceType}
                    >
                      <option value='' disabled>Select Device Type</option>
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
          {errormessage && <p className='text-danger'>{errormessage}</p>}
          {message && <p className='text-success'>{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default DeviceRegister;
