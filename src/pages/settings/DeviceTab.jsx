import React, { useEffect, useState } from 'react';
import { getDrpMeasuringMode } from '../../action/dropdown';
import { deviceMeasuringModeSave, get_DeviceSettingsByDeviceId } from '../../action/deviceSettings';
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

    const [device, setDevice] = useState('');

    // const onChangeDeviceHandler=(device)=>{
    //   setDevice(device);
    // }
    
    const deviceNames = useSelector((state) => state.device.dropDeviceList);
    const defaultSelectedDevice = deviceNames[0];
  
    useEffect(() => {
      setDevice(defaultSelectedDevice);
    }, [deviceNames, defaultSelectedDevice]);

    useEffect(() => {
        if (device) {
            const deviceId = device || defaultSelectedDevice;
            loadDrpMeasuringMode(deviceId.id);
            loadDeviceSettingstData(deviceId.id);
        }
    }, [load,device]);

    useEffect(()=>{

        if(device){
        const deviceId=device || defaultSelectedDevice;
        loadDeviceSettingstData(deviceId.id);
       
        }
    },[load,device])


    const loadDrpMeasuringMode = async () => {
        const result = await getDrpMeasuringMode();
        setDropMeasuringMode(result.data);
        setSelectedMeasuringMode(result.data[0].deviceMeasuringModeId);
    };

    const loadDeviceSettingstData = async (deviceId) => {
        const result = await get_DeviceSettingsByDeviceId(deviceId);
        console.log("result - drop", result.data);
        const deviceSetting = result.data;
        console.log("deviceSetting---------", deviceSetting);
        setEditLineOne(deviceSetting.l1);
        setEditLineTwo(deviceSetting.l2);
        setEditLineThree(deviceSetting.l3);
    };

    const onsubmitHandler = async (e) => {
        e.preventDefault();

        setErrorMessage('');
        setMessage('');

        try {
            // const deviceId = device.id || defaultSelctedDevie.id;
            const payload = {
                measuringModeId: selectedMeasuringMode,
                deviceId: device?.id || defaultSelectedDevice?.id,
                l1: editLineOne,
                l2: editLineTwo,
                l3: editLineThree,
            };

            const res = await deviceMeasuringModeSave(payload);
            const { responseStatus, outputMessage } = res.data;
            if (responseStatus === "failed") {
              setErrorMessage(outputMessage)
              return;
            }

            setMessage(outputMessage)
            swal("Updated Successfully", "", "success").then(() => {
                setLoad(!load);
              });

        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className='body d-flex align-items-center justify-content-center w-100'>
            <div className='notification'>
                <h3 className='d-flex align-items-center justify-content-center mb-1'>Device Settings</h3>
                <form className='need-validation' onSubmit={onsubmitHandler}>
                    <div className="form-group mb-1">
                        <div className="form-group">
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="mode">Measuring Mode</label>
                                <select
                                    onChange={(e) => setSelectedMeasuringMode(e.target.value)}
                                    name='measuringMode'
                                    value={selectedMeasuringMode}
                                    className='form-control'
                                >
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
                            {JSON.stringify(device)}
                            <div className="form-group col-md-6">
                                <div className="form-check">
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
                                <div className="form-check">
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

                    <button type='submit' className='btn btn-primary w-100 mt-1'>Save</button>
                </form>
                {message && <div className="alert alert-success mt-2">{message}</div>}
                {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default DeviceTab;
