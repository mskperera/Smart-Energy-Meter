import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import { getUsers } from '../../action/user';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);


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
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const result = await getUsers();
      setProfileData(result.data);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  return (
    <div className='home'>
    {/* <Navbar onChangeDevice={onChangeDeviceHandler} className='navnav'/> */}
    <div className='wrap '>
      <div className="body">
        <div className="card text-center ">
          {profileData && profileData.length > 0 && (
            <>
              <div className="card-header">
                <img
                  // src={profileData[0].profilePic}
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRleAjFBTEVaNLtzm33Xg_ZWF6q0Gk14Vz3YerM4QfAfBAmzTmlOXXRowWgyBVrxAPbmhI&usqp=CAU'
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{profileData[0].userName}</h5>
                <p className="card-text">{profileData[0].email}</p>
              </div>
            </>
          )}
          <div className="card-footer">
            <button className="btn btn-primary mr-2">Save</button>
            {/* &nbsp;
            <button className="btn btn-danger" onClick={handleDeleteProfile}>
              Delete Profile
            </button> */}
          </div>
        </div>
      </div>
    </div>
      <BottomNav className='bottombar'/>
    </div>
  );
};

export default Profile;
