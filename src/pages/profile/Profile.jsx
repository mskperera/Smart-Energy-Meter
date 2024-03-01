import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css'
import BottomNav from '../../components/bottommenu/BottomNav';

const Profile = () => {
  
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    // profilePicture: 'https://placekitten.com/150/150',
  };

  const handleEditProfile = () => {
    // Handle edit profile logic here
    console.log('Edit profile clicked');
  };

  // const handleDeleteProfile = () => {
  //    Handle delete profile logic here
  //   console.log('Delete profile clicked');
  // };

  return (
    <>
      <div className="wrap container mt-5 ">
        <div className="card text-center">
          <div className="card-header">
            {/* <img
              src={user.profilePicture}
              alt="Profile"
              className="rounded-circle"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            /> */}
          </div>
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary mr-2" onClick={handleEditProfile}>
              Save
            </button>
            {/* &nbsp;
            <button className="btn btn-danger" onClick={handleDeleteProfile}>
              Delete Profile
            </button> */}
          </div>
        </div>
      </div>
      <BottomNav/>
    </>
  );
};

export default Profile;
