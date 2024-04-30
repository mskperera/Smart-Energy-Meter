import React from 'react';
import './Budget.css';

function AboutDevice() {
  return (
    <div className='d-flex align-items-center justify-content-center w-100'>
      <div className='notification'>
        <div className='rounded'>
          <h4 className='d-flex align-items-center justify-content-center'>About FIDA Smart Energy Meter</h4>
       
          <div className='about-content'>
        
            <p>Version: 1.0.0-alpha.1</p>
            <p>FIDA Smart Energy Meter is your trusted companion for monitoring and managing energy consumption effectively. With our innovative solution, you can track various parameters such as kWh, Currency Amount, Voltage, Power Factor (PF), Frequency, Watt, and Current in real-time. Our intuitive interface and interactive charts make it easy to visualize energy usage trends and stay within your budget.</p>
          </div>     
        </div>
      </div>
    </div>                                                  
  );
}

export default AboutDevice;
