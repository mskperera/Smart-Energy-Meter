import React, { useEffect, useState } from 'react';
import './UserRegister.css';
import { useParams } from 'react-router-dom';
import { addUser, getUserbyUserId, updateUser } from '../../action/user';
import swal from 'sweetalert';

function UserRegister() {
  
  const { userRegId, saveType } = useParams();
  // const [userData, setUserData] = useState(null);
  const [userName,setUserName] = useState('');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userPassword,setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userBillAddress, setUserBillAddress] = useState('');
  const [userTel, setUserTel] = useState('');

  // const [load,setLoad]=useState(false);

  useEffect(() => {

    if(saveType==="U"){
      loaduser();
    }

   
  }, []);

  const loaduser=async()=>{
    console.log("loaduser");
    const result=await getUserbyUserId(userRegId);
    //setUserData(result.data);
    const user =result.data;
    console.log("result data:",user);
    setUserName(user.userName);
    setUserPassword(user.password);
    setUserEmail(user.email);
    setUserDisplayName(user.displayName);
    setUserMobile(user.mobileNo);
    setUserAddress(user.siteAddress);
    setUserBillAddress(user.billingAddress);
    setUserTel(user.tel);
   }


   const [message,setMessage]=useState('');
   const [errormessage,setErrorMessage]=useState('');

   const onsubmitHandler=async(e)=>{
    e.preventDefault(); 
    try{

      setErrorMessage('');
      setMessage('');
      console.log("run");
      const payload = {
        userRoleId:1,
        userName: userName,
        password: userPassword,
        isActive: true,
        email: userEmail,
        mobileNo: userMobile,
        siteAddress: userAddress,
        billingAddress:userBillAddress,
        tel:userTel,
        profilePic: "https://example.com/profiles/john_doe.jpg",
        displayName: userDisplayName,
        gmt_Offset: "+05:30"
        
      };
    console.log("payload:",payload);

    if(saveType==="I"){
      const res = await addUser(payload);
      console.log(res);

      const { responseStatus, outputMessage } = res.data;
      if (responseStatus === "failed") {
        setErrorMessage(outputMessage)
        return;
        // console.log("exception:", outputMessage);
      }
    
      // console.log("successful:", outputMessage);
      setMessage(outputMessage);
      swal("User Added Successfully", "", "success").then(() => {
        window.location = "/userlist";
      });
    }

   else if(saveType==="U"){
      const res = await updateUser(payload,userRegId);
      console.log(res);

      const { responseStatus, outputMessage } = res.data;
      if (responseStatus === "failed") {
        setErrorMessage(outputMessage)
        return;
        // console.log("exception:", outputMessage);
      }
    
      // console.log("successful:", outputMessage);
      setMessage(outputMessage);
      swal("User Updated Successfully", "", "success").then(() => {
        window.location = "/userlist";
      });
    }
    }
    catch(err){
      console.log(err);
    }
    }

 
  return (
    <div className='wrapper-register d-flex align-items-center justify-content-center w-100'>
      <div className='register'>
     {saveType==="I" ?  <h2 className='d-flex align-items-center justify-content-center mb-2'>User Registration</h2> : <h2 className='d-flex align-items-center justify-content-center mb-2'>Update User Details</h2>}
      
        <form className='needs-validation' onSubmit={onsubmitHandler}>
          <div className='row'>
            {/* First Column */}
            {/* {JSON.stringify(userName)} */}
            <div className='col-md-6 mb-1'>
              <div className='form-group was-validated'>
                <label htmlFor='username' className='form-label'>
                  Username
                </label>
                <input type='text' className='form-control' value={userName || ''} onChange={(e)=>{setUserName(e.target.value)}} required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <input type='password' className='form-control' value={userPassword || ''} onChange={(e)=>{setUserPassword(e.target.value)}} required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input type='email' className='form-control' value={userEmail || ''} onChange={(e)=>{setUserEmail(e.target.value)}} required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='displayname' className='form-label'>
                  Display Name
                </label>
                <input type='text' className='form-control' value={userDisplayName || ''} onChange={(e)=>{setUserDisplayName(e.target.value)}} required />
              </div>
            </div>

            {/* Second Column */}
            <div className='col-md-6 mb-1'>
              <div className='form-group was-validated'>
                <label htmlFor='address' className='form-label'>
                  Address
                </label>
            <input type='text' className='form-control' value={userAddress || ''} onChange={(e)=>{setUserAddress(e.target.value)}}required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='billingaddress' className='form-label'>
                  Billing Address
                </label>
                <input type='text' className='form-control' value={userBillAddress || ''} onChange={(e)=>{setUserBillAddress(e.target.value)}} required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='mobile' className='form-label'>
                  Mobile
                </label>
                <input type='text' className='form-control' value={userMobile || ''} onChange={(e)=>{setUserMobile(e.target.value)}} required />
              </div>

              <div className='form-group was-validated'>
                <label htmlFor='tel' className='form-label'>
                  Tel
                </label>
                <input type='text' className='form-control' value={userTel || ''} onChange={(e)=>setUserTel(e.target.value)} required />
              </div>
            </div>
          </div>

          <button type='submit' className='btn btn-primary w-100 mt-3'>
            Save
          </button>
            {/* {message && <p>{message}</p>} */}
            {errormessage && <p>{errormessage}</p>}
        </form>
      </div>
    </div>
  );
}
export default UserRegister;
