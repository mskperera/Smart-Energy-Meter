import React, { useEffect, useState } from 'react';
import './Budget.css';
import { calculateInterdependentValue, getBudgetedValues, saveBudgetedLimit } from '../../action/deviceSettings';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';

function Budget() {
    const [myBudgetKw, setMyBudgetKw] = useState('');
    const [myBudgetRs, setMyBudgetRs] = useState('');
    const [device, setDevice] = useState('');
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState('');
    const [errormessage, setErrorMessage] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');
    const [budgetedValues, setBudgetedValues] = useState('');
    const [budgetedValueAmount, setBudgetedValueAmount] = useState('');

    const deviceNames = useSelector(state => state.device.dropDeviceList);
    const defaultSelectedDevice = deviceNames[0];

    useEffect(() => {
        setDevice(defaultSelectedDevice);
    }, [deviceNames]);

    useEffect(() => {
        if (device) {
            const deviceId = device || defaultSelectedDevice;
            // loadCalculateInterdependentValue(deviceId.id);
            loadBudgetedValues(deviceId.id);
        }
    }, [device]);

    const onRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };


    const loadBudgetedValues = async (deviceId) => {
        const result = await getBudgetedValues(deviceId);
        const budgetedValue = result.data;
        
        setBudgetedValues(budgetedValue.kwhAmount);
        setBudgetedValueAmount(budgetedValue.billAmount);
 
      };

    //   useEffect(() => {
    //     if (device) {
    //         const deviceId = device || defaultSelectedDevice;
    //         loadCalculateInterdependentValue(deviceId.id);
    //         // loadBudgetedValues(deviceId.id);
    //     }
    // }, [device]);
    

    const handleCalculateInterdependentValue = async (deviceId,operationId,value) => {
        const result = await calculateInterdependentValue(deviceId,operationId,value);
        console.log('result cal',result);
        const calculate = result.data.value;
        console.log('calculate',calculate);
        return calculate;
        // setMyBudgetRs(calculate.billAmount);
        // setMyBudgetKw(calculate.kwhAmount);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            setErrorMessage('');
            setMessage('');

            const payload = {
                deviceId: device?.id || defaultSelectedDevice?.id,
                budgetedValue: selectedRadio === '1' ? budgetedValues : budgetedValueAmount,
                opertationalMetricId: selectedRadio === '1' ? 1 : 2,
                
                units: 50,
                noOfDays: 30,
            };

            console.log('payload1111111', payload);

            const res = await saveBudgetedLimit(payload);
            console.log('res', res);
            const { responseStatus, outputMessage } = res.data;
            
            if (responseStatus === "failed") {
                setErrorMessage(outputMessage);
                return;
                
            }

            if (res.status === 400) {
                setMessage('Error Occurred');
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

    return (
        <div className='notification'>
            <h4 className='d-flex align-items-center justify-content-center mb-1'>Device Preferences and Settings</h4>
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
                        <input
                            id='budgetKw'
                            type='text'
                            className='form-control'
                            placeholder='kW'
                            value={budgetedValues}
                            onChange={(e) => setBudgetedValues(e.target.value)}
                            style={{ width: '200px', height: '30px' }}
                            disabled={selectedRadio !== '1'}
                        />
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
                        <input
                            id='budgetRs'
                            type='text'
                            className='form-control'
                            placeholder='Rs'
                            value={budgetedValueAmount}
                            onChange={(e) => setBudgetedValueAmount(e.target.value)}
                            style={{ width: '200px', height: '30px' }}
                            disabled={selectedRadio !== '2'}
                        />
                    </div>
                </div>

                <button type='button' className="btn btn-sm custom-button w-50 btn-cal mb-1" onClick={async() => {
                    const deviceId = device?.id || defaultSelectedDevice?.id;
                    // handleCalculateInterdependentValue(deviceId, 1, budgetedValues);
                    // handleCalculateInterdependentValue(deviceId, 7, budgetedValueAmount);

                    if (selectedRadio === '1') {
                       const result = await handleCalculateInterdependentValue(deviceId, 1, budgetedValues)
                        setBudgetedValueAmount(result);
                    }

                    if (selectedRadio === '2') {
                        const result = await handleCalculateInterdependentValue(deviceId, 7, budgetedValueAmount)
                        setBudgetedValues(result);
                    }
                }}>
                    Calculate
                </button>

                <button type='submit' className='btn btn-primary w-100 mt-1'>Save</button>
                {errormessage && <p>{errormessage}</p>}
            </form>
        </div>
    )
}

export default Budget;
