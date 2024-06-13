import React from "react";
import KwhBillChart from "./KwhBillChart";
import OperationalChart from "./OperationalChart";

function DeviceChart({ deviceName, device }) {
  const { lines } = device;

  return (
    <>
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
                ></div>
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
          <h6>{deviceName}</h6>
        </div>
        {device.deviceTypeId === 2 && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="">
              {device.deviceMeasuringModeId === 1 ? "Individual Line Measurement Mode" : "Consolidated Mode"}
            </div>
            <div>Total kwh: {device.kwh.toFixed(2)}</div>
            <div>Total Bill: {device.usageBill.toFixed(2)}</div>
            {device.deviceMeasuringModeId === 2 && (
              <>
                <div>Budgeted kwh: {device.budgetedKwh}</div>
                <div>Budgeted Bill: {device.budgetedBill}</div>
              </>
            )}
          </div>
        )}
      </div>
      {lines.map((line) => (
        <React.Fragment key={`kwh-bill-${line.lineNo}`}>
          {device.deviceTypeId === 2 && device.deviceMeasuringModeId === 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>Line: {line.line}</div>
            </div>
          )}
          <KwhBillChart
            key={`kwh-bill-chart-${line.lineNo}`}
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
      {lines.map((line) => (
        <React.Fragment key={`operational-chart-${line.lineNo}`}>
          {device.deviceTypeId === 2 && device.deviceMeasuringModeId === 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>Line: {line.line}</div>
            </div>
          )}
        <OperationalChart
          key={`operational-chart-${line.lineNo}`}
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
    </>
  );
}

export default DeviceChart;
