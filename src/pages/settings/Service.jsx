import React from 'react'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'
import { Link } from 'react-router-dom'
import './Service.css'

function Service() {
  return (
    <>
    <Navbar/>
    <div className='nav-bar'>
            <ul className='nav-bar-links'>
                {/* <Link to={"/deviceinfo"}><li className='btn btn-sm btn-primary'>Device Info</li></Link>  */}
                <Link to={"/service"}><li className='btn btn-sm btn-primary'>Service</li></Link>  
                <Link to={"/connection"}><li className='btn btn-sm btn-primary'>Connection</li></Link>
            </ul>
    </div>
    <div className='wrapper3 d-flex align-items-center justify-content-center w-100'>
        <div className='service'>
            <h5 className='d-flex align-items-center justify-content-center mb-3'>Device Settings</h5>
            <form className='needs-validation'>
                <div className='form-group was-validated mb-2'>
                    <label htmlFor='deviceid' className='form-label'>Device ID</label>
                        <select name="selecteID" className='form-control'>
                            <option value=""></option>
                            <option value="a">A</option>
                            <option value="b">B</option>
                        </select>
                    {/* <input type='text' className='form-control' required placeholder='test@gmail.com'></input> */}
                    {/* <div className='invalid-feedback'>Please enter your Email</div> */}
                </div>

                <div className='form-group was-validated mb-2'>
                    <label htmlFor='consumer' className='form-label'>Consumer Category</label>
                        <select name="consumerCategoryId" className='form-control'>
                            <option value=""></option>
                            <option value="domestic">Domestic</option>
                            <option value="religious">Religious & Charitable Institutions</option>
                            <option value="other">Other Consumer Categories</option>
                            <option value="evcharging">EV Charging of CEB Charging Stations</option>
                            <option value="agriculture">Agriculture</option>
                        </select>
                    {/* <input type='password' className='form-control' required placeholder='********'></input> */}
                    {/* <div className='invalid-feedback'>Please enter your Password</div> */}
                </div>

                <div className='form-group was-validated mb-2'>
                    <label htmlFor='consumer' className='form-label'>Consumer SubCategory</label>
                        <select name="consumerCategoryId" className='form-control'>
                            <option value=""></option>
                            <option value="rate1">Industrial Rate1</option>
                            <option value="rate2">Industrial Rate2</option>
                            <option value="rate3">Industrial Rate3</option>
                            <option value="hotelrate1">Hotel Rate1</option>
                            <option value="hotelrate2">Hotel Rate2</option>
                        </select>
                    {/* <input type='password' className='form-control' required placeholder='********'></input> */}
                    {/* <div className='invalid-feedback'>Please enter your Password</div> */}
                </div>

                <div className='form-group was-validated mb-2'>
                    <label htmlFor='supplierid' className='form-label'>Supplier</label>
                        <select name="supplierId" className='form-control'>
                            <option value=""></option>
                            <option value="ceb">CEB</option>
                            <option value="leco">LECO</option>
                        </select>
                    {/* <input type='password' className='form-control' required placeholder='********'></input> */}
                    {/* <div className='invalid-feedback'>Please enter your Password</div> */}
                </div>

                <div className='form-group was-validated mb-2'>
                    <label htmlFor='supplytype' className='form-label'>Supply Type</label>
                        <select name="supplierId" className='form-control'>
                            <option value=""></option>
                            <option value="single">Single Phase</option>
                            <option value="three">Three phase</option>
                        </select>
                    {/* <input type='password' className='form-control' required placeholder='********'></input> */}
                    {/* <div className='invalid-feedback'>Please enter your Password</div> */}
                </div>
                
                <button type='submit' className='btn btn-primary w-100 mt-2'>Save</button>
            </form>
        </div>
    </div>
    <BottomNav/>
    </>
  )
}

export default Service