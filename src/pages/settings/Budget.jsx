import React, { useEffect, useState } from 'react'
import './Budget.css'
import { getBugetedLimitByDeviceId, getBugetedLimitDetailsByBudgetedLimitId, saveBudgetedLimit, saveBugetedLimitDetails } from '../../action/deviceSettings';
import swal from 'sweetalert';



function Budget() {

    const [myBudget, setMyBudget] = useState('');

    const [value, setValue] = useState(0); 
    // const [maxValue, setMaxValue] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);


    const [load,setLoad]=useState(false);

    const [loadedBudgetedLimitId, setLoadedBudgetedLimitId] = useState('');
    const [threshouldList,setThreshouldList] = useState([]);

    useEffect(() => {
        loadBugetedLimitByDeviceId();
        
    }, []);

    useEffect(() => {
       
    }, [load]);


const loadBugetedLimitByDeviceId = async () => {

    const result = await getBugetedLimitByDeviceId(4);
    // console.log('tttttttttttt', result);
    const budgetSettings = result.data;
    console.log('budgetSettings', budgetSettings);
   // setMyBudget(budgetSettings.BudgetedAmount);
    const billingBuget=budgetSettings.filter(b=>b.budgetingMetricId===2);
// const billingBuget=myBudget.filter(b=>b.budgettingMetricId===2);
    console.log('billing Budget',billingBuget);
    setMyBudget(billingBuget[0].budgetedAmount);
    const budgetedlimitId=billingBuget[0].budgetedLimitId;
    setLoadedBudgetedLimitId(budgetedlimitId);
    loadBugetedLimitDetailsByDeviceId(budgetedlimitId);

}

const [message,setMessage]=useState('');
const [errormessage,setErrorMessage]=useState('');


const _saveBugetedLimit=()=>{
    const payload={
        deviceId:4,
        budgetedAmount:myBudget,
        budgetingMetricId:2
    
    }
saveBudgetedLimit(payload);
}

const onSubmitHandler = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setMessage('');


    try {
        _saveBugetedLimit();
        console.log("myBudget",selectedValues);

        for(let i=0;i<selectedValues.length;i++){
           const budgetedLimit = selectedValues[i];
           console.log('budget list',budgetedLimit);
              const payload = {
                budgetedLimitId: loadedBudgetedLimitId,
                thresholdAmount: budgetedLimit,
                budgetedAmount: myBudget,

              };
                console.log('payload', payload);
                const res = await saveBugetedLimitDetails(payload);
                console.log('limit result', res);
                const { responseStatus, outputMessage } = res.data.output;
                  if (responseStatus === "failed") {
                  setErrorMessage(outputMessage)
                  return;
        }

        setMessage(outputMessage)
        swal("Updated Successfully", "", "success").then(() => {
            setLoad(!load);
        });
    }
}
    catch (err) {   
        console.log('error', err);
    }
};



const loadBugetedLimitDetailsByDeviceId = async (budgetedlimitId) => {
    console.log('getBugetedLimitDetailsByBudgetedLimitId');
    const result = await getBugetedLimitDetailsByBudgetedLimitId(budgetedlimitId);
    const thresholdList = result.data;
    console.log('thresholdList', thresholdList);
  
    setSelectedValues(thresholdList)
}
    

    const handleChange = (e) => {
        setValue(e.target.value);
      };


      const handleAdd = async (e) => {
        e.preventDefault();        
        setSelectedValues([...selectedValues,{thresholdAmount:value}]);
      };
    


    const onDelete = (index) => {
        const newValues = [...selectedValues];
        newValues.splice(index, 1);
        setSelectedValues(newValues);
    };



  return (
<div className='body d-flex align-items-center justify-content-center w-100'>
    <div className='bodyb'>
        <div className='rounded p-2'>
            <h4 className='d-flex align-items-center justify-content-center'>Device Preferences and Settings</h4>
            <form className='need-validation' onSubmit={onSubmitHandler}>
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
                            step="1"
                            value={value}  
                            onChange={(e)=>setValue(e.target.value)} />
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
            <td>Notify when reach {selectedValue.thresholdAmount}</td>
            <td>
            <button className='btn btn-sm btn-danger' onClick={() => onDelete(index)}>Delete</button>
            {/* <button className='btn' onClick={() => handleDelete(index)}><CgCloseO color='red' size={20}/></button> */}

            </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>

                <button type='submit' className='btn btn-primary w-100 mt-1'>Save</button>
                {errormessage && <p>{errormessage}</p>}                    
            </form>
        </div>
    </div>
      </div>                                                  
  )
}

export default Budget