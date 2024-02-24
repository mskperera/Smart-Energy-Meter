import React from 'react'
import './Device.css'

function Device() {
  return (
    <div className='wrapper1 d-flex align-items-center justify-content-center w-100'>
        <div className='device'>
            <h2 className='d-flex align-items-center justify-content-center mb-3'>Device Settings</h2>
            <form className='needs-validation'>
                <div className='form-group was-validated mb-2'>
                    <label htmlFor='deviceid' className='form-label'>Device ID</label>
                        <select name="selecteID" className='form-control'>
                            <option value="">select device id</option>
                            <option value="a">A</option>
                            <option value="b">B</option>
                        </select>
                    {/* <input type='text' className='form-control' required placeholder='test@gmail.com'></input> */}
                    {/* <div className='invalid-feedback'>Please enter your Email</div> */}
                </div>
                <div className='form-group was-validated mb-2'>
                    <label htmlFor='supplierid' className='form-label'>Supplier ID</label>
                        <select name="supplierID" className='form-control'>
                            <option value="">select suppler</option>
                            <option value="type1">CEB</option>
                            <option value="type2"></option>
                        </select>
                    {/* <input type='password' className='form-control' required placeholder='********'></input> */}
                    {/* <div className='invalid-feedback'>Please enter your Password</div> */}
                </div>
                
                <button type='submit' className='btn btn-primary w-100 mt-2'>Apply</button>
            </form>
        </div>
    </div>
  )
}

export default Device