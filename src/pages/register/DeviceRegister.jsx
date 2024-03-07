import React from 'react'

function DeviceRegister() {
  return (
    <div className='wrapper-register d-flex align-items-center justify-content-center w-100'>
      <div className='register'>
        <h2 className='d-flex align-items-center justify-content-center mb-2'>Device Registration</h2>
        <form className='needs-validation'>
          <div className='row'>
            {/* First Column */}
            <div className='col-md-6 mb-1'>
              <div className='form-group was-validated'>
                <label htmlFor='devicename' className='form-label'>
                  Device Name
                </label>
                <input type='text' className='form-control' required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='deviceno' className='form-label'>
                  Device No
                </label>
                <input type='text' className='form-control' required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='version' className='form-label'>
                  Firmware Version
                </label>
                <input type='text' className='form-control' required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input type='email' className='form-control' required />
              </div>
            </div>

            {/* Second Column */}
            <div className='col-md-6 mb-1'>
              <div className='form-group was-validated'>
                <label htmlFor='address' className='form-label'>
                  Address
                </label>
                <input type='text' className='form-control' required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='billingaddress' className='form-label'>
                  Billing Address
                </label>
                <input type='text' className='form-control' required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='mobile' className='form-label'>
                  Mobile
                </label>
                <input type='number' className='form-control' required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='tel' className='form-label'>
                  Tel
                </label>
                <input type='number' className='form-control' required />
              </div>
            </div>
          </div>

          <button type='submit' className='btn btn-primary w-100 mt-3'>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default DeviceRegister