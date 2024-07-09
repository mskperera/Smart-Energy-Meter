import React, { useEffect, useState } from 'react';
import './UserRegister.css';
import { Link, useParams } from 'react-router-dom';
import { addUser, getUserbyUserId, updateUser } from '../../action/user';
import swal from 'sweetalert';
import { ThreeDots } from 'react-loader-spinner';
import { IoClose } from "react-icons/io5";
import { getDrpUserRole } from '../../action/dropdown';

function UserRegister() {
  
  const { userRegId, saveType } = useParams();
  const [userName, setUserName] = useState('');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userBillAddress, setUserBillAddress] = useState('');
  const [userTel, setUserTel] = useState('');
  const [drpUserRole, setDrpUserRole] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState('');
  const [errormessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadDrpUserRole();
    if(saveType === "U"){
      loadUser();
    }
  }, [saveType, userRegId]);

  const loadUser = async () => {
    setLoading(true);
    const result = await getUserbyUserId(userRegId);
    const user = result.data;
    console.log("user-select", user);
    setUserName(user.userName);
    setUserPassword(user.password);
    setUserEmail(user.email);
    setUserDisplayName(user.displayName);
    setUserMobile(user.mobileNo);
    setUserAddress(user.siteAddress);
    setUserBillAddress(user.billingAddress);
    setUserTel(user.tel);
    setRoleName(user.roleName);
    setRoleId(user.roleId);
    setLoading(false);
  }

  const onsubmitHandler = async (e) => {
    e.preventDefault(); 
    try {
      setErrorMessage('');
      setMessage('');
      const payload = {
        roleName,
        userRoleId: roleId,
        userName,
        password: userPassword,
        isActive: true,
        email: userEmail,
        mobileNo: userMobile,
        siteAddress: '-',
        billingAddress: "-",
        tel: userTel,
        profilePic: "https://example.com/profiles/john_doe.jpg",
        displayName: userDisplayName,
        gmt_Offset: "+05:30"
      };

      let res;
      if(saveType === "I"){
        res = await addUser(payload);
      } else if(saveType === "U"){
        res = await updateUser(payload, userRegId);
      }

      setLoading(true);
      const { responseStatus, outputMessage } = res.data;
      if (responseStatus === "failed") {
        setErrorMessage(outputMessage);
        return;
      }
      setMessage(outputMessage);
      swal(saveType === "I" ? "User Added Successfully" : "User Updated Successfully", "", "success").then(() => {
        window.location = "/userlist";
      });
    } catch (err) {
      console.log(err);
    }
  }

  const loadDrpUserRole = async () => {
    const result = await getDrpUserRole();
    setDrpUserRole(result.data);
  };

  const handleRoleChange = (e) => {
    const selectedRole = drpUserRole.find(role => role.RoleName === e.target.value);
    if (selectedRole) {
      setRoleName(selectedRole.RoleName);
      setRoleId(selectedRole.RoleId);
    }
  };

  return (
    <div className='wrapper-register d-flex align-items-center justify-content-center w-100'>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          <ThreeDots
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
        <div className='register'>
          <div className="d-flex justify-content-end">
            <Link to="/userlist" className="button-close"><IoClose size={25} color='black' className='button-close' /></Link>
          </div>
          <h2 className='d-flex align-items-center justify-content-center mb-2'>
            {saveType === "I" ? "User Registration" : "Update User Details"}
          </h2>
          <form className='needs-validation' onSubmit={onsubmitHandler}>
            <div className='row'>
              <div className='col-md-6 mb-1'>
                <div className='form-group was-validated'>
                  <label htmlFor='username' className='form-label'>Username</label>
                  <input type='text' className='form-control' value={userName || ''} onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div className='form-group was-validated'>
                  <label htmlFor='password' className='form-label'>Password</label>
                  <input type='password' className='form-control' value={userPassword || ''} onChange={(e) => setUserPassword(e.target.value)} required />
                </div>
                <div className='form-group was-validated'>
                  <label htmlFor='email' className='form-label'>Email</label>
                  <input type='email' className='form-control' value={userEmail || ''} onChange={(e) => setUserEmail(e.target.value)} required />
                </div>
                <div className='form-group was-validated'>
                  <label htmlFor='userrole' className='form-label'>User Role</label>
                  <select onChange={handleRoleChange} required name='userrole' className='form-control' value={roleName || ''}>
                    {drpUserRole.map((role) => (
                      <option key={role.RoleId} value={role.RoleName}>
                        {role.RoleName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-md-6 mb-1'>
                <div className='form-group was-validated'>
                  <label htmlFor='displayname' className='form-label'>Display Name</label>
                  <input type='text' className='form-control' value={userDisplayName || ''} onChange={(e) => setUserDisplayName(e.target.value)} required />
                </div>
                <div className='form-group was-validated'>
                  <label htmlFor='mobile' className='form-label'>Mobile</label>
                  <input type='text' className='form-control' value={userMobile || ''} onChange={(e) => setUserMobile(e.target.value)} required />
                </div>
                <div className='form-group was-validated'>
                  <label htmlFor='tel' className='form-label'>Tel</label>
                  <input type='text' className='form-control' value={userTel || ''} onChange={(e) => setUserTel(e.target.value)} required />
                </div>
              </div>
            </div>
            <button type='submit' className='btn btn-primary w-100 mt-3'>Save</button>
            {errormessage && <p>{errormessage}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
export default UserRegister;
