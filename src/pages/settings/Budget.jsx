import React, { useEffect, useState } from 'react'
import './Budget.css'
import { getBugetedLimitByDeviceId, saveBugetedLimitDetails } from '../../action/deviceSettings';


function Budget() {

    const [myBudget, setMyBudget] = useState('');

    const [value, setValue] = useState(0); 
    // const [maxValue, setMaxValue] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        loadBugetedLimitByDeviceId();
    }, []);


const loadBugetedLimitByDeviceId = async () => {

    const result = await getBugetedLimitByDeviceId(4);
    // console.log('tttttttttttt', result);
    const budgetSettings = result.data;
    console.log('budgetSettings', budgetSettings);
   // setMyBudget(budgetSettings.BudgetedAmount);
    const billingBuget=budgetSettings.filter(b=>b.budgetingMetricId===2);
// const billingBuget=myBudget.filter(b=>b.budgettingMetricId===2);
// console.log('billingBudget',billingBuget[0]);
    setMyBudget(billingBuget[0].budgetedAmount);
}

    const handleChange = (e) => {
        setValue(e.target.value);
      };



    
      const handleAdd = async (e) => {
        e.preventDefault();
        const res = await saveBugetedLimitDetails();
        console.log('ressssss', res);
        // setSelectedValues([...selectedValues, value]);
      };
    


    const handleDelete = (index) => {
        const newValues = [...selectedValues];
        newValues.splice(index, 1);
        setSelectedValues(newValues);
    };



  return (
<div className='body d-flex align-items-center justify-content-center w-100'>
    <div className='bodyb'>
        <div className='rounded p-2'>
            <h4 className='d-flex align-items-center justify-content-center'>Device Preferences and Settings</h4>
            <form className='need-validation'>
            <h6 className='d-flex align-items-center justify-content-center mb-1'>Budgeted Preferences</h6>
                <div className='form-group mb-1'>
                    <label htmlFor='setbudget' className='form-label'>Set my Budget</label>
                    <input type='text' className='form-control' placeholder='Rs' value={myBudget} onChange={(e)=>setMyBudget(e.target.value)}/>
                </div>

                <div className='form-group mb-1'>
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
                            onChange={handleChange} />
                    </div>
                    <div className='form-group mb-1 d-flex justify-content-center'>
                        <button className='btn btn-primary w-25 mt-1'onClick={handleAdd}>Add</button>
                    </div>
                </div>

                <div>
    <table className="table tableb">
    <thead>
        <tr>
        {/* <th>Notify when reach</th> */}
        {/* <th>Actions</th> */}
        </tr>
    </thead>
    <tbody>
        {/* {JSON.stringify(thresholdList)} */}
        {selectedValues && selectedValues.map((selectedValue, index) => (
        <tr key={index}>
            <td>Notify when reach {selectedValue}</td>
            <td>
            <button className='btn btn-sm btn-danger' onClick={() => handleDelete(index)}>Delete</button>
            {/* <button className='btn' onClick={() => handleDelete(index)}><CgCloseO color='red' size={20}/></button> */}

            </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>

                <button type='submit' className='btn btn-primary w-100 mt-1'>Save</button>                    
            </form>
        </div>
    </div>
      </div>                                                  
  )
}

export default Budget