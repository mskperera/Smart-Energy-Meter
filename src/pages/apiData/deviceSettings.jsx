import React, { useEffect, useState } from 'react'
import { get_DeviceSettingsByDeviceId, saveDeviceSettings } from '../../action/deviceSettings';
import { getDrpConsumerCategories, getDrpConsumerSubCategoriesById, getDrpSupplier, getDrpSupplyType } from '../../action/dropdown';
import { getDeviceDetailsByDeviceId } from '../../action/device';

const DeviceSettings=()=> {

  const [deviceSettings,setDeviceSettings]=useState(null);
  const [deviceDetails,setDeviceDetails]=useState(null);
  const [drpConsumerCategories,setDrpConsumerCategories]=useState(null);
  const [drpData2,setDrpData2]=useState(null);
  const [drpData3,setDrpData3]=useState(null);
  const [drpData4,setDrpData4]=useState(null);

  useEffect(() => {

      loadDeviceSettingstData();
      loadDrpConsumerCategories();
      loadDrpConsumerSubCategoriesById();
      loadDrpSupplier();
      loadDrpSupplyType();
      loadDeviceDetailsByDeviceId();
  }, []);


  const loadDeviceSettingstData=async()=>{
 
   const result=await get_DeviceSettingsByDeviceId(4);
   setDeviceSettings(result.data);
  }

  const loadDrpConsumerCategories=async()=>{
    const result=await getDrpConsumerCategories();
    setDrpConsumerCategories(result.data);
   }

   const loadDrpConsumerSubCategoriesById=async()=>{
    const result=await getDrpConsumerSubCategoriesById(3);
    setDrpData2(result.data);
   }

   const loadDrpSupplier=async()=>{
    const result=await getDrpSupplier();
    setDrpData3(result.data);
   }

   const loadDrpSupplyType=async()=>{
    const result=await getDrpSupplyType();
    setDrpData4(result.data);
   }

   const loadDeviceDetailsByDeviceId=async()=>{
    const result=await getDeviceDetailsByDeviceId(4);
    setDeviceDetails(result.data);
   }

   

const addUpdateDeviceSettings=async()=>{
  const payload = {
    deviceId: 2,
    supplierId: 1,
    supplyTypeId: 1,
    consumerCategoryid: 1,
    consumerSubCategoryId:2
  };

  const res = await saveDeviceSettings(payload);
  console.log(res);
  const { responseStatus, outputMessage } = res.data.output;
  if (responseStatus === "failed") {
    console.log("exception:", outputMessage);
  }

  console.log("successful:", outputMessage);
}
  return (
    <>
    <h4>Save Device Settings</h4>
     <button onClick={addUpdateDeviceSettings}>Save</button>
 
    <hr/>
    <br/>
    <h4>get Device settings</h4>
   {JSON.stringify(deviceSettings)}
    <hr/>
    <br/>
    <h4>get Device details</h4>
   {JSON.stringify(deviceDetails)}
    <hr/>
    <br/>

    <h4>drp Consumer Categories</h4>
    {JSON.stringify(drpConsumerCategories)}
    <hr/>
    <br/>

    <h4>drp Consumer SubCategoriesById</h4>
    {JSON.stringify(drpData2)}
    <hr/>
    <br/>

    <h4>drp getDrpSupplier</h4>
    {JSON.stringify(drpData3)}
    <hr/>
    <br/>

    <h4>drp SupplyType</h4>
    {JSON.stringify(drpData4)}
    <hr/>
    <br/>
    
    </>
  
  )
}

export default DeviceSettings;