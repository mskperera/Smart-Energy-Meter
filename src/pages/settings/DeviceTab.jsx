import React, { useEffect, useState } from 'react';
import { getDrpMeasuringMode } from '../../action/dropdown';
import { deviceMeasuringModeSave } from '../../action/deviceSettings';
import { useSelector } from 'react-redux';
import { de } from 'date-fns/locale';
import swal from 'sweetalert';
import { set } from 'date-fns';

function DeviceTab() {
    const [dropMeasuringMode, setDropMeasuringMode] = useState([]);
    const [selectedMeasuringMode, setSelectedMeasuringMode] = useState('');
    const [device, setDevice] = useState('');

    const[editLineOne,setEditLineOne]=useState('');
    const[editLineTwo,setEditLineTwo]=useState('');
    const[editLineThree,setEditLineThree]=useState('');

    
    const [load,setLoad]=useState(false);

    const [message,setMessage]=useState('');
       const [errormessage,setErrorMessage]=useState('');


    // const onChangeDeviceHandler=(device)=>{
    //     setDevice(device);
    //   }
      
      const deviceNames=useSelector(state=>state.device.dropDeviceList);
      const defaultSelctedDevie=deviceNames[0];
      
      useEffect(()=>{
      setDevice(defaultSelctedDevie);
      },[deviceNames])


    useEffect(() => {
        if (device) {
            const deviceId = device.id || defaultSelctedDevie.id;
            loadDrpMeasuringMode(deviceId.id);
        }
        // loadDrpMeasuringMode();
    }, [device]);


    const loadDrpMeasuringMode = async () => {
        const result = await getDrpMeasuringMode();
        console.log("result - 555555", result.data);
        setDropMeasuringMode(result.data);
        setSelectedMeasuringMode(result.data[0].deviceMeasuringModeId);
        
    }


    const saveDeviceMeasuringModeSave = async (e) => {
        e.preventDefault();

        setErrorMessage('');
        setMessage('');
       
        try {
            const deviceId = device.id || defaultSelctedDevie.id;
            const payload = {
                measuringModeId: selectedMeasuringMode,
                deviceId: deviceId,
            };
            console.log("payload", payload);

            const result = await deviceMeasuringModeSave(payload);
            const {status,message}=result.data;
            if(status==="failed"){
                setErrorMessage(message);
                return;
            }

            setMessage(message);
            swal("Updated Successfully", "", "success").then(() => {
                setLoad(!load);
              });

        }
        catch (error) {
            console.log("error", error);
        }

    }

    return (
        <div className='body d-flex align-items-center justify-content-center w-100'>
            <div className='notification'>
                <h3 className='d-flex align-items-center justify-content-center mb-1'>Device Settings</h3>
                <form className='need-validation'>
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
                            <div className="form-group col-md-6">
                                <div className="form-check">
                                    <label className="form-label" htmlFor="l1">L1</label>
                                    <input type='text' className='form-control' placeholder='Line 1' style={{ height: '30px' }} />
                                </div>
                                <div className="form-check">
                                    <label className="form-label" htmlFor="l2">L2</label>
                                    <input type='text' className='form-control' placeholder='Line 2' style={{ height: '30px' }} />
                                </div>
                                <div className="form-check">
                                    <label className="form-label" htmlFor="l3">L3</label>
                                    <input type='text' className='form-control' placeholder='Line 3' style={{ height: '30px' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <button type='submit' className='btn btn-primary w-100 mt-1' onClick={saveDeviceMeasuringModeSave}>Save</button>
                </form>
            </div>
        </div>
    )
}

export default DeviceTab;
