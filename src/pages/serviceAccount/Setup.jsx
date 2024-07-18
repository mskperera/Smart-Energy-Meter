import React, { useEffect, useState } from 'react';
import './Setup.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import { CgProfile } from 'react-icons/cg';
import { serviceProfileSetup } from '../../action/serviceProfile';
import swal from 'sweetalert';
import { verifyDeviceBySN } from '../../action/device';
import { getDrpConsumerCategories, getDrpConsumerSubCategoriesById, getDrpMeasuringMode, getDrpSupplier, getDrpUserRole } from '../../action/dropdown';
import { de } from 'date-fns/locale';
import ReactDatePicker from 'react-datepicker';

const Step1 = ({ nextStep, handleChange, values, errors }) => {

  const [drpUserRole, setDrpUserRole] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    loadDrpUserRole();
  }, []);

  const loadDrpUserRole = async () => {
    const result = await getDrpUserRole();
    setDrpUserRole(result.data);
  };

  const handleRoleChange = (e) => {
    const selectedRole = drpUserRole.find(role => role.RoleName === e.target.value);
    if (selectedRole) {
      setRoleName(selectedRole.RoleName);
      setRoleId(selectedRole.RoleId);
      handleChange('userrole')({ target: { value: selectedRole.RoleId } }); 
    }
  };

  return (
    <div className="form-container">
      <h2>About</h2>
      <div className='row'>
        <div className='col-md-6 mb-1 was-validated'>
          <div className='form-group mb-2'>
            <label htmlFor='username' className='form-check-label'>Username</label>
            <input type='text' className='form-control' required value={values.username} onChange={handleChange('username')} />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>
          {/* <div className='form-group was-validated mb-2'>
                  <label htmlFor='userrole' className='form-check-label'>User Role</label>
                  <select onChange={handleRoleChange} required name='userrole' className='form-control' value={roleName || ''}>
                  <option value="" disabled>Select User Role</option>
                    {drpUserRole.map((role) => (
                      <option key={role.RoleId} value={role.RoleName}>
                        {role.RoleName}
                      </option>
                    ))}
                  </select>
                  {errors.userrole && <div className="text-danger">{errors.userrole}</div>}
                </div> */}
          {/* <div className='form-group mb-2'>
            <label htmlFor='userrole' className='form-check-label'>User Role</label>
            <select required name='userrole' className='form-control' value={values.userrole} onChange={handleChange('userrole')} >
              <option value="" disabled>Select User Role</option>
            </select>
            
          </div> */}
          <div className='form-group mb-2'>
            <label htmlFor='password' className='form-check-label'>Password</label>
            <input type='password' className='form-control' required value={values.password} onChange={handleChange('password')} />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='email' className='form-check-label'>Email</label>
            <input type='email' className='form-control' required value={values.email} onChange={handleChange('email')} />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='address' className='form-check-label'>Address</label>
            <input type='text' className='form-control' required value={values.address} onChange={handleChange('address')} />
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>
        </div>
        <div className='col-md-6 mb-1 was-validated'>
          <div className='form-group mb-2'>
            <label htmlFor='displayname' className='form-check-label'>Display Name</label>
            <input type='text' className='form-control' required value={values.displayname} onChange={handleChange('displayname')} />
            {errors.displayname && <div className="text-danger">{errors.displayname}</div>}
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='mobile' className='form-check-label'>Mobile</label>
            <input type='text' className='form-control' required value={values.mobile} onChange={handleChange('mobile')} />
            {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='tel' className='form-check-label'>Tel</label>
            <input type='text' className='form-control' required value={values.tel} onChange={handleChange('tel')} />
            {errors.tel && <div className="text-danger">{errors.tel}</div>}
          </div>
        </div>
      </div>
      <div className="button-group d-flex justify-content-end">
        <button onClick={nextStep} className="next-btn mt-1">Next</button>
      </div>
    </div>
  );
};

