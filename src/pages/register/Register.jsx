import React from 'react'
import './Register.css'


function Register() {
  return (
    <div className='wrapper-register d-flex align-items-center justify-content-center w-100'>
        <div className='register'>
            <h2 className='d-flex align-items-center justify-content-center mb-2'>Register</h2>
            <form className='needs-validation'>
                <div className='form-group was-validated mb-1'>
                    <label htmlFor='username' className='form-label'>Username</label>
                    <input type='text' className='form-control' required ></input>
                    {/* <div className='invalid-feedback'>Please enter your Email</div> */}
                </div>
                <div className='form-group was-validated mb-1'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input type='password' className='form-control' required ></input>
                    {/* <div className='invalid-feedback'>Please enter your Password</div> */}
                </div>
                <div className='form-group was-validated mb-1'>
                    <label htmlFor='address' className='form-label'>Address</label>
                    <textarea type='text' className='form-control' required ></textarea>
                </div>
                <div className='form-group was-validated mb-1'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input type='email' className='form-control' required ></input>
                </div>
                <div className='form-group was-validated mb-1'>
                    <label htmlFor='billingaddress' className='form-label'>Billing Address</label>
                    <textarea type='text' className='form-control' required ></textarea>
                    {/* <div className='invalid-feedback'>Please enter your Password</div> */}
                </div>
                <div className='form-group was-validated mb-1'>
                    <label htmlFor='userrole' className='form-label'>User Role</label>
                    <input type='text' className='form-control' required ></input>
                </div>
                <div className='form-group was-validated mb-1'>
                    <label htmlFor='mobile' className='form-label'>Mobile</label>
                    <input type='number' className='form-control' required ></input>
                </div>
                <div className='form-group was-validated mb-1'>
                    <label htmlFor='tel' className='form-label'>Tel</label>
                    <input type='number' className='form-control' required ></input>
                </div>
                <button type='submit' className='btn btn-primary w-100 mt-2'>Save</button>
            </form>
        </div>
    </div>
  )
}

export default Register