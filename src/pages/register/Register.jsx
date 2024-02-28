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
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input type='email' className='form-control' required ></input>
                </div>

                <div class="mb-1">
                     <label for="formFile" class="form-label">Profile Picture</label>
                     <input class="form-control" type="file" id="formFile"/>
                </div>
                <div className='form-group was-validated mb-1'>
                    <label htmlFor='displayname' className='form-label'>Display Name</label>
                    <input type='text' className='form-control' required ></input>
                </div>
                <button type='submit' className='btn btn-primary w-100 mt-3'>Save</button>
            </form>
        </div>
    </div>
  )
}

export default Register