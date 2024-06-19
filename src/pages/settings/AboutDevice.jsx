import React from 'react';
import packageJson from '../../../package.json'; 
import company from '../../assent/company-logo.png'; 
import './Budget.css';

function AboutDevice() {
  // Extract the version number from the imported package.json file
  const version = packageJson.version;

  return (
    <div className='d-flex align-items-center justify-content-center w-100'>
      <div className='notification' style={{ backgroundColor: '#d1dde8' }}>
        <div className='rounded ' style={{marginTop:'50px'}} >
          <h4 className='d-flex align-items-center justify-content-center'>About FIDA Smart Energy Meter</h4>
       
          <div className='about-content'  >
            {/* Display the dynamically retrieved version number */}
            <p>Version: {version}</p>
            {/* <p>Version: 1.0.0-alpha.2</p> */}

            <p>FIDA Smart Energy Meter is your trusted companion for monitoring and managing energy consumption effectively. With our innovative solution, you can track various parameters such as kWh, Currency Amount, Voltage, Power Factor (PF), Frequency, Watt, and Current in real-time. Our intuitive interface and interactive charts make it easy to visualize energy usage trends and stay within your budget.</p>
            <p>For more information : <a href="https://www.fidaglobal.com/" target="_blank" rel="noopener noreferrer">FIDA Global Pvt Ltd</a></p>
          </div>

            <div className='company-logo' style={{ justifyContent:'flex-end', display:'flex', alignItems:'flex-end'}}>
              <div>
                <p style={{marginTop:'-31px', marginLeft:'-80px',position:'absolute'}}>Powered by</p> 
              </div>&nbsp;
              <img src={company} alt='company logo' style={{width:'70px'}}/>
            </div>     
        </div>
      </div>
    </div>                                                  
  );
}

export default AboutDevice;
