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
// import LineChartCost from "./LineChartCost";
import { getMaximumDemand } from "../../action/device";
import { useSelector } from "react-redux";
import { getbillingSessionByDeviceId } from "../../action/billingSession";


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

    const [billingSession, setBillingSession] = useState([]);
    const [selectedDates, setSelectedDates] = useState({});
    const [selectedTimes, setSelectedTimes] = useState({});

    const [peakTime, setPeakTime] = useState([]);
    const [offPeakTime, setOffPeakTime] = useState([]);
    const [dayTime, setDayTime] = useState([]);

    const  [totalSum, setTotalSum] = useState([]);
    // const [loadData, setLoadData] = useState(false);
    // useEffect(() => {
    //   if (selectedDevice) {
    //     loadBillingSessionByDeviceId(selectedDevice.id);
    //   }
    // }, [selectedDevice]);
    useEffect(() => {
      const interval = setInterval(() => {

        if (selectedDevice){
          const deviceId = selectedDevice.id;
          loadBillingSessionByDeviceId(deviceId);
        }
      }, 1000,selectedDevice); // 1-second interval
  
      return () => clearInterval(interval); // Clean up the interval
    }, []);
  
    const loadBillingSessionByDeviceId = async (deviceId) => {
      try {
        // setLoadData(true);
        const res = await getbillingSessionByDeviceId(deviceId);
        
        console.log('getbilling-----SessionByDeviceId',res)

        console.log('getbillingSessionByDeviceId',res.data[0].timeSlotsAndUsage);

          const usage = res.data[0].timeSlotsAndUsage[0];
          const totalSum = usage.TotalKwh + usage.TotalKwh2 + usage.TotalKwh3;
          setPeakTime(totalSum);
          
          const usage1 = res.data[0].timeSlotsAndUsage[1];
          const totalSum1 = usage1.TotalKwh + usage1.TotalKwh2 + usage1.TotalKwh3;
          setDayTime(totalSum1);

          const usage2 = res.data[0].timeSlotsAndUsage[2];
          const totalSum2 = usage2.TotalKwh + usage2.TotalKwh2 + usage2.TotalKwh3;
          setOffPeakTime(totalSum2);

          const totalSum3 = totalSum + totalSum1 + totalSum2; 
          setTotalSum(totalSum3);
          

        console.log('sumpeak',totalSum);
        
        console.log('getbillingSessionByDeviceId',res)
        if (res.data.length > 0) {
          const sessions = res.data.reduce((acc, session) => {
            const startDate = new Date(session.startDate);
            const endDate = new Date(session.endDate);
            acc[session.deviceBillingSessionId] = {
              startDate,
              endDate,
            };
            setSelectedTimes((prevTimes) => ({
              ...prevTimes,
              [session.deviceBillingSessionId]: {
                startTime: startDate.toTimeString().slice(0, 5),
                endTime: endDate.toTimeString().slice(0, 5),
              },
            }));
            return acc;
          }, {});
          setBillingSession(res.data);
          setSelectedDates(sessions);
        }
        // setLoadData(false);
      } catch (error) {
        console.error('Error fetching billing session:', error);
        // setLoadData(false);
      }
    };

   

    // const calculateTotalKwhSum = (data) => {
    //   return data[0].timeSlotsAndUsage.map((usage) => {
    //     const totalSum = usage.TotalKwh + usage.TotalKwh2 + usage.TotalKwh3;
    //     return {
    //       TimeSlot: usage.TimeSlot,
    //       TotalSum: totalSum
    //     };
    //   });
    // };

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
              <div className="line-total d-flex mt-3" >
                {/* <div className="line-total-kw1">
                  <div>
                    Total kWh:{" "}
                    <span>
                      {device.kwh.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  </div> */}
                  <div className="line-total-kw1">
                     <div className="header">
                       Total:&nbsp;
                       {
                          totalSum.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                       } kWh
                     </div>
                     <div className="rowrow">
                       <div className="column12">Peak</div>
                       
                       <div className="column12">Off Peak</div>
                       <div className="column12">Day</div>
                       
                     </div>
                     <div className="rowrow">
                     <div className="column12">
                          {peakTime.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                       </div>
                         <div className="column12">
                           {offPeakTime.toLocaleString(undefined, {
                             minimumFractionDigits: 2,
                             maximumFractionDigits: 2,
                           })}
                           </div>
                       <div className="column12">
                          {dayTime.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                          </div>
                      </div>
                   </div>
                   <div className="line-total-kw1" style={{disply:'flex',padding:'17px',textAlign:'center',alignItems:'center',justifyContent:'center'}}>
                     <div className="header">
                       Total Rs:
                     </div>
                     <div className="rowrow">
                       {/* <div className="column12">Peak</div>
                       <div className="column12">Off Peak</div>
                       <div className="column12">Day</div> */}
                       <div className="column12">
                        {device.usageBill.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })} 
                      </div>
                     </div>
                     {/* <div className="rowrow" style={{ visibility: 'hidden' }}>
                       
                       <div className="column12">
                        {device.usageBill.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                     </div> */}
                   </div>
                <div className="line-total-kw2" style={{ visibility: 'hidden' }}>
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

        {device.deviceTypeId === 2 && device.deviceMeasuringModeId === 1 && (
          <div className="d-flex justify-content-end page-bottom-mode max-demand">
            <div className="pow mode2" style={{ width: "310px" }}>
              <h6 style={{ marginTop: "5px", color: "yellow" }}>
                Maximum Demand
              </h6>
              <span style={{ marginTop: "-5px" }}>{maximumDemand} kVA</span>
            </div>
          </div>
        )}

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
