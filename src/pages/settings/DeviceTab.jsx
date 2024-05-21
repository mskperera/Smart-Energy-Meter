import React from 'react'

function DeviceTab() {
  return (
    <div className='body d-flex align-items-center justify-content-center w-100'>
                            <div className='notification'>
                             <h3 className='d-flex align-items-center justify-content-center mb-1'>Device Settings</h3>
                                 <form className='need-validation'>
                                     {/* <h5 className='d-flex align-items-center justify-content-center mb-1'>#</h5> */}
                                          <div className="form-group mb-1">
                                             <div className="form-group">
                                                <div className="form-check">
                                                   <label className="form-check-label" htmlFor="check5">Device Type</label>
                                                     <input  type='text' className='form-control' placeholder='select type' value="" />
                                                 </div>
                                              </div>
                                           </div>

                                            <div className="form-group mb-1">
                                                <div className="form-group">
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="mode">Measuring Mode</label>
                                                            <select value="" name="mode1" className='form-control'>

                                                            <option>select meode</option>      
                                                            <option>Three-Phase Measurement</option>
                                                            <option>Single line measurement</option>

                                                            </select>
                                                        </div>
                                                 </div>
                                                 </div>

                          <div className="form-group mb-1">
                            <div className="form-group">
                                <div className="form-check">
                                </div>
                            </div>
                         </div>

                                                                            

                 <button type='submit' className='btn btn-primary w-100 mt-1'>Save</button>                    
             </form>
         </div>
     </div>
  )
}

export default DeviceTab