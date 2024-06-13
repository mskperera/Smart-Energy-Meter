import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import { getUserbyUserId, getUsers } from '../../action/user';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { getDeviceInfoByUserId } from '../../action/device';

const Profile = () => {
  // const [profileData, setProfileData] = useState('');

  const [deviceDetails,setDeviceDetails]=useState('');


  const [device, setDevice] = useState('');

  // const onChangeDeviceHandler=(device)=>{
  //   setDevice(device);
  // }

  const selectedDevice = useSelector((state) => state.device.selectedDevice);

  useEffect(()=>{
  setDevice(selectedDevice);
  },[device,selectedDevice])


  useEffect(() => {
    // if(device){
    const userData = localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    loadUserbyUserId(userId);
    // }
  }, [device]);

  const loadUserbyUserId = async (userId) => {
    const result = await getUserbyUserId(userId);
    console.log('Result 11111111', result);
    setDeviceDetails(result.data);
    // console.log('Details',result)
  }


  // useEffect(() => {
  //   loadUserProfile();
  // }, []);

  // const loadUserProfile = async () => {
  //   try {
  //     const result = await getUsers();
  //     console.log('result - profile', result.data);
  //     setProfileData(result.data);
  //   } catch (error) {
  //     console.error('Error loading user profile:', error);
  //   }
  // };


//   useEffect(() => {

//     // if(device){
//       const userData = localStorage.getItem('userData');
//       const userId = JSON.parse(userData).userId;
//       loadDeviceInfoByUserId(userId);
//     // }
// }, [device]);

//   const loadDeviceInfoByUserId=async(userId)=>{
//     const result=await getDeviceInfoByUserId(userId);
//     console.log('Result 11111111',result);
//     setDeviceDetails(result.data);
//     // console.log('Details',result)
//   }


  return (
    <div className='home'>
    {/* <Navbar onChangeDevice={onChangeDeviceHandler} className='navnav'/> */}
    <div className='wrap '>
      <div className="body">
        <div className="card text-center ">
          {deviceDetails && (
            <>
              <div className="card-header" style={{backgroundColor:'#36A2EB'}}>
                <img
                  // src={deviceDetails.profilePic}
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRleAjFBTEVaNLtzm33Xg_ZWF6q0Gk14Vz3YerM4QfAfBAmzTmlOXXRowWgyBVrxAPbmhI&usqp=CAU'
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <div className="card-body" style={{backgroundColor:''}}>
                <h5 className="card-title">{deviceDetails.displayName}</h5>
                <div>
                <p className="card-text"><b><i>Role :</i></b> {deviceDetails.roleName}</p>
                <p className="card-text"><b><i>UserName :</i></b> {deviceDetails.userName}</p>
                <p className="card-text"><b><i>Email :</i></b> {deviceDetails.email}</p>
                <p className="card-text"><b><i>Mobile :</i></b> {deviceDetails.mobileNo}</p>
                </div>
                {/* <p className="card-text">{deviceDetails.billingAddress}</p> */}
              </div>
            </>
            )}
          {/* <div className="card-footer" style={{backgroundColor:'#00ff99'}}>
            <button className="btn btn-primary mr-2">Save</button>
            &nbsp;
            <button className="btn btn-danger" onClick={handleDeleteProfile}>
              Delete Profile
            </button>
          </div> */}
        </div>
      </div>
    </div>
      <BottomNav className='bottombar'/>
    </div>
  );
};

export default Profile;
