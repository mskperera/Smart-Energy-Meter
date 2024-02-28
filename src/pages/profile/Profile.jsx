import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
<<<<<<< Updated upstream
  // Replace the following with your user data
=======
//   const addUpdateUser=async()=>{
//     const payload = {
//       userRegId:null,
//       userRoleId:2,
//       userName: "tes1t",
//       password: "1234",
//       isActive: true,
//       email: "test@gmail.com",
//       profilePic: "https://example.com/profiles/john_doe.jpg",
//       displayName: "MSK perera",
//       iud: "I",//"U"-update,"I"-insert
//       gmt_Offset: "+05:30"
//     };
// };
>>>>>>> Stashed changes
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
<<<<<<< Updated upstream
    // profilePicture: 'https://placekitten.com/150/150', // Replace with your profile picture URL
  };

  const handleEditProfile = () => {
    // Handle edit profile logic here
    console.log('Edit profile clicked');
  };

  const handleDeleteProfile = () => {
    // Handle delete profile logic here
    console.log('Delete profile clicked');
  };
=======
    profilePicture: 'https://example.com/profiles/john_doe.jpg', 
  };

//   const handleEditProfile = () => {
//     console.log('Edit profile clicked');
//   };

//   const handleDeleteProfile = () => {
//     console.log('Delete profile clicked');
//   };
>>>>>>> Stashed changes

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header">
<<<<<<< Updated upstream
          {/* <img
=======
          <img
>>>>>>> Stashed changes
            src={user.profilePicture}
            alt="Profile"
            className="rounded-circle"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
<<<<<<< Updated upstream
          /> */}
=======
          />
>>>>>>> Stashed changes
        </div>
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">{user.email}</p>
        </div>
<<<<<<< Updated upstream
        <div className="card-footer">
          <button className="btn btn-primary mr-2" onClick={handleEditProfile}>
            Save
          </button>
          {/* &nbsp;
          <button className="btn btn-danger" onClick={handleDeleteProfile}>
            Delete Profile
          </button> */}
=======
        <div className="card-footer ">
          <button className="btn btn-primary mr-2" >
            Edit Profile
          </button>&nbsp;
          <button className="btn btn-danger" >
            Delete Profile
          </button>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

export default Profile;
