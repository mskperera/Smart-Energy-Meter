import React, { useEffect, useState } from 'react'
import './Budget.css'

import { calculateInterdependentValue, getBudgetedProfile, getBugetedLimitByDeviceId, getBugetedLimitDetailsByBudgetedLimitId, saveBudgetedLimit, saveBugetedLimitDetails } from '../../action/deviceSettings';

import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { calculateBillAmountByUnits, calculateUnitsForBudgetByBillAmount } from '../../action/tariff';


function Budget() {

    const [myBudgetKw, setMyBudgetKw] = useState('');
    const [myBudgetRs, setMyBudgetRs] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const [device, setDevice] = useState('');
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState('');
    const [errormessage, setErrorMessage] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');

    const [selectedValue,setSelectedValue] = useState('kw');

    const deviceNames = useSelector(state => state.device.dropDeviceList);
    const defaultSelctedDevie = deviceNames[0];

    useEffect(() => {
        setDevice(defaultSelctedDevie);
    }, [deviceNames]);

    // useEffect(() => {
    //     if (device) {
    //         const deviceId = device?.id || defaultSelctedDevie?.id;
    //         loadBudgetedProfile(deviceId);
    //     }
    // }, [load, device]);

    useEffect(() => {
        // loadBugetedLimitDetailsByDeviceId();
    }, [load]);

    // const loadBudgetedProfile = async (deviceId) => {
    //     const result = await getBudgetedProfile(deviceId);
    //     console.log('tttttttttttt', result);
    // }

    
    const onRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };
    
    // useEffect(() => {
    //     if (device) {
    //         const deviceId = device || defaultSelctedDevie;
    //         loadCalculateInterdependentValue(deviceId.id);
    // }
    // }, [device]);

    
    const loadCalculateInterdependentValue = async (deviceId) => {
        const result = await calculateInterdependentValue(deviceId, 7);
        console.log('result111111', result);
        const calculate = result.data;
        console.log('calculate', calculate.value);
        // setMyBudgetRs(calculate.value);
        // setMyBudgetKw(calculate.value); 
    }




    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            setErrorMessage('');
            setMessage('');
            
            const payload = {
                deviceId: device?.id || defaultSelctedDevie?.id,
                value: selectedRadio === '1' ? myBudgetKw : myBudgetRs,
                budgetingMetricId: selectedRadio === '1' ? 1 : 2,
                units:50,
                noOfDays:20,
                // budgetedLimitId: loadedBudgetedLimitId,
                // thresholdAmountsArr: selectedValues.map(a => a.thresholdAmount)
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
        <div className='body d-flex align-items-center justify-content-center w-100'>
            <div className='notification'>
                {/* <div className='rounded'> */}
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
                                {selectedRadio === '1' ? (
                                    <input
                                        id='budgetKw'
                                        type='text'
                                        className='form-control'
                                        placeholder='kW'
                                        value={myBudgetKw}
                                        onChange={(e) => {
                                            setMyBudgetKw(e.target.value);
                                            setSelectedValue("kw");
                                        
                                        }}
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
                                        value={myBudgetRs}
                                        onChange={(e) => {setMyBudgetRs(e.target.value); setSelectedValue("bill");}}
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

                        <button type='button' className="btn btn-sm custom-button w-50 btn-cal mb-1" onClick={() => {
                            const deviceId = device?.id || defaultSelctedDevie?.id;
                            loadCalculateInterdependentValue(deviceId,7);

                            if(selectedValue === "kw"){
                                const units = loadCalculateInterdependentValue(deviceId,1);
                                setMyBudgetKw(units);}

                            if(selectedValue === "bill"){
                                const billAmount = loadCalculateInterdependentValue(deviceId,7);
                                setMyBudgetRs(billAmount);
                            }
                        }}>
                            Calculate
                        </button>

                        <button type='submit' className='btn btn-primary w-100 mt-1'>Save</button>
                        {errormessage && <p>{errormessage}</p>}
                    </form>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Budget;
