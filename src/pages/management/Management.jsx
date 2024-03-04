import React, { useEffect, useState } from 'react'
import './Management.css'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'
import { getUsers } from '../../action/user';

function Management() {


  const [data,setData]=useState(null);

  useEffect(() => {

    loadusers();
   
  }, []);

  const loadusers=async()=>{
    const result=await getUsers();
    setData(result.data);
   }

  // const addUpdateUser=async()=>{
  //   const payload = {
  //     userRegId:null,
  //     userRoleId:2,
  //     userName: "tes1t",
  //     password: "1234",
  //     isActive: true,
  //     email: "test@gmail.com",
  //     // profilePic: "https://example.com/profiles/john_doe.jpg",
  //     displayName: "MSK perera",
  //     iud: "I",//"U"-update,"I"-insert
  //     gmt_Offset: "+05:30"
  //   };
  
  //   const res = await addUser(payload);
  //   console.log(res);
  //   const { responseStatus, outputMessage } = res.data.output;
  //   if (responseStatus === "failed") {
  //     console.log("exception:", outputMessage);
  //   }
  
  //   console.log("successful:", outputMessage);
  // }

  return (
    <>
    <Navbar/>
    <div className="body">
      <div className= "rounded p-2 ">
        <h2 className='d-flex justify-content-center align-items-center'>Device Management</h2>
        
        <table className="table1 table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Login Name</th>
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
            
              {/* {drpData2.map(u=>( */}
                {/* {JSON.stringify(data)} */}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button className="btn btn-sm btn-primary"> Edit</button>&nbsp;
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              {/* ))} */}

          </tbody>
        </table>
      </div>
  </div>
  <BottomNav className="bottombar"/>
    </>
  )
}

export default Management





//   const [data, setData] = useState([]);
//   useEffect(() => {
//     axios.get('http://localhost:8000/')
//       .then(res => setData(res.data))
//       .catch(err => console.log(err));
//   }, [])

 
