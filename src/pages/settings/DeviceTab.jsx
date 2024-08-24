import React, { useEffect, useState } from 'react';
import { getDrpMeasuringMode } from '../../action/dropdown';
import { deviceMeasuringModeSave, getConnectionSettingsByDeviceId, get_DeviceSettingsByDeviceId, saveConnectionSettings } from '../../action/deviceSettings';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

function DeviceTab() {
    const [dropMeasuringMode, setDropMeasuringMode] = useState([]);
    const [selectedMeasuringMode, setSelectedMeasuringMode] = useState(''); 
    const [editLineOne, setEditLineOne] = useState('');
    const [editLineTwo, setEditLineTwo] = useState('');
    const [editLineThree, setEditLineThree] = useState('');
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editedDeviceName, setEditedDeviceName] = useState('');
    const [editedConnection, setEditedConnection] = useState('');
    const [editedPortNo, setEditedPortNo] = useState('');

    const selectedDevice = useSelector((state) => state.device.selectedDevice);

    useEffect(() => {
        if (selectedDevice) {
            const deviceId = selectedDevice.id;
            loadDeviceSettingstData(deviceId);
            loadDeviceConnectionData(deviceId);
        }
    }, [load, selectedDevice]);

    useEffect(() => {
        loadDrpMeasuringModeDrp();
    }, []);

    const loadDrpMeasuringModeDrp = async () => {
        const result = await getDrpMeasuringMode();
        setDropMeasuringMode(result.data);
    };

    const loadDeviceSettingstData = async (deviceId) => {
        const result = await get_DeviceSettingsByDeviceId(deviceId);
        const deviceSetting = result.data;
        // console.log("deviceSetting---------", deviceSetting);
        setEditLineOne(deviceSetting.l1);
        setEditLineTwo(deviceSetting.l2);
        setEditLineThree(deviceSetting.l3);
        setSelectedMeasuringMode(deviceSetting.deviceMeasuringModeId || '');
    };

    const onsubmitHandler = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setMessage('');
        await saveDeviceName();
        try {
            const payload = {
                measuringModeId: selectedMeasuringMode,
                deviceId: selectedDevice?.id,
                l1: editLineOne,
                l2: editLineTwo,
                l3: editLineThree,
            };

            const res = await deviceMeasuringModeSave(payload);
            // console.log("deviceMeasuringModeSave", res);
            const { responseStatus, outputMessage } = res.data.output;
            if (responseStatus === "failed") {
                setErrorMessage(outputMessage);
                return;
            }

            setMessage(outputMessage);
            swal("Updated Successfully", "", "success").then(() => {
                setLoad(!load);
            });

        } catch (error) {
            console.log("error", error);
        }
    };

    const loadDeviceConnectionData = async (deviceId) => {
        const result = await getConnectionSettingsByDeviceId(deviceId);
        // console.log("test111111111", result);
        const deviceSettings = result.data;
        setEditedDeviceName(deviceSettings.deviceName);
        setEditedConnection(deviceSettings.connection);
        setEditedPortNo(deviceSettings.portNo);
    };

    const saveDeviceName = async () => {
        try {
            const payload = {
                deviceId: selectedDevice.id,
                connection: "0",
                deviceName: editedDeviceName,
                portNo: "0",
            };

            const res = await saveConnectionSettings(payload);
            console.log(res);
            const { responseStatus, outputMessage } = res.data;
            if (responseStatus === "failed") {
                setErrorMessage(outputMessage);
                return;
            }

            setMessage(outputMessage);
            swal("Updated Successfully", "", "success").then(() => {
                setLoad(!load);
                window.location.reload();
            });

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='notification'>
            <h3 className='d-flex align-items-center justify-content-center mb-1'>Device Settings</h3>
            <form className='need-validation' onSubmit={onsubmitHandler}>
                <div className="form-group mb-2" style={{marginLeft:'24px'}}>
                    <div className="form-group">
                        <label htmlFor="devicename" className="form-check-label">Device Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={editedDeviceName}
                            onChange={(e) => setEditedDeviceName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-group mb-2">
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="mode">Measuring Mode</label>
                            <select
                                onChange={(e) => setSelectedMeasuringMode(e.target.value)}
                                name='measuringMode'
                                value={selectedMeasuringMode}
                                className='form-control'
                            >
                                <option value=''>Select Measuring Mode</option>
                                {dropMeasuringMode.map((mode) => (
                                    <option key={mode.deviceMeasuringModeId} value={mode.deviceMeasuringModeId}>
                                        {mode.deviceMeasuringModeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {selectedMeasuringMode === '1' && (
                    <div className="form-group mb-1">
                        <div className="form-group col-md-6">
                            <div className="form-check mb-2">
                                <label className="form-label" htmlFor="l1">L1</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Line 1'
                                    value={editLineOne}
                                    onChange={(e) => setEditLineOne(e.target.value)}
                                    style={{ height: '30px' }}
                                />
                            </div>
                            <div className="form-check mb-2">
                                <label className="form-label" htmlFor="l2">L2</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Line 2'
                                    value={editLineTwo}
                                    onChange={(e) => setEditLineTwo(e.target.value)}
                                    style={{ height: '30px' }}
                                />
                            </div>
                            <div className="form-check">
                                <label className="form-label" htmlFor="l3">L3</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Line 3'
                                    value={editLineThree}
                                    onChange={(e) => setEditLineThree(e.target.value)}
                                    style={{ height: '30px' }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className='d-flex justify-content-center'>
                    <button type='submit' className='btn btn-primary mt-1 w-50'>Save</button>
                </div>
            </form>
            {message && <div className="alert alert-success mt-2">{message}</div>}
            {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
        </div>
    );
}

export default DeviceTab;
