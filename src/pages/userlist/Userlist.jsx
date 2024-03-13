import React, { useEffect, useState } from 'react'
import './Userlist.css'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'
import { deleteUser, getUsers } from '../../action/user';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function Userlist() {


  const [userData,setUserData]=useState(null);

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
        swal("Your User Detalis are safe!");
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
    <>
    <Navbar className='navnav'/>
    <div className="body">
      <div className= "rounded p-2 ">
        <h2 className='d-flex justify-content-center align-items-center'>User List</h2>
        <div className="d-flex justify-content-end">
          <Link to="/userregister/0/I" className="btn btn-info bbttnn">Add User</Link>
        </div>
        <table className="table1 table rounded">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Display Name</th>
              <th>Password</th>
              <th>Mobile</th>
              <th>Tel</th>
              <th>Address</th>
              <th>Email</th>
              <th>Billing Address</th>
              <th>Edit|Delete</th>
            </tr>
          </thead>
          <tbody>
            
            {/* {JSON.stringify(userData)} */}
            {userData && userData.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userName}</td>
                    <td>{user.displayName}</td>
                    <td>{user.password}</td>
                    <td>{user.mobileNo}</td>
                    <td>{user.tel}</td>
                    <td>{user.siteAddress}</td>
                    <td>{user.email}</td>
                    <td>{user.billingAddress}</td>
                    <td>
                      <Link to={`/userregister/${user.userId}/U`} className="btn btn-sm btn-primary">Edit</Link>&nbsp;
                      <button className="btn btn-sm btn-danger" onClick={()=>onDeleteUser(user.userId)}>Delete</button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
  </div>
  <BottomNav className="bottombar"/>
    </>
  )
}

export default Userlist