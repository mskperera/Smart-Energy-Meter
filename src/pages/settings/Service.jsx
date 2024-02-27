import React, { useEffect, useState } from 'react'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'

// import { Link } from 'react-router-dom'
import './Service.css'
import { getDrpConsumerCategories, getDrpConsumerSubCategoriesById, getDrpSupplier, getDrpSupplyType } from '../../action/dropdown'
import { get_DeviceSettingsByDeviceId, saveDeviceSettings } from '../../action/device'
// import { Link } from 'react-router-dom'

function Service () {

    // Inside your Service component
    const [editedDeviceName, setEditedDeviceName] = useState('');
    const [editedConnection, setEditedConnection] = useState('');


    const [dropoptionsConsumerCatogery, setDropoptionsConsumerCatogery] = useState(['Option 1', 'Option 2', 'Option 3']);
    const [consumerCategoryselectedValue, setConsumerCategoryselectedValue] = useState('');

    const [dropoptionsConsumerSubCatogery, setDropoptionsConsumerSubCatogery] = useState(['Option 1', 'Option 2', 'Option 3']);
    const [consumerSubCategoryselectedValue, setConsumerSubCategoryselectedValue] = useState('');

    const [dropoptionsSupplier, setDropoptionsSupplier] = useState(['Option 1', 'Option 2', 'Option 3']);
    const [supplierSelectedValue, setSupplierselectedValue] = useState('');

    const [dropoptionsSupplyType, setDropoptionsSupplyType] = useState(['Option 1', 'Option 2', 'Option 3']);
    const [supplyTypeSelectedValue, setSupplyTypeselectedValue] = useState('');

    const [load,setLoad]=useState(false);

    useEffect(() => {

        loadDeviceSettingstData();
        loadDrpConsumerCategories();
        loadDrpConsumerSubCategoriesById();
        loadDrpSupplier();
        loadDrpSupplyType();
        // loadDeviceDetailsByDeviceId();
    }, []);

    useEffect(()=>{
        loadDeviceSettingstData()
    },[
        load
    ])

  

    const [deviceSettings,setDeviceSettings] = useState('');

    const loadDeviceSettingstData=async()=>{
 
        const result=await get_DeviceSettingsByDeviceId(4);
        setDeviceSettings(result.data);
       }

    const loadDrpConsumerCategories=async()=>{
        const result=await getDrpConsumerCategories();
        setDropoptionsConsumerCatogery(result.data);
       }

    const loadDrpConsumerSubCategoriesById=async()=>{
        const result=await getDrpConsumerSubCategoriesById(3);
        setDropoptionsConsumerSubCatogery(result.data);
       }

    const loadDrpSupplier=async()=>{
        const result=await getDrpSupplier();
        setDropoptionsSupplier(result.data);
       }

    const loadDrpSupplyType=async()=>{
        const result=await getDrpSupplyType();
        setDropoptionsSupplyType(result.data);
       }

   
       const [message,setMessage]=useState('');
       const [errormessage,setErrorMessage]=useState('');


const addUpdateDeviceSettings=async()=>{

    try{
    
    setErrorMessage('');
    setMessage('');


    const payload = {
      deviceId:4 ,
      supplierId: supplierSelectedValue,
      supplyTypeId: supplyTypeSelectedValue,
      consumerCategoryid: consumerCategoryselectedValue,
      consumerSubCategoryId:consumerSubCategoryselectedValue
    };
  
    const res = await saveDeviceSettings(payload);
    console.log(res);
    const { responseStatus, outputMessage } = res.data.output;
    if (responseStatus === "failed") {
      setErrorMessage(outputMessage)
      return;
    }
  
    setMessage(outputMessage)
    setLoad(!load)
  }

  catch(err){
    //const jsonString = JSON.parse(err);
    //setErrorMessage(jsonString);
    console.log(err);
  }
  
}

  const [toggle,setToggle] = useState(1)

  function updateToggle(id){
    setToggle(id)
  }

  return (
    <>
    <Navbar/> 
    <div className='tab'>
            <ul className='tab-links nav nav-pills' id='v-pills-tab' role='tablist'>
                <li onClick={()=>updateToggle(1)} className='flex-fill nav-link active' id='v-pills-service-tab' data-bs-toggle='pill' data-bs-targrt="/service">Service</li>
                <li onClick={()=>updateToggle(2)} className='flex-fill nav-link' id='v-pills-service-tab' data-bs-toggle='pill' data-bs-targrt="/connection">Connection</li>
            </ul>
    </div>          

                    <div className={toggle === 1 ? "show-content":"content"}>
                      <div className='wrapper3 d-flex align-items-center justify-content-center w-100'>
                        <div className='service'>
                            <h4 className='d-flex align-items-center justify-content-center mb-3'>Device Settings</h4>
                            <form form className='needs-validation' onSubmit={(e) => {e.preventDefault(); addUpdateDeviceSettings();}}>
                                <div className='form-group mb-2'>
                                    <label htmlFor='consumerCategoryId' className='form-label'>Consumer Category</label>
                                        <select onChange={(e)=>{
                                            console.log(e.target.value)
                                            setConsumerCategoryselectedValue(e.target.value)
                                        }} name="consumerCategoryId" className='form-control'>
                                        {dropoptionsConsumerCatogery.map(d=>(
                                            <option key={d.consumerCategoryId} value={d.consumerCategoryId}>{d.consumerCategoryName}</option>
                                        ))}            
                                        </select>   
                                </div>
                {/* {JSON.stringify(consumerCategoryselectedValue)} */}
                                <div className='form-group mb-2'>
                                    <label htmlFor='ConsumerSubCategoryId' className='form-label'>Consumer SubCategory</label>
                                        <select onChange={(e)=>{
                                            setConsumerSubCategoryselectedValue(e.target.value)
                                        }} name="ConsumerSubCategoryId" className='form-control'>
                                            {dropoptionsConsumerSubCatogery.map(s=>(
                                            <option key={s.ConsumerSubCategoryId} value={s.ConsumerSubCategoryId}>{s.ConsumerSubCategoryName}</option>
                                        ))}
                                        </select>
                                </div>
                {/* {JSON.stringify(consumerSubCategoryselectedValue)} */}

                                <div className='form-group mb-2'>
                                    <label htmlFor='supplierId' className='form-label'>Supplier</label>
                                        <select onChange={(e)=>{
                                            setSupplierselectedValue(e.target.value)
                                        }} name="supplierId" className='form-control '>
                                            {dropoptionsSupplier.map(r=>(
                                            <option key={r.supplierId} value={r.supplierId}>{r.supplierName}</option>
                                        ))}
                                        </select>
                                </div>
                {/* {JSON.stringify(supplierSelectedValue)} */}

                                <div className='form-group mb-2'>
                                    <label htmlFor='supplytype' className='form-label'>Supply Type</label>
                                    <select onChange={(e)=>{
                                            setSupplyTypeselectedValue(e.target.value)
                                        }} name="supplyTypeId" className='form-control'>
                                            {dropoptionsSupplyType.map(t=>(
                                            <option key={t.supplyTypeId} value={t.supplyTypeId}>{t.supplyTypeName}</option>
                                        ))}
                                        </select>
                                </div>
                {/* {JSON.stringify(supplyTypeSelectedValue)} */}
                                
                                <button type='submit' className='btn btn-primary w-100 mt-2'>Save</button>

                                {message && <p>{message}</p>}
                                {errormessage && <p>{errormessage}</p>}
                            </form>
                        </div>
                    </div>
                </div>
                

                    <div className={toggle === 2 ? "show-content":"content"}>
                     <div className='wrapper4 d-flex align-items-center justify-content-center w-100'>
                        <div className='connection'>
                            <h2 className='d-flex align-items-center justify-content-center mb-3'>Connection</h2>
                            <form className='needs-validation'>
                                <div className='form-group mb-2'>
                                    <label htmlFor='devicename' className='form-label'>Device Name</label>
                                    <input type='text' className='form-control' value={editedDeviceName || deviceSettings.DeviceName}
                                     onChange={(e) => setEditedDeviceName(e.target.value)}/>
                                </div>

                                <div className='form-group mb-2'>
                                    <label htmlFor='connection' className='form-label'>Connection</label>
                                    <input type='text' className='form-control'value={editedConnection || deviceSettings.Connection}
                                     onChange={(e) => setEditedConnection(e.target.value)}/>
                                </div>
                                
                                <button type='submit' className='btn btn-primary w-100 mt-2'>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
        <BottomNav/>
    </>
  )
}

export default Service