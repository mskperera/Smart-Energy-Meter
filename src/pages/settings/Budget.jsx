import React, { useEffect, useState } from 'react'
import './Budget.css'

import { getBudgetedProfile, getBugetedLimitByDeviceId, getBugetedLimitDetailsByBudgetedLimitId, saveBudgetedLimit, saveBugetedLimitDetails } from '../../action/deviceSettings';

import swal from 'sweetalert';
import { useSelector } from 'react-redux';

function Budget() {

    const [myBudget, setMyBudget] = useState('');

    const [value, setValue] = useState(0); 
    const [selectedValues, setSelectedValues] = useState([]);

    const [device, setDevice] = useState('');

    const deviceNames = useSelector(state => state.device.dropDeviceList);
    const defaultSelctedDevie = deviceNames[0];

    useEffect(() => {
        setDevice(defaultSelctedDevie);
    }, [deviceNames]);

    const [load, setLoad] = useState(false);

    const [loadedBudgetedLimitId, setLoadedBudgetedLimitId] = useState('');
    const [threshouldList, setThreshouldList] = useState([]);

    useEffect(() => {
        if (device) {
            const deviceId = device?.id || defaultSelctedDevie?.id;
            loadBudgetedProfile(deviceId);
        }
    }, [load, device]);

    useEffect(() => {
        loadBugetedLimitDetailsByDeviceId();
    }, [load]);

    const loadBudgetedProfile = async (deviceId) => {
        const result = await getBudgetedProfile(deviceId);
        console.log('tttttttttttt', result);
    }

    const [message, setMessage] = useState('');
    const [errormessage, setErrorMessage] = useState('');

    const [selectedRadio, setSelectedRadio] = useState('');

    const onRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            setErrorMessage('');
            setMessage('');
            
            const payload = {
                deviceId: device?.id || defaultSelctedDevie?.id,
                value: myBudget,
                budgetingMetricId: 2,
                budgetedLimitId: loadedBudgetedLimitId,
                thresholdAmountsArr: selectedValues.map(a => a.thresholdAmount)
            };

            console.log("payload", payload);
            const res = await saveBudgetedLimit(payload);
            console.log('limit result', res);
            const { responseStatus, outputMessage } = res.data;
            if (responseStatus === "failed") {
                setErrorMessage(outputMessage);
                return;
            }

            if (res.status === 400) {
                setMessage('Error Occure');
                swal({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                }).then(() => {
                    setLoad(!load);
                });
                return;
            }

            setMessage(outputMessage);
            swal("Updated Successfully", "", "success").then(() => {
                setLoad(!load);
            });
        } catch (err) {   
            console.log('error', err);
        }
    }

    const loadBugetedLimitDetailsByDeviceId = async (budgetedlimitId) => {
        console.log('getBugetedLimitDetailsByBudgetedLimitId');
        const result = await getBugetedLimitDetailsByBudgetedLimitId(budgetedlimitId);
        const thresholdList = result.data;
        console.log('thresholdList', thresholdList);
        setSelectedValues(thresholdList);
    }

    return (
        <div className='body d-flex align-items-center justify-content-center w-100'>
            <div className='notification'>
                <div className='rounded'>
                    <h4 className='d-flex align-items-center justify-content-center'>Device Preferences and Settings</h4>
                    <form className='need-validation' onSubmit={onSubmitHandler}>
                        <h6 className='d-flex align-items-center justify-content-center mb-1'>Budgeted Preferences</h6>

                        <div className='form-group mb-1'>
                            <div className='form-group d-flex align-items-center me-3'>
                                <input 
                                    type='radio' 
                                    name='device' 
                                    value='1' 
                                    className='form-radio me-2' 
                                    checked={selectedRadio === '1'} 
                                    onChange={onRadioChange}
                                />
                                <label htmlFor='budgetKw' className='form-label mb-0 me-2'>Set Budget kW</label>
                                {selectedRadio === '1' ? (
                                    <input
                                        id='budgetKw'
                                        type='text'
                                        className='form-control'
                                        placeholder='kW'
                                        value={myBudget}
                                        onChange={(e) => setMyBudget(e.target.value)}
                                        style={{ width: '200px', height: '30px' }}
                                    />
                                ) : (
                                    <input
                                        id='budgetKw'
                                        type='text'
                                        className='form-control'
                                        placeholder='kW'
                                        value=""
                                        disabled
                                        style={{ width: '200px', height: '30px' }}
                                    />
                                )}
                            </div>
                            <br />
                            <div className='form-group d-flex align-items-center'>
                                <input 
                                    type='radio' 
                                    name='device' 
                                    value='2' 
                                    className='form-radio me-2' 
                                    checked={selectedRadio === '2'} 
                                    onChange={onRadioChange}
                                />
                                <label htmlFor='budgetRs' className='form-label mb-0 me-2'>Set Budget Rs &nbsp;</label>
                                {selectedRadio === '2' ? (
                                    <input
                                        id='budgetRs'
                                        type='text'
                                        className='form-control'
                                        placeholder='Rs'
                                        value={myBudget}
                                        onChange={(e) => setMyBudget(e.target.value)}
                                        style={{ width: '200px', height: '30px' }}
                                    />
                                ) : (
                                    <input
                                        id='budgetRs'
                                        type='text'
                                        className='form-control'
                                        placeholder='Rs'
                                        value=""
                                        disabled
                                        style={{ width: '200px', height: '30px' }}
                                    />
                                )}
                            </div>
                        </div>

                        <button type='button' className="btn btn-sm custom-button w-50 btn-cal mb-1">
                            Calculate
                        </button>

                        {/* <div className='form-group mb-1'>
                            <label htmlFor='setmybudget' className='form-label'>Notify me when Budget reaches</label>
                            <div className='form-group'>
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>{value}</div>
                                <input
                                    type="range"
                                    className='form-control-range'
                                    style={{ width: '100%', color: 'blue' }}
                                    min="0"
                                    max={myBudget}
                                    step="10"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-1 d-flex justify-content-center'>
                            </div>
                        </div> */}

                        {/* <div>
                            <div className="table-responsive-sm">
                                <table className="table tableb rounded">
                                    <thead>
                                        <tr>
                                            <th>Notify when reach</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedValues && selectedValues.map((selectedValue, index) => (
                                            <tr key={index}>
                                                <td className=''>Notify when reach {selectedValue.thresholdAmount}</td>
                                                <td>
                                                    <div className='d-flex justify-content-start'>
                                                        <button type='button' className='btn btn-sm btn-danger' onClick={() => onDelete(index)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div> */}

                        <button type='submit' className='btn btn-primary w-100 mt-1'>Save</button>
                        {errormessage && <p>{errormessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Budget;
