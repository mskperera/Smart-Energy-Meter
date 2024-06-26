import React, { useEffect, useState } from 'react';
import './Login.css';
import { login } from '../../action/userAuth';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import deviceReducer, { setDropDevices } from '../../state/device/deviceReducer';
import logo from '../../assent/logo-1.png';
import company from '../../assent/company-logo.png';
import { ThreeDots } from 'react-loader-spinner';
// import { ThreeDots } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const [load,setLoad]=useState(false);

  const [loading, setLoading] = useState(true); 

  const [loadLogin, setLoadLogin] = useState(false);

  const [formData, setFormData] = useState({
    userName: '', 
    password: '',
    gmtOffset: "+5.30", 
    publicIP: "212.121"
  });


  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadLogin(true);

    try {
      const response = await login(formData);
      console.log('response', response);

      if (response.status === 200) {
        
        setTimeout(() => {
          setLoadLogin(false);
          navigate('/home');
        }, 2000); 
      } else {
        console.log('Login failed. Handle error.');
        setLoadLogin(false); 
        // window.location.reload();
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage(error.response?.data?.error || 'An error occurred');
      setLoadLogin(false); 
      setFormData({ 
        userName: '', password: '', gmtOffset: "+5.30", publicIP: "212.121"
      });
      // window.location.reload();
      // setErrorMessage(false);
    }
  };

  return (
    <div className='wrapper d-flex align-items-center justify-content-center w-100'>
      <div className='login'>
        <h2 className='d-flex align-items-center justify-content-center mb-3'>Login</h2>
        <form className='needs-validation' onSubmit={handleLogin}>
          <div className='form-group was-validated mb-2'>
            <label htmlFor='username' className='form-label'>Username</label>
            <input
              type='text'
              className='form-control'
              required
              placeholder='username'
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            />
          </div>
          <div className='form-group was-validated mb-2'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              required
              placeholder='********'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type='submit' className='btn btn-primary w-100 mt-2' disabled={loading}>
            {loadLogin ? 'Loading...' : 'Login'} 
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
        {loading && (
          <div className='loading-overlay'>
          <div className='loading-spinner d-flex justify-content-center align-items-center'>   
            <img src={logo} alt='Loading...' />
          </div>
          <div className='companylogo'>
            <p className='text-center'>Powered By</p>
            <img src={company} alt='Company Logo' />
          </div>    
        </div>
        )}
        {
          loadLogin && (
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
          )
        }
      </div>
    </div>
  );
}

export default Login;
