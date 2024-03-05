import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import { getUsers } from '../../action/user';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

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
    <>
    <div className='wrap'>
      <div className="body">
        <div className="card text-center">
          {profileData && profileData.length > 0 && (
            <>
              <div className="card-header">
                <img
                  src={profileData[0].profilePic}
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
      <BottomNav />
    </>
  );
};

export default Profile;
