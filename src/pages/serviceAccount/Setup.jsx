import React, { useState } from 'react';
import './Setup.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import { CgProfile } from 'react-icons/cg';

const Step1 = ({ nextStep, handleChange, values, errors }) => {
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
          <div className='form-group mb-2'>
            <label htmlFor='userrole' className='form-check-label'>User Role</label>
            <select required name='userrole' className='form-control' value={values.userrole} onChange={handleChange('userrole')} >
              <option value="" disabled>Select User Role</option>
            </select>
            {errors.userrole && <div className="text-danger">{errors.userrole}</div>}
          </div>
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
        </div>
        <div className='col-md-6 mb-1 was-validated'>
          <div className='form-group mb-2'>
            <label htmlFor='address' className='form-check-label'>Address</label>
            <input type='text' className='form-control' required value={values.address} onChange={handleChange('address')} />
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>
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

const Step2 = ({ nextStep, prevStep, handleChange, values, errors }) => {
  return (
    <div className="form-container">
      <h2>Account</h2>
      <div className='row'>
        <div className='col-md-6 mb-1 was-validated'>
          <div className="form-group mb-2">
            <label htmlFor="deviceno" className="form-check-label">Device No</label>
            <input type="text" className="form-control" required value={values.deviceno} onChange={handleChange('deviceno')} />
            {errors.deviceno && <div className="text-danger">{errors.deviceno}</div>}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="model" className="form-check-label">Model</label>
            <input type="text" className="form-control" required value={values.model} onChange={handleChange('model')} />
            {errors.model && <div className="text-danger">{errors.model}</div>}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="devicename" className="form-check-label">Device Name</label>
            <input type="text" className="form-control" required value={values.devicename} onChange={handleChange('devicename')} />
            {errors.devicename && <div className="text-danger">{errors.devicename}</div>}
          </div>
        </div>
        <div className='col-md-6 mb-1 was-validated'>
          <div className="form-group mb-2">
            <label htmlFor="devicetype" className="form-check-label">Device Type</label>
            <input type="text" className="form-control" required value={values.devicetype} onChange={handleChange('devicetype')} />
            {errors.devicetype && <div className="text-danger">{errors.devicetype}</div>}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="serialno" className="form-check-label">Serial No</label>
            <input type="text" className="form-control" required value={values.serialno} onChange={handleChange('serialno')} />
            {errors.serialno && <div className="text-danger">{errors.serialno}</div>}
          </div>
        </div>
      </div>
      <div className="button-group">
        <button onClick={prevStep} className="prev-btn">Back</button>
        <button onClick={nextStep} className="next-btn">Next</button>
      </div>
    </div>
  );
};

const Step3 = ({ prevStep, handleChange, values, errors }) => {
  return (
    <div className="form-container">
      <h2>Service</h2>
      <div className='row'>
        <div className='col-md-6 mb-1 was-validated'>
          <div className="form-group mb-2">
            <label htmlFor="supplier" className="form-check-label">Supplier</label>
            <input type="text" className="form-control" required value={values.supplier} onChange={handleChange('supplier')} />
            {errors.supplier && <div className="text-danger">{errors.supplier}</div>}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="consumercategory" className="form-check-label">Consumer Category</label>
            <input type="text" className="form-control" required value={values.consumercategory} onChange={handleChange('consumercategory')} />
            {errors.consumercategory && <div className="text-danger">{errors.consumercategory}</div>}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="subcategory" className="form-check-label">Consumer Sub Category</label>
            <input type="text" className="form-control" required value={values.subcategory} onChange={handleChange('subcategory')} />
            {errors.subcategory && <div className="text-danger">{errors.subcategory}</div>}
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
            <input type="text" className="form-control" required value={values.mode} onChange={handleChange('mode')} />
            {errors.mode && <div className="text-danger">{errors.mode}</div>}
          </div>
        </div>
      </div>
      <div className="button-group">
        <button onClick={prevStep} className="prev-btn">Back</button>
        <button onClick={() => alert(JSON.stringify(values, null, 2))} className="next-btn">Submit</button>
      </div>
    </div>
  );
};

const Setup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    userrole: '',
    password: '',
    email: '',
    address: '',
    displayname: '',
    mobile: '',
    tel: '',
    deviceno: '',
    model: '',
    devicename: '',
    devicetype: '',
    serialno: '',
    supplier: '',
    consumercategory: '',
    subcategory: '',
    budgetkw: '',
    mode: ''
  });

  const [errors, setErrors] = useState({});

  const nextStep = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    switch (step) {
    //   case 1:
    //     if (!formData.username) newErrors.username = 'Username is required';
    //     // if (!formData.userrole) newErrors.userrole = 'User role is required';
    //     if (!formData.password) newErrors.password = 'Password is required';
    //     if (!formData.email) newErrors.email = 'Email is required';
    //     if (!formData.address) newErrors.address = 'Address is required';
    //     if (!formData.displayname) newErrors.displayname = 'Display name is required';
    //     if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    //     if (!formData.tel) newErrors.tel = 'Telephone number is required';
    //     break;
    //   case 2:
    //     if (!formData.deviceno) newErrors.deviceno = 'Device number is required';
    //     if (!formData.model) newErrors.model = 'Model is required';
    //     if (!formData.devicename) newErrors.devicename = 'Device name is required';
    //     if (!formData.devicetype) newErrors.devicetype = 'Device type is required';
    //     if (!formData.serialno) newErrors.serialno = 'Serial number is required';
    //     break;
    //   case 3:
    //     if (!formData.supplier) newErrors.supplier = 'Supplier is required';
    //     if (!formData.consumercategory) newErrors.consumercategory = 'Consumer category is required';
    //     if (!formData.subcategory) newErrors.subcategory = 'Consumer subcategory is required';
    //     if (!formData.budgetkw) newErrors.budgetkw = 'Budgeted kW value is required';
    //     if (!formData.mode) newErrors.mode = 'Measuring mode is required';
    //     break;
    //   default:
    //     break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='home'>
      <div className='body'>
        <div className='d-flex align-items-center justify-content-center'>
          <div className="app-setup">
            <div className="header-setup">
              <h2>Build Your Account</h2>
            </div>
            <div className="tabs-setup">
              <div className={`tab-setup ${step === 1 ? 'active' : ''}`}>Service Profile</div>
              <div className={`tab-setup ${step === 2 ? 'active' : ''}`}>Device Details</div>
              <div className={`tab-setup ${step === 3 ? 'active' : ''}`}>Service Preferences</div>
            </div>
            {step === 1 && <Step1 nextStep={nextStep} handleChange={handleChange} values={formData} errors={errors} />}
            {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} errors={errors} />}
            {step === 3 && <Step3 prevStep={prevStep} handleChange={handleChange} values={formData} errors={errors} />}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Setup;
