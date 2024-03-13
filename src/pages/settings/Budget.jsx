import React, { useState } from 'react'
import { CgCloseO } from "react-icons/cg";


function Budget() {

    const [value, setValue] = useState(0); 
    const [maxValue, setMaxValue] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);

    const handleChange = (event) => {
        setValue(event.target.value);
      };

      const handleMaxChange = (event) => {
        const max = parseInt(event.target.value);
        setMaxValue(max);
      };
    
      const handleAdd = (e) => {
        e.preventDefault();
        setSelectedValues([...selectedValues, value]);
      };
    
      const handleDelete = (index) => {
        const newValues = [...selectedValues];
        newValues.splice(index, 1);
        setSelectedValues(newValues);
      };

  return (

    <div className='body d-flex align-items-center justify-content-center w-100'>
        <div className='notification'>
            <h3 className='d-flex align-items-center justify-content-center mb-1'>Device Preferences and Settings
</h3>
            <form className='need-validation'>
            <h5 className='d-flex align-items-center justify-content-center mb-1'>Budgeted Preferences</h5>
                <div className='form-group mb-1'>
                    <label htmlFor='setbudget' className='form-label'>Set my Budget</label>
                    <input type='text' className='form-control' placeholder='Rs' onChange={handleMaxChange}/>
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
                            max={maxValue}  
                            step="10"
                            value={value}  
                            onChange={handleChange} />
                    </div>
                    <div className='form-group mb-1 d-flex justify-content-center'>
                        <button className='btn btn-primary w-25 mt-1'onClick={handleAdd}>Add</button>
                    </div>
                </div>

                <div>
    <table className="table">
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
            <button className='btn' onClick={() => handleDelete(index)}><CgCloseO color='red' size={20}/></button>
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
                                                        
  )
}

export default Budget