const Step2 = ({ nextStep, prevStep, handleChange, values, errors, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [deviceVerified, setDeviceVerified] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState(null);

  const loadVerifyDeviceBySN = async () => {
    setLoading(true);
    setVerifyMessage('');
    try {
      const result = await verifyDeviceBySN(values.serialno);
      if (result.data.deviceId) {
        setDeviceVerified(true);
        setDeviceDetails(result.data);
        setVerifyMessage('Device verified successfully');
        setFormData(prevState => ({
          ...prevState,
          deviceid: result.data.deviceId,
          deviceno: result.data.DeviceNo,
          devicetypename: result.data.DeviceTypeName,
          firmwareversion: result.data.FirmwareVersion,
        }));
      } else {
        setDeviceVerified(false);
        setVerifyMessage(result.data.exception || 'Device not found');
      }
    } catch (error) {
      setVerifyMessage('Error verifying device');
      console.error('Error verifying device:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Account</h2>
      <div className="form-group mb-2 was-validated">
        <label htmlFor="serialno" className="form-check-label">Serial No</label>
        <div className="d-flex">
          <input type="text" className="form-control input-sn" required value={values.serialno} onChange={handleChange('serialno')} />
        </div>
        <div className='d-flex justify-content-end'>
          <button type="button" className="prev-btn mt-1" onClick={loadVerifyDeviceBySN} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
        {verifyMessage && <div className={deviceVerified ? "text-info" : "text-danger"}>{verifyMessage}</div>}
        {errors.serialno && <div className="text-danger">{errors.serialno}</div>}
      </div>

      {deviceVerified && (
        <div className='row'>
          <div className='col-md-6 mb-1 was-validated'>
            <div className="form-group mb-2">
              <label htmlFor="deviceid" className="form-check-label">Device ID</label>
              <input type="text" className="form-control" required value={deviceDetails.deviceId} onChange={handleChange('deviceid')} />
              {errors.deviceid && <div className="text-danger">{errors.deviceid}</div>}
            </div>
            <div className="form-group mb-2">
              <label htmlFor="devicetypename" className="form-check-label">Device Type</label>
              <input type="text" className="form-control" required value={deviceDetails.DeviceTypeName} onChange={handleChange('devicetypename')} />
              {errors.devicetypename && <div className="text-danger">{errors.devicetypename}</div>}
            </div>
          </div>
          <div className='col-md-6 mb-1 was-validated'>
            <div className="form-group mb-2">
              <label htmlFor="deviceno" className="form-check-label">Device No</label>
              <input type="text" className="form-control" required value={deviceDetails.DeviceNo} onChange={handleChange('deviceno')} />
              {errors.deviceno && <div className="text-danger">{errors.deviceno}</div>}
            </div>
            <div className="form-group mb-2">
              <label htmlFor="firmwareversion" className="form-check-label">Firmware Version</label>
              <input type="text" className="form-control" required value={deviceDetails.FirmwareVersion} onChange={handleChange('firmwareversion')} />
              {errors.firmwareversion && <div className="text-danger">{errors.firmwareversion}</div>}
            </div>
          </div>
        </div>
      )}

      <div className="button-group">
        <button onClick={prevStep} className="prev-btn">Back</button>
        <button onClick={nextStep} className="next-btn" disabled={!deviceVerified}>Next</button>
      </div>
    </div>
  );
};


const Step3 = ({ prevStep, handleChange, values, errors, saveServiceProfileSetup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    saveServiceProfileSetup();
  };

  const [dropoptionsSupplier, setDropoptionsSupplier] = useState([]);
  const [dropMeasuringMode, setDropMeasuringMode] = useState([]);
  const [dropoptionsConsumerCatogery, setDropoptionsConsumerCatogery] = useState([]);
  const [dropoptionsConsumerSubCatogery, setDropoptionsConsumerSubCatogery] = useState([]);


  useEffect(() => {
    loadDrpSupplier();
    loadDrpConsumerCategories();
    loadDrpMeasuringModeDrp();
  }, []);

  useEffect(() => {
    if (values.consumercategory) {
      loadDrpConsumerSubCategoriesById(values.consumercategory);
    }
  }, [values.consumercategory]);

  const loadDrpSupplier = async () => {
    const result = await getDrpSupplier();
    setDropoptionsSupplier(result.data);
  };

  const loadDrpConsumerCategories = async () => {
    const result = await getDrpConsumerCategories();
    setDropoptionsConsumerCatogery(result.data);
  };

  const loadDrpConsumerSubCategoriesById = async (categoryId) => {
    const result = await getDrpConsumerSubCategoriesById(categoryId);
    setDropoptionsConsumerSubCatogery(result.data);
  };

  const loadDrpMeasuringModeDrp = async () => {
    const result = await getDrpMeasuringMode();
    setDropMeasuringMode(result.data);
  };

  return (
    <div className="form-container">
      <h2>Service</h2>
      <div className='row'>
        <div className='col-md-6 mb-1 was-validated'>
          <div className="form-group mb-2">
            <label htmlFor="supplier" className="form-check-label">Supplier</label>
            <select
              onChange={handleChange('supplier')}
              value={values.supplier}
              name="supplierId"
              className="form-control"
            >
              <option value="">Select Supplier</option>
              {dropoptionsSupplier.map((r) => (
                <option key={r.supplierId} value={r.supplierId}>
                  {r.supplierName}
                </option>
              ))}
            </select>
            {errors.supplier && <div className="text-danger">{errors.supplier}</div>}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="consumercategory" className="form-check-label">
              Consumer Category
            </label>
            <select
              onChange={handleChange('consumercategory')}
              value={values.consumercategory}
              name="consumercategory"
              className="form-control"
            >
              <option value="">Select Consumer Category</option>
              {dropoptionsConsumerCatogery.map((d) => (
                <option key={d.consumerCategoryId} value={d.consumerCategoryId}>
                  {d.consumerCategoryName}
                </option>
              ))}
            </select>
          </div>
          {dropoptionsConsumerSubCatogery.length > 0 && (
            <div className="form-group mb-2">
              <label htmlFor="subcategory" className="form-check-label">
                Consumer SubCategory
              </label>
              <select
                onChange={handleChange('subcategory')}
                value={values.subcategory}
                name="subcategory"
                className="form-control"
              >
                <option value="">Select Consumer SubCategory</option>
                {dropoptionsConsumerSubCatogery.map((s) => (
                  <option key={s.ConsumerSubCategoryId} value={s.ConsumerSubCategoryId}>
                    {s.ConsumerSubCategoryName}
                  </option>
                ))}
              </select>
            </div>
          )}
           <div className="form-group mb-2">
            <label htmlFor="devicename" className="form-check-label">Device Name</label>
            <input type="text" className="form-control" required value={values.deviceName} onChange={handleChange('devicename')} />
            {errors.devicename && <div className="text-danger">{errors.devicename}</div>}
          </div>
        </div>

        <div className='col-md-6 mb-1 was-validated'>
         
          <div className="form-group mb-2">
            <label htmlFor="budgetkw" className="form-check-label">Budgeted kW Value</label>
            <input type="text" className="form-control" required value={values.budgetkw} onChange={handleChange('budgetkw')} />
            {errors.budgetkw && <div className="text-danger">{errors.budgetkw}</div>}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="mode" className="form-check-label">Measuring Mode</label>
            {/* <input type="text" className="form-control" required value={values.mode} onChange={handleChange('mode')} /> */}
            <select
                onChange={handleChange('mode')}
                  name='measuringMode'
                  value={values.mode}
                  className='form-control'
                >
                <option value=''>Select Measuring Mode</option>
                  {dropMeasuringMode.map((mode) => (
                    <option key={mode.deviceMeasuringModeId} value={mode.deviceMeasuringModeId}>
                      {mode.deviceMeasuringModeName}
                </option>
                ))}
            </select>
            {errors.mode && <div className="text-danger">{errors.mode}</div>}
          </div>
          <div className='form-group mb-2'>
            <label htmlFor="billingSessionStart" className="form-check-label">Billing Session Start</label>
            <div>
              <ReactDatePicker
                  selected={values.billingSessionStart}
                  onChange={handleChange('billingSessionStart')}
                  selectsStart
                  startDate={values.billingSessionStart}
                  endDate={values.billingSessionEnd}
                  placeholderText="Start Date"
                  dateFormat='dd MMM yyyy'
              />
            </div>
          </div>
          <div className='form-group mb-2'>
            <label htmlFor="billingSessionEnd" className="form-check-label">Billing Session End</label>
            <div>
              <ReactDatePicker
                  selected={values.billingSessionEnd}
                  onChange={handleChange('billingSessionEnd')}
                  selectsEnd
                  startDate={values.billingSessionStart}
                  endDate={values.billingSessionEnd}
                  placeholderText="End Date"
                  dateFormat='dd MMM yyyy'
              />
            </div>
          </div>

        </div>
      </div>
      <div className="button-group">
        <button onClick={prevStep} className="prev-btn">Back</button>
        <button onClick={handleSubmit} className="next-btn">Submit</button>
      </div>
    </div>
  );
};


const Setup = () => {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [errormessage, setErrorMessage] = useState('');

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    userrole: '',
    displayname: '',
    password: '',
    email: '',
    mobile: '',
    address: '',
    tel: '',
    devicename: '',
    deviceid: '',
    deviceno: '',
    devicetype: '',
    serialno: '',
    supplier: '',
    consumercategory: '',
    subcategory: '',
    budgetkw: '',
    mode: ''
  });

  const nextStep = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // const handleChange = (input) => (e) => {
  //   setFormData({ ...formData, [input]: e.target.value });
  // };

  const handleChange = (input) => (e) => {
    if (input === 'billingSessionStart' || input === 'billingSessionEnd') {
      const utcDate = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds()));
      setFormData({ ...formData, [input]: utcDate  }); 
    } else {
      setFormData({ ...formData, [input]: e.target.value }); 
    }
  };
  

  const validateForm = () => {
    let newErrors = {};
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  useEffect(() => {
      loadVerifyDeviceBySN();
  }, []);

  const loadVerifyDeviceBySN = async () => {
    try {
      // console.log('verifyDeviceBySN', formData);

      const result = await verifyDeviceBySN(formData.serialno);   
      console.log('verifyDeviceBySN', result);
    } catch (error) {
      console.error('Error verifying device:', error);
    }
  };
  

  const saveServiceProfileSetup = async () => {
    try {
      const payload = {
        userName: formData.username,
        userrole: 2,
        displayName: formData.displayname, 
        password: formData.password, 
        isActive: true, 
        email: formData.email,
        mobileNo: formData.mobile, 
        profilePic: "1", 
        siteAddress: formData.address, 
        tel: formData.tel, 
        deviceId: formData.deviceid, 
        deviceName: formData.devicename,
        supplierId: formData.supplier, 
        consumerCategoryId: formData.consumercategory, 
        consumerSubCategoryId: formData.subcategory, 
        budgetedValue: formData.budgetkw,
        measuringModeId: formData.mode,
        opertationalMetricId: 1,
        billingSessionStart: formData.billingSessionStart,
        billingSessionEnd: formData.billingSessionEnd
      };

      const result = await serviceProfileSetup(payload);
      console.log('serviceProfileSetup', result);

      const { responseStatus, outputMessage } = result.data;
      if (responseStatus === "failed") {
        setErrorMessage(outputMessage);
        return;
      }

      setMessage(outputMessage);
      swal("Updated Successfully", "", "success").then(() => {
      });

    } catch (err) {
      console.log(err);
      setErrorMessage("An error occurred while saving the profile setup.");
    }
  };

  return (
    <div className='home'>
      <div className='body'>
        <div className='d-flex align-items-center justify-content-center'>
          <div className="app-setup">
            <div className="header-setup">
              <h2>Build Your Account</h2>
              {/* {JSON.stringify(formData)} */}
            </div>
            <div className="tabs-setup">
              <div className={`tab-setup ${step === 1 ? 'active' : ''}`}>Service Profile</div>
              <div className={`tab-setup ${step === 2 ? 'active' : ''}`}>Device Details</div>
              <div className={`tab-setup ${step === 3 ? 'active' : ''}`}>Service Preferences</div>
            </div>
            {step === 1 && <Step1 nextStep={nextStep} handleChange={handleChange} values={formData} errors={errors} />}
            {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} errors={errors} setFormData={setFormData}/>}
            {step === 3 && <Step3 prevStep={prevStep} handleChange={handleChange} values={formData} errors={errors} saveServiceProfileSetup={saveServiceProfileSetup} />}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Setup;
