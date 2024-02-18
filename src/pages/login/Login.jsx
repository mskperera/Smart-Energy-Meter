import React from 'react'
import './Login.css'

function Login() {
  return (
    <div className='wrapper d-flex align-items-center justify-content-center w-100'>
        <div className='login'>
            <h2 className='d-flex align-items-center justify-content-center mb-3'>Login</h2>
            <form className='needs-validation'>
                <div className='form-group was-validated mb-2'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input type='email' className='form-control' required placeholder='test@gmail.com'></input>
                    {/* <div className='invalid-feedback'>Please enter your Email</div> */}
                </div>
                <div className='form-group was-validated mb-2'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input type='password' className='form-control' required placeholder='********'></input>
                    {/* <div className='invalid-feedback'>Please enter your Password</div> */}
                </div>
                <div className='form-group mb-2'>
                    <input type='checkbox' className='form-check-input'></input>
                    <label htmlFor='check' className='form-check-label'>Remember Me</label>
                </div>
                <button type='submit' className='btn btn-primary w-100 mt-2'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login