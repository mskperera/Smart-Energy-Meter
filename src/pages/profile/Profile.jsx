import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import { getUserbyUserId, getUsers } from '../../action/user';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { getDeviceInfoByUserId } from '../../action/device';
import { ThreeDots } from 'react-loader-spinner';
import { getServiceProfileSelectByUserId } from '../../action/serviceProfile';

const Profile = () => {
  // const [profileData, setProfileData] = useState('');

  const [deviceDetails,setDeviceDetails]=useState('');


  const [device, setDevice] = useState('');

  const [loading,setLoading]=useState(null);

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
    setLoading(true);
    // }
  }, [device]);

  const loadUserbyUserId = async (userId) => {
    const result = await getServiceProfileSelectByUserId(userId);
    setLoading(true);
    console.log('Result 11111111', result);
    setDeviceDetails(result.data[0]);
    setLoading(false);
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
        {loading ? (
          // <p className="loading-message">Loading please wait...</p>
          <div  className="d-flex align-items-center justify-content-center">
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
          <>
          {deviceDetails && (
            <div className="page-content page-container" id="page-content">
              <div className="padding">
                <div className="row container d-flex justify-content-center">
                  <div className="col-xl-6 col-md-12">
                    <div className="card user-card-full">
                      <div className="row m-l-0 m-r-0">
                        <div className="col-sm-4 bg-c-lite-green user-profile">
                          <div className="card-block text-center text-white">
                            <div className="m-b-25">
                              <img
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRleAjFBTEVaNLtzm33Xg_ZWF6q0Gk14Vz3YerM4QfAfBAmzTmlOXXRowWgyBVrxAPbmhI&usqp=CAU'
                                alt="Profile"
                                className="rounded-circle"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                              />

                            </div>
                                <h6 className="f-w-600">{deviceDetails.displayName}</h6>
                                <p>Profile No : {deviceDetails.profileNo}</p>
                                <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                          </div>
                        </div>
                        
                        <div className="col-sm-8">
                          <div className="card-block">
                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Account Details</h6>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Profile Id</p>
                                    <h6 className="text-muted f-w-400">{deviceDetails.profileId}</h6>
                                  </div>
                                  <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Profile No</p>
                                    <h6 className="text-muted f-w-400">{deviceDetails.profileNo}</h6>
                                  </div>  
                                  <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">User Name</p>
                                    <h6 className="text-muted f-w-400">{deviceDetails.userName}</h6>
                                  </div>                                 
                                </div>
                                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">User Details</h6>
                                    <div className="row">
                                    <div className="col-sm-6">
                                      <p className="m-b-10 f-w-600">Email</p>
                                      <h6 className="text-muted f-w-400">{deviceDetails.email}</h6>
                                    </div>
                                  <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Phone</p>
                                    <h6 className="text-muted f-w-400">{deviceDetails.mobileNo}</h6>
                                  </div>
                                  <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Tel</p>
                                    <h6 className="text-muted f-w-400">{deviceDetails.tel}</h6>
                                  </div> 
                                  <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Billing Address</p>
                                    <h6 className="text-muted f-w-400">{deviceDetails.billingAddress}</h6>
                                  </div> 
                                  <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Site Address</p>
                                    <h6 className="text-muted f-w-400">{deviceDetails.siteAddress}</h6>
                                  </div>
                                </div>
                              {/* <ul class="social-link list-unstyled m-t-40 m-b-10">
                              <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                              <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                              <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                            </ul> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </>
        )
        }
        
      </div>
    </div>
      <BottomNav className='bottombar'/>
    </div>
  );
};

export default Profile;
