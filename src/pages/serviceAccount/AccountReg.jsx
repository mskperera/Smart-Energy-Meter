import React, { useEffect, useState } from 'react'
import './AccountReg.css'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'
import { deleteUser, getUsers } from '../../action/user';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';

function AccountReg() {


  const [userData,setUserData]=useState(null);

  const [device, setDevice] = useState('');

  const onChangeDeviceHandler=(device)=>{
    setDevice(device);
  }

  const deviceNames=useSelector(state=>state.device.dropDeviceList);
  const defaultSelctedDevie=deviceNames[0];

  useEffect(()=>{
  setDevice(defaultSelctedDevie);
  },[deviceNames])


  useEffect(() => {

    loadusers();
   
  }, []);

  const loadusers=async()=>{
    const result=await getUsers();
    setUserData(result.data);
   }

   
   
  const onDeleteUser = async (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, You will not be able to recover this User Details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteUser(userId);
        console.log("result", res);
        const { responseStatus, outputMessage } = res.data.output;
        if (responseStatus === "failed") {
          console.log("exception:", outputMessage);
        } else {
          console.log("successful:", outputMessage);
          swal("Success!", "Your User Details have been deleted!", "success");
          loadusers();
        }
      } else {
        swal("User Details deletion has been cancelled!");
      }
    });
  }

  //   const res = await deleteUser(userId);
  //   console.log("result",res);
  //   const { responseStatus, outputMessage } = res.data.output;
  //   if (responseStatus === "failed") {
  //     console.log("exception:", outputMessage);
  //   }
  
  //   console.log("successful:", outputMessage);
  // }
  return (
        <div className='home'>
            <Navbar onChangeDevice={onChangeDeviceHandler} className='navnav'/>
            <div className='body '>
            <div className=" d-flex align-items-center justify-content-center">
            <div className= "rounded notification-acc">
                <h3 className='d-flex justify-content-center align-items-center'>Service Account Registration</h3>
                {/* <div className="d-flex justify-content-end">
                <Link to="/userregister/0/I" className="btn btn-info bbttnn">Add User</Link>
                </div> */}
                <div>
                    <div className='form-group mb-1'>
                        <label className="form-label">Client ID :</label>
                        <input type="text" className="form-control" value=""  />
                    </div>
                </div>

                

                    <form className='needs-validation mb-2' >
                        <div className='row'>
                            {/* First Column */}
                            {/* {JSON.stringify(userName)} */}
                            <div className='col-md-6 mb-1'>
                            <div className='form-group was-validated'>
                                <label htmlFor='username' className='form-label'>
                                Username
                                </label>
                                <input type='text' className='form-control' value={''} required />
                            </div>

                            <div className='form-group was-validated'>
                                <label htmlFor='password' className='form-label'>
                                Password
                                </label>
                                <input type='password' className='form-control' value={''}  required />
                            </div>

                            <div className='form-group was-validated'>
                                <label htmlFor='email' className='form-label'>
                                Email
                                </label>
                                <input type='email' className='form-control' value={''}  required />
                            </div>

                            <div className='form-group was-validated'>
                                <label htmlFor='displayname' className='form-label'>
                                Display Name
                                </label>
                                <input type='text' className='form-control' value={''}  required />
                            </div>
                            </div>

                            {/* Second Column */}
                            <div className='col-md-6 mb-1'>
                            <div className='form-group was-validated'>
                                <label htmlFor='address' className='form-label'>
                                Address
                                </label>
                            <input type='text' className='form-control' value={''} required />
                            </div>

                            <div className='form-group was-validated'>
                                <label htmlFor='billingaddress' className='form-label'>
                                Billing Address
                                </label>
                                <input type='text' className='form-control' value={''}  required />
                            </div>

                            <div className='form-group was-validated'>
                                <label htmlFor='mobile' className='form-label'>
                                Mobile
                                </label>
                                <input type='text' className='form-control' value={''} required />
                            </div>

                            <div className='form-group was-validated'>
                                <label htmlFor='tel' className='form-label'>
                                Tel
                                </label>
                                <input type='text' className='form-control' value={''} required />
                            </div>
                            </div>
                        </div>

                        {/* <button type='submit' className='btn btn-primary w-100 mt-3'>
                            Save
                        </button> */}
                    
                        
                    </form>

                    <div>
                        <h5 className='d-flex align-items-center justify-content-center mb-1'>Device details</h5>
                        <div className='form-group d-flex align-items-center'>
                        <input type="text" className="form-control mb-1 mr-2 " value="" style={{width:'400px'}}/>
                        <Link to="#" className="btn btn-info bbttnn" style={{marginLeft:'10px', height:'37px', marginTop:'-3px'}}>Add</Link>
                        </div>
                        
                        <div className='data-table ' >
                            <table className="data-table table table-hover rounded "style={{marginTop:"10px"}}>
                            <thead className='table-dark'>
                                <tr>
                                <th>Device No</th>
                                <th>Device Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td>D-003</td>
                                    <td>Single-phase</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <BottomNav className="bottombar"/>
         </div>
  )
}

export default AccountReg