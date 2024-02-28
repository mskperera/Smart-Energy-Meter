import React, { useEffect, useState } from 'react'
import { getDeviceDetailsByDeviceId, get_DeviceSettingsByDeviceId, saveDeviceSettings } from '../../action/device';
import { getDrpConsumerCategories, getDrpConsumerSubCategoriesById, getDrpSupplier, getDrpSupplyType, getDrpUserRole } from '../../action/dropdown';
import { addUser, deleteUser, getUserbyUserId, getUsers } from '../../action/user';

const UserManagement=()=> {


  const [drpData2,setDrpData2]=useState(null);
  const [drpData3,setDrpData3]=useState(null);
  const [drpData4,setDrpData4]=useState(null);

  useEffect(() => {

    loadusers();
    loadUserbyUserId();
    loadDrpUserRole();
  }, []);



   const loadusers=async()=>{
    const result=await getUsers();
    setDrpData2(result.data);
   }

   const loadUserbyUserId=async()=>{
    const result=await getUserbyUserId(1);
    setDrpData3(result.data);
   }

   const loadDrpUserRole=async()=>{
    const result=await getDrpUserRole();
    setDrpData4(result.data);
   }



   
   

const addUpdateUser=async()=>{
  const payload = {
    userRegId:null,
    userRoleId:2,
  userName: "tes1t",
  password: "1234",
  isActive: true,
  email: "test@gmail.com",
  // profilePic: "https://example.com/profiles/john_doe.jpg",
  displayName: "MSK perera",
  iud: "I",//"U"-update,"I"-insert
  gmt_Offset: "+05:30"
  };

  const res = await addUser(payload);
  console.log(res);
  const { responseStatus, outputMessage } = res.data.output;
  if (responseStatus === "failed") {
    console.log("exception:", outputMessage);
  }

  console.log("successful:", outputMessage);
}

const DeleteUser=async()=>{


  const res = await deleteUser(10);
  console.log(res);
  const { responseStatus, outputMessage } = res.data.output;
  if (responseStatus === "failed") {
    console.log("exception:", outputMessage);
  }

  console.log("successful:", outputMessage);
}


  return (
    <>
    <h4>Save User</h4>
     <button onClick={addUpdateUser}>Save</button>
 
    <hr/>
    <br/>
    <h4>Delete User</h4>
     <button onClick={DeleteUser}>Save</button>
 
    <hr/>
    <br/>
    <h4>users</h4>
   {JSON.stringify(drpData2)}
    <hr/>
    <br/>
    <h4>user by id</h4>
   {JSON.stringify(drpData3)}
    <hr/>
    <br/>

    <h4>DrpUserRole</h4>
    {JSON.stringify(drpData4)}
    <hr/>
    <br/>

    
    </>
  
  )
}

export default UserManagement;