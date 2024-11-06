import React, { useEffect, useState } from "react";
import KwhBillChart from "./KwhBillChart";
import OperationalChart from "./OperationalChart";
import { FaHeartbeat } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { ProgressBar } from 'react-bootstrap';
import { MdPermDeviceInformation } from "react-icons/md";
import moment from "moment";
import LineChart from "./LineChart";
import LineChartActual from "./LineChartActual";
import LineChartBudget from "./LineChartBudget";
import LineChartCost from "./LineChartCost";
import { getMaximumDemand } from "../../action/device";
import { useSelector } from "react-redux";

function DeviceChartMode({ deviceName, device, deviceLocation, daysElapsed , numberOfDays, startDate, endDate  }) {
  const { lines } = device;
  const formattedStartDate = moment(startDate).format('YYYY MMM DD');
  const formattedEndDate = moment(endDate).format('YYYY MMM DD');
  
  const [showActualChart, setShowActualChart] = useState(true);


  const remainingDays = numberOfDays - daysElapsed;


  const [maximumDemand, setMaximumDemand] = useState('');

    const selectedDevice = useSelector((state) => state.device.selectedDevice);
    

    useEffect(() => {
        if (selectedDevice) {
            const deviceId = selectedDevice.id;
        loadMaximumDemand(deviceId);
        }
    }, [selectedDevice]);

    const loadMaximumDemand = async (deviceId) => { 

        const result = await getMaximumDemand(deviceId);
        console.log('Maximum Demand',result.data);
        setMaximumDemand(result.data.maximumdemand);
    }

  return (
    <>
      <div className="main-section">
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
                    {device.status.deviceStatus === "offline" && (
                      <FaHeartBroken />
                    )}
                  </div>
                  <div className="curcle-name">
                    <div
                      className={`device-status ${
                        device.status.deviceStatus === "online"
                          ? "online"
                          : "offline"
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
                <h6 className="name-location">
                  <span>
                    <MdPermDeviceInformation
                      size={18}
                      style={{ marginTop: "-8px", color: "gray" }}
                    />
                    {deviceName}
                  </span>
                  <span>
                    <FaLocationDot
                      color={"red"}
                      size={15}
                      style={{ marginTop: "-8px", marginLeft: "5px" }}
                    />
                    {deviceLocation}
                  </span>
                </h6>
              </div>
              <div className="days-bar-two-home">
                <div>
                  <h6 className="topic1" style={{ position: "relative" }}>
                    {formattedStartDate}
                  </h6>
                  <h6 className="topic2" style={{ position: "relative" }}>
                    {formattedEndDate}
                  </h6>
                </div>
                <div className="d-flex justify-content-start">
                  <span className="session-number">0</span>&nbsp;
                  <div className="progress d-flex justify-content-start">
                    <ProgressBar
                      now={daysElapsed}
                      max={numberOfDays}
                      className="progress-bar progress-bar2"
                      style={{
                        width: `${(daysElapsed / numberOfDays) * 100}%`,
                        background: "#00bbf0",
                      }}
                    >
                      <span
                        style={{
                          position: "inherit",
                          left: "50%",
                          transform: "translateX(0%)",
                          fontWeight: "550",
                          color: "white",
                        }}
                      >
                        {daysElapsed}
                      </span>
                    </ProgressBar>
                    <span
                      style={{
                        position: "inherit",
                        right: "0px",
                        transform: "translateX(0%)",
                        fontWeight: "550",
                        color: "#00bbf0",
                      }}
                    >
                      {remainingDays}
                    </span>
                  </div>
                  &nbsp;<span className="session-number">{numberOfDays}</span>
                  {/* &nbsp;<span className="session-number">({remainingDays} days left)</span> */}
                </div>
              </div>
            </div>
          </div>
          {device.deviceTypeId === 2 && (
            <div className="line-values" style={{ display: "flex" }}>
              <div className="line-total d-flex">
                <div className="line-total-kw" style={{ marginLeft: "60px" }}>
                  <div>
                    Total kWh:{" "}
                    <span>
                      {device.kwh.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div className="line-total-kw" style={{ marginLeft: "-320px" }}>
                  <div>
                    Total Bill:
                    <span>
                      {device.usageBill.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
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
        <div
          className="d-flex justify-content-end page-bottom-mode"
          style={{ marginLeft: "-10px" }}
        >
          <div className="pow mode2" style={{ width: "310px" }}>
            <h6 style={{ marginTop: "5px", color: "yellow" }}>
              Maximum Demand
            </h6>
            <span style={{ marginTop: "-5px" }}>{maximumDemand}</span>
          </div>
        </div>

        {lines.map((line, index) => (
          <React.Fragment key={`kwh-bill-${line.lineNo || index}`}>
            {device.deviceTypeId === 2 &&
              device.deviceMeasuringModeId === 1 && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="line-name" style={{ color: "white" }}>
                    Line: {line.line}
                  </div>
                </div>
              )}
            <KwhBillChart
              key={`kwh-chart-${line.lineNo || index}`}
              lineNo={line.lineNo}
              deviceTypeId={device.deviceTypeId}
              deviceMeasuringModeId={device.deviceMeasuringModeId}
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
            {device.deviceTypeId === 2 &&
              device.deviceMeasuringModeId === 1 && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                ></div>
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
      <br />
      {/* <> */}
      {/* <div className="chart-budget-cost">      
            {lines.map((line, index) => (
              <React.Fragment key={`line-${line.lineNo || index}`}>
                {device.deviceTypeId === 2 && device.deviceMeasuringModeId === 1 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    </div>
                )}
                
                <LineChartCost 
                key={`line-chart-${line.lineNo || index}`} 
                device={device} 
                daysElapsed={daysElapsed} 
                numberOfDays={numberOfDays} 
                usageBill={line.usageBill} 
                budgetedBill={line.budgetedBill} 
                startDate={startDate}
                endDate={endDate}
                />
              </React.Fragment>
            ))}
        </div> */}
      {/* </> */}
      <br />
      {/* <> */}
      {/* <div className="chart-budget-cost"> */}
      <div className="chart-budget-cost">
        {/* {lines.map((line, index) => ( */}

        <React.Fragment key={`line-${lines[0].lineNo}`}>
          {device.deviceTypeId === 2 && device.deviceMeasuringModeId === 1 && (
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            ></div>
          )}

          <LineChartBudget
            key={`line-chart-${lines[0].lineNo}`}
            device={device}
            daysElapsed={daysElapsed}
            numberOfDays={numberOfDays}
            usageBill={lines[0].usageBill}
            budgetedBill={lines[0].budgetedBill}
            startDate={startDate}
            endDate={endDate}
          />
        </React.Fragment>
      </div>
      {/* </div> */}
      {/* </> */}

      <br />
      <div className="chart-toggle">
        <div className="switch-container">
          <span className="switch-label">
            {showActualChart ? "Show Prediction" : "Show Forecast"}
          </span>
          <label className="switch">
            <input
              type="checkbox"
              checked={showActualChart}
              onChange={() => setShowActualChart(!showActualChart)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="chart-now">
        {showActualChart ? (
          <div className="chart-now-kw">
            <LineChartActual device={device} />
          </div>
        ) : (
          <div className="chart-now-cost">
            <LineChart device={device} />
          </div>
        )}
      </div>
    </>
  );
}

export default DeviceChartMode;
