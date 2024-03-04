import React, { useState } from 'react'
import './Login.css'
import {login} from '../../action/userAuth'
import { Link, useNavigate } from 'react-router-dom';



function Login() {
 
    const navigate=useNavigate();
    const [errorMessage,setErrorMessage]=useState('');

    const [formData, setFormData]=useState({

            "userName":"admin",
            "password":"1234",
            "gmtOffset":"+5:30",
            "publicIP":"212.121"  
    });
    

      const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await login(formData);
          console.log('response',response);
          // if (response.status === 200) {
             navigate('/home');
          //   console.log('Login successful! Navigate to home page.');
          // } else {
   
          //   console.log('Login failed. Handle error.');
          // }
        } catch (error) {
          console.error('Error during login:', error);
          setErrorMessage(error.response.data.error)
        }
      };

  return (
    <div className='wrapper d-flex align-items-center justify-content-center w-100'>
        <div className='login'>
            <h2 className='d-flex align-items-center justify-content-center mb-3'>Login</h2>
            <form className='needs-validation' onSubmit={handleLogin}>
                <div className='form-group was-validated mb-2'>
                    <label htmlFor='username' className='form-label'>Username</label>
                    <input type='text' className='form-control' required placeholder='test@gmail.com' value={formData.userName} 
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}></input>
                    {/* <div className='invalid-feedback'>Please enter your Email</div> */}
                </div>
                <div className='form-group was-validated mb-2'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input type='password' className='form-control' required placeholder='********' value={formData.password} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}></input>
                    {/* <div className='invalid-feedback'>Please enter your Password</div> */}
                </div>
                <div className='form-group mb-2'>
                    <input type='checkbox' className='form-check-input'></input>
                    <label htmlFor='check' className='form-check-label'>Remember Me</label>
                </div>
                <button type='submit' className='btn btn-primary w-100 mt-2'>Login</button>
                {errorMessage &&   <p>{errorMessage}</p>}
                {/* <Link to={'/register'}><p>Register Here</p></Link> */}
            </form>
        </div>
    </div>
  )
}

export default Login