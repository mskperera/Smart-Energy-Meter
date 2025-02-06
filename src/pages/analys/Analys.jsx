import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip  } from 'recharts';
import './Analys.css';
import BottomNav from '../../components/bottommenu/BottomNav';

const Analys = () => {

  const [clickedPoint, setClickedPoint] = useState(null);
  
  const chartData = [
    { day: 'Sun', Energy: 80, Power: 45, Current: 85, Voltage: 231, PowerFactor: 0.9 },
    { day: 'Mon', Energy: 85, Power: 50, Current: 88, Voltage: 229, PowerFactor: 0.85 },
    { day: 'Wed', Energy: 88, Power: 48, Current: 84, Voltage: 231, PowerFactor: 0.89 },
    { day: 'Thu', Energy: 92, Power: 52, Current: 87, Voltage: 230, PowerFactor: 0.87 },
    { day: 'Fri', Energy: 85, Power: 49, Current: 83, Voltage: 229, PowerFactor: 0.86 },
    { day: 'Sat', Energy: 83, Power: 47, Current: 82, Voltage: 228, PowerFactor: 0.88 }
  ];

  const devices = [
    { id: 1, name: 'Device 1', energy: 120, voltage: '231.2v', current: '25.89A', power: '5.9kw', pf: '0.9kf', freq: '50.1Hz' },
    { id: 2, name: 'Device 2', energy: 150, voltage: '231.2v', current: '25.89A', power: '5.9kw', pf: '0.9kf', freq: '50.1Hz' },
    { id: 3, name: 'Device 3', energy: 110, voltage: '231.2v', current: '25.89A', power: '5.9kw', pf: '0.9kf', freq: '50.1Hz' },
    { id: 4, name: 'Device 4', energy: 170, voltage: '231.2v', current: '25.89A', power: '5.9kw', pf: '0.9kf', freq: '50.1Hz' },
    { id: 5, name: 'Device 5', energy: 80, voltage: '231.2v', current: '25.89A', power: '5.9kw', pf: '0.9kf', freq: '50.1Hz' }
  ];

  const totalEnergy = devices.reduce((sum, device) => sum + device.energy, 0);

  const chartKeys = {
    "Energy Usage": "Energy",
    "Power": "Power",
    "Current": "Current",
    "Voltage": "Voltage",
    "Power Factor": "PowerFactor"
  };


  const handlePointClick = (event) => {
    if (event && event.activePayload) {
      const pointData = event.activePayload[0].payload;
      setClickedPoint(pointData);
    }
  };
  return (
    <dvi className="home" >
    <div className="body" style={{ backgroundColor: '#2d2e2e' }}>
      <div className="dashboard-container">
        {/* Left Panel */}
        <div className="left-panel" style={{ backgroundColor: '#2d2e2e' }}>
          <div className="group-card">
            <div className="group-title">Group 1</div>
            <div className="group-energy">{totalEnergy} kWh</div>
            <div className="group-stats">29.5kw 149.45A</div>
          </div>
          
          {devices.map((device, index) => (
            <div key={device.id} className={`device-card device-${index + 1}`}>
              <div className="device-content">
                <div className="device-info">
                  <div className="">{device.name}</div>
                  <div className="device-energy">{device.energy}kWh</div>
                  <div className="device-energy">{device.power}</div>
                </div>
                <div className="device-stats">
                  <div className='device-stats-left'>
                    <div>{device.voltage}</div>
                    <div>{device.current}</div>
                  </div>
                  <div className='device-stats-left'>
                    <div>{device.pf}</div>
                    <div>{device.freq}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="controls-section">
            <div className="controls-container">
              <div className="period-buttons">
                <button>Day</button>
                <button>Week</button>
                <button>Session</button>
                <button>Year</button>
                <button>Custom</button>
              </div>
              <div className="date-range-container">
              <div className="date-range">29 Dec - 04 Jan</div>
              <div className="period-label">Last week</div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-container">
            {Object.keys(chartKeys).map((title, index) => (
              <div key={title} className="chart-card">
                <div className="chart-title">{title}</div>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={chartData} onClick={handlePointClick} style={{ margin: '0 auto' }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey={chartKeys[title]} 
                      stroke={
                        index === 0 ? '#3B82F6' :
                        index === 1 ? '#EF4444' :
                        index === 2 ? '#F59E0B' :
                        index === 3 ? '#10B981' :
                        '#6366F1'
                      }
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
      <BottomNav className="bottombar1" />
    </dvi>
  );
};

export default Analys;