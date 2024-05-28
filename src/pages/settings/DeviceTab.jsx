import React, { useEffect, useState } from 'react';
import { getDrpMeasuringMode } from '../../action/dropdown';

function DeviceTab() {
    const [dropMeasuringMode, setDropMeasuringMode] = useState([]);
    const [selectedMeasuringMode, setSelectedMeasuringMode] = useState('');

    useEffect(() => {
        loadDrpMeasuringMode();
    }, []);

    const loadDrpMeasuringMode = async () => {
        const result = await getDrpMeasuringMode();
        console.log("result - 555555", result.data);
        setDropMeasuringMode(result.data);
        setSelectedMeasuringMode(result.data[0].MeasuringModeId);
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
                                        <option key={mode.MeasuringModeId} value={mode.MeasuringModeId}>
                                            {mode.MeasuringModeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {selectedMeasuringMode === '2' && (
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

                    <button type='submit' className='btn btn-primary w-100 mt-1'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default DeviceTab;
