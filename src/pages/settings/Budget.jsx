import React, { useEffect, useState } from 'react';
import './Budget.css';
import { calculateInterdependentValue, getBudgetedValues, saveBudgetedLimit } from '../../action/deviceSettings';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { set } from 'date-fns';
import { ThreeDots } from 'react-loader-spinner';

function Budget() {
    // const [myBudgetKw, setMyBudgetKw] = useState('');
    // const [myBudgetRs, setMyBudgetRs] = useState('');
    // const [device, setDevice] = useState('');
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState('');
    const [errormessage, setErrorMessage] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');
    const [budgetedValues, setBudgetedValues] = useState('');
    const [loading, setLoading] = useState(null);

    const selectedDevice = useSelector((state) => state.device.selectedDevice);

    useEffect(() => {
        if (selectedDevice) {
            const deviceId = selectedDevice.id;
            loadBudgetedValues(deviceId);
            setLoading(true);
        }
    }, [selectedDevice]);

    const onRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    const loadBudgetedValues = async (deviceId) => {
        const result = await getBudgetedValues(deviceId);
        setLoading(true);
        const budgetedValue = result.data;

        setBudgetedValues(budgetedValue);
        setLoading(false);
        let selectedRadio = 0;
        if (budgetedValue.isKwhAmountEntered) {
            selectedRadio = '1';
        }
        else if (budgetedValue.isCostAmountEntered) {
            selectedRadio = '2';
        }

        setSelectedRadio(selectedRadio);
    };

    const handleCalculateInterdependentValue = async (deviceId, operationId, value) => {
        const result = await calculateInterdependentValue(deviceId, operationId, value);
        console.log('result cal', result);
        const calculate = result.data.value;
        console.log('calculate', calculate);
        return calculate;
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            setErrorMessage('');
            setMessage('');

            const deviceId = selectedDevice.id;

            
            if (selectedRadio === '1') {
                const value = await handleCalculateInterdependentValue(deviceId, 1, budgetedValues.budgetedKwh);
                setBudgetedValues((prevValues) => ({ ...prevValues, budgetedCost: value }));
            }

            if (selectedRadio === '2') {
                const value = await handleCalculateInterdependentValue(deviceId, 7, budgetedValues.budgetedCost);
                setBudgetedValues((prevValues) => ({ ...prevValues, budgetedKwh: value }));
            }

            
            const payload = {
                deviceId: selectedDevice.id,
                budgetedValue: selectedRadio === '1' ? budgetedValues.budgetedKwh : budgetedValues.budgetedCost,
                opertationalMetricId: selectedRadio === '1' ? 1 : 7,
                thresholdAmountsArr: [],
                isKeepNull: false,
                units: 50,
                noOfDays: 30,
            };

            console.log('payload1111111', payload);

            const res = await saveBudgetedLimit(payload);
            console.log('res', res);
            const { responseStatus, outputMessage } = res.data.output;

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
        <>
            { loading ? (
                <div>
                <ThreeDots
                    className="d-flex align-items-center justify-content-center"
                    height={100}
                    width={100}
                    color="#36A2EB"
                    ariaLabel="loading"
                    secondaryColor="#36A2EB"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
            ) : (
                <div className='notification'>
                    <h5 className='d-flex align-items-center justify-content-center mb-3'>Budgeted Preferences Settings</h5>
                <form className='need-validation' onSubmit={onSubmitHandler}>
                    {/* <h5 className='d-flex align-items-center justify-content-center mb-3'>Budgeted Preferences</h5> */}

                    <div className='form-group mb-2 form-budgetKw'>
                        <div className='form-group d-flex align-items-center'>
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
                                className='form-control budgetKw'
                                placeholder='kW'
                                value={budgetedValues.budgetedKwh}
                                onChange={(e) => {
                                    setBudgetedValues({...budgetedValues, budgetedKwh: e.target.value})
                                }}
                                style={{ width: 'auto', height: '30px' }}
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
                                value={budgetedValues.budgetedCost}
                                onChange={(e) => setBudgetedValues({...budgetedValues, budgetedCost: e.target.value})}
                                style={{ width: 'auto', height: '30px' }}
                                disabled={selectedRadio !== '2'}
                            />
                        </div>
                    </div>

                    {/* <div className='d-flex justify-content-end' style={{marginRight:'56px'}}> */}
                        <button type='button' className="btn btn-sm custom-button w-50 btn-cal mb-2" 
                            onClick={async(e) => {
                                e.preventDefault();
                                const deviceId = selectedDevice.id;

                                if (selectedRadio === '1') {
                                    const value = await handleCalculateInterdependentValue(deviceId, 1, budgetedValues.budgetedKwh);
                                    console.log('resultAAAA', value);
                                    setBudgetedValues({...budgetedValues, budgetedCost: value});
                                }

                                if (selectedRadio === '2') {
                                    const value = await handleCalculateInterdependentValue(deviceId, 7, budgetedValues.budgetedCost);
                                    console.log('resultBBB', value);
                                    setBudgetedValues({...budgetedValues, budgetedKwh: value});
                                }
                            }}
                        >
                            Calculate
                        </button>
                    {/* </div> */}

                    <div className='d-flex justify-content-center'>
                        <button type='submit' className='btn btn-primary w-100 mt-1'>Save</button>
                    </div>
                    {errormessage && <p className='error-message'>{errormessage}</p>}
                </form>
            </div>
            )
            }
        </>
    )
}

export default Budget;
