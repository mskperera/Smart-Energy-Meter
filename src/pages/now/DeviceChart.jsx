import React from "react";
import KwhBillChart from "./KwhBillChart";
import OperationalChart from "./OperationalChart";
import { FaHeartbeat } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
// import { color } from "chart.js/helpers";
import { FaLocationDot } from "react-icons/fa6";
import { ProgressBar } from 'react-bootstrap';
import { MdPermDeviceInformation } from "react-icons/md";
import moment from "moment";
import LineChart from "./LineChart";

function DeviceChartMode({ deviceName, device, deviceLocation, daysElapsed , numberOfDays, startDate, endDate  }) {
  const { lines} = device;

  // const days = daysElapsed;
  // const maxDays = numberOfDays;
  const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
  const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

  return (
    <>
    <div className="main-section">
      {/* <div className="back-color"></div> */}
      <div className="section">
        <div className="section-status">
          <div className="device-active">
            {device.status && (
              <div className="both">
                <div 
                  className={`curcle ${
                    device.status.deviceStatus === "online"
                      ? "curcle-online"
                      : "curcle-offline"
                  }`}
                >
                  {device.status.deviceStatus === "online" && <FaHeartbeat />}
                  {device.status.deviceStatus === "offline" && <FaHeartBroken />}
                </div>
                <div className="curcle-name">
                  <div
                    className={`device-status ${
                      device.status.deviceStatus === "online" ? "online" : "offline"
                    }`}
                  >
                    {device.status.deviceStatus}
                  </div>
                </div>
              </div>
            )} 
          </div>
          <div className="days-bar">
            <div className="days-bar-one">
                <h6><MdPermDeviceInformation size={18} style={{marginTop:'-10px'}}/>{deviceName} <span><FaLocationDot color={'red'} size={15} style={{marginTop:'-8px'}}/>{deviceLocation}</span></h6>
            </div>
            <div className="days-bar-two">
                  <h6 style={{marginTop:'-30px', position:'relative', marginLeft:'5px'}}>Start Date: {formattedStartDate} / End Date: {formattedEndDate}</h6>
                <div className="d-flex justify-content-start">
                  <span className="session-number">0</span>&nbsp;
                  <div className="progress d-flex justify-content-start">
                   <ProgressBar now={daysElapsed} 
                    max={numberOfDays} 
                    className="progress-bar progress-bar2" 
                    style={{ width: `${(daysElapsed / numberOfDays) * 100}%` }}>
                   <span 
                      style={{ 
                        position: 'inherit', 
                        left: '50%', 
                        transform: 'translateX(0%)',
                        fontWeight: '600',
                        color: 'black', 
                      }}
                    >
                      {daysElapsed}
                    </span>
                   </ProgressBar>
                    
                  {/* /> */}
                  
                  </div>
                  &nbsp;<span className="session-number">{numberOfDays}</span>
                </div>
            </div>
          </div>
        </div>
        {device.deviceTypeId === 2 && (
          <div className="line-values" style={{ display: 'flex'}}>
            {/* <div className="line-type" title="Individual Line Measurement Mode" style={{cursor:'pointer'}}>
              {device.deviceMeasuringModeId === 1 ? "Mode : ILMM" : "Consolidated Mode"}
            </div> */}
            <div className="line-total">
            <div className="line-total-kw">
              <div>
                Total kWh: <span style={{color:'#fff346'}}>{device.kwh.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="line-total-kw">
              <div>
                Total Bill:<span style={{color:'#4484ff'}}>{device.usageBill.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> 
              </div>
            </div>
            </div>
            {device.deviceMeasuringModeId === 2 && (
              <>
              <div className="line-values">
                <div className="line-total">
                  <div className="line-total-kw">
                    <div>Budgeted kWh: {device.budgetedKwh}</div>
                  </div>
                  <div className="line-total-kw">
                    <div>Budgeted Bill: {device.budgetedBill}</div>
                  </div>
                </div>
              </div>
              </>
            )}
          </div>
        )}
      </div>
      {lines.map((line, index) => (
        <React.Fragment key={`kwh-bill-${line.lineNo || index}`}>
          {device.deviceTypeId === 2 && device.deviceMeasuringModeId === 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="line-name">Line: {line.line}</div>
            </div>
          )}
          <KwhBillChart
            key={`kwh-chart-${line.lineNo || index}`}
            lineNo={line.lineNo}
            voltage={line.voltage}
            current={line.current}
            pf={line.pf}
            hertz={line.hertz}
            power={line.power}
            kwh={line.kwh}
            usageBill={line.usageBill}
            budgetedKwh={line.budgetedKwh}
            budgetedBill={line.budgetedBill}
          />
        </React.Fragment>
      ))}
      {lines.map((line, index) => (
        <React.Fragment key={`operational-chart-${line.lineNo || index}`}>
          {device.deviceTypeId === 2 && device.deviceMeasuringModeId === 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="line-number">Line: {line.line}</div>
            </div>
          )}
          <OperationalChart
            key={`operational-chart-${line.lineNo || index}`}
            lineNo={line.lineNo}
            voltage={line.voltage}
            current={line.current}
            pf={line.pf}
            hertz={line.hertz}
            power={line.power}
            kwh={line.kwh}
            bill={line.bill}
            budgetedKwh={line.budgetedKwh}
            budgetedBill={line.budgetedBill}
           
          />
        </React.Fragment>
      ))}
    </div>
    {/* <br/> */}
    {/* <LineChart/> */}
       {/* {lines.map((line, index) => (
        <React.Fragment key={`operational-chart-${line.lineNo || index}`}>
          {device.deviceTypeId === 2 && device.deviceMeasuringModeId === 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="line-number">Line: {line.line}</div>
            </div>
          )}
        <OperationalChartMode
          key={`operational-chart-${line.lineNo || index}`}
          lineNo={line.lineNo}
          voltage={line.voltage}
          current={line.current}
          pf={line.pf}
          hertz={line.hertz}
          power={line.power}
          kwh={line.kwh}
          bill={line.bill}
          budgetedKwh={line.budgetedKwh}
          budgetedBill={line.budgetedBill}
        />
        </React.Fragment>
      ))} */}
    </>
  );
}

export default DeviceChartMode;
