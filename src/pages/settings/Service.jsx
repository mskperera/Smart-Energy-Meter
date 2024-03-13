import React, { useEffect, useState } from 'react'
import BottomNav from '../../components/bottommenu/BottomNav'
import Navbar from '../../components/navbar/Navbar'

// import { Link } from 'react-router-dom'
import './Service.css'
import { getDrpConsumerCategories, getDrpConsumerSubCategoriesById, getDrpSupplier, getDrpSupplyType } from '../../action/dropdown'
import { getConnectionSettingsByDeviceId, get_DeviceSettingsByDeviceId, saveConnectionSettings, saveDeviceSettings } from '../../action/deviceSettings'
import swal from 'sweetalert'
import Budget from './Budget'
// import { get } from 'lodash'
// import { Link } from 'react-router-dom'

function Service () {

    const [editedDeviceName, setEditedDeviceName] = useState('');
    // const [newDeviceName, setNewDeviceName] = useState();

    const [editedConnection, setEditedConnection] = useState('');
    // const [newConnection, setNewConnection] = useState();

    const [editedPortNo, setEditedPortNo] = useState('');
    // const [newPortNo, setNewPortNo] = useState();

    const [dropoptionsConsumerCatogery, setDropoptionsConsumerCatogery] = useState([]);
    const [consumerCategoryselectedValue, setConsumerCategoryselectedValue] = useState('');

    const [dropoptionsConsumerSubCatogery, setDropoptionsConsumerSubCatogery] = useState([]);
    const [consumerSubCategoryselectedValue, setConsumerSubCategoryselectedValue] = useState('');

    const [dropoptionsSupplier, setDropoptionsSupplier] = useState([]);
    const [supplierSelectedValue, setSupplierselectedValue] = useState('');

    const [dropoptionsSupplyType, setDropoptionsSupplyType] = useState([]);
    const [supplyTypeSelectedValue, setSupplyTypeselectedValue] = useState('');

    const [load,setLoad]=useState(false);

  

    useEffect(() => {

        loadDrpConsumerCategories();
       
        loadDrpSupplier();
        loadDrpSupplyType();
        // loadDeviceDetailsByDeviceId();
    }, []);

    useEffect(()=>{
        loadDrpConsumerSubCategoriesById();
    },[consumerCategoryselectedValue]);

 

  const deviceId = 4;
//   const consumerCategoryId = 3;
//   const supplierId = 2;

   // const [deviceSettings,setDeviceSettings] = useState(null);

    const loadDeviceSettingstData=async()=>{
 
        const result=await get_DeviceSettingsByDeviceId(deviceId);
       // setDeviceSettings(result.data);
       console.log("test",result);
       const deviceSetttings=result.data;
       setConsumerCategoryselectedValue(deviceSetttings.consumerCategoryId);
       setSupplierselectedValue(deviceSetttings.supplierId);
       setSupplyTypeselectedValue(deviceSetttings.supplyTypeId);
setConsumerSubCategoryselectedValue(deviceSetttings.consumerSubCategoryId);

       
     // setConsumerSubCategoryselectedValue
       
    }

    const loadDeviceConnectionData=async()=>{
 
        const result=await getConnectionSettingsByDeviceId(deviceId);
       // setDeviceSettings(result.data);
       console.log("test",result);
       const deviceSetttings=result.data;
       setEditedDeviceName(deviceSetttings.deviceName);
       setEditedConnection(deviceSetttings.connection);
       setEditedPortNo(deviceSetttings.portNo);
    }

    useEffect(()=>{
        loadDeviceSettingstData();
        loadDeviceConnectionData();
    },[  load])

    const loadDrpConsumerCategories=async()=>{
        const result=await getDrpConsumerCategories();
        setDropoptionsConsumerCatogery(result.data);
       }

    const loadDrpConsumerSubCategoriesById=async()=>{
        const result=await getDrpConsumerSubCategoriesById(consumerCategoryselectedValue);
        
        const subCategory = result.data;
        console.log("subCategory",subCategory);

        if (Array.isArray(subCategory)) {
            setDropoptionsConsumerSubCatogery(subCategory);
        }
  
        // setConsumerSubCategoryselectedValue(subCategory.ConsumerSubCategoryId);
       }

    const loadDrpSupplier=async()=>{
        const result=await getDrpSupplier(deviceId);
        console.log("sup",result);
        const supplier = result.data;
        setDropoptionsSupplier(result.data);
      //  setSupplierselectedValue(supplier.supplierId)
       }

    const loadDrpSupplyType=async()=>{
        const result=await getDrpSupplyType(deviceId);
        console.log("supType",result);
        const supplierType = result.data;
        setDropoptionsSupplyType(result.data);
        setSupplyTypeselectedValue(supplierType.supplyTypeId)
       }

   
       const [message,setMessage]=useState('');
       const [errormessage,setErrorMessage]=useState('');


const addUpdateDeviceSettings=async(e)=>{
    e.preventDefault();
    try{
    
    setErrorMessage('');
    setMessage('');

console.log("testingsave")


    const payload = {
      deviceId:4 ,
      supplierId: supplierSelectedValue,
      supplyTypeId: supplyTypeSelectedValue,
      consumerCategoryid: consumerCategoryselectedValue,
      consumerSubCategoryId:consumerSubCategoryselectedValue,


    };
    console.log('payload',payload);
    const res = await saveDeviceSettings(payload);
    console.log('saveDeviceSettings',res);
    const { responseStatus, outputMessage } = res.data.output;
    if (responseStatus === "failed") {
      setErrorMessage(outputMessage)
      return;
    }
  
    setMessage(outputMessage)
    swal("User Updated Successfully", "", "success").then(() => {
        setLoad(!load);
      });
    
  }

  catch(err){
    //const jsonString = JSON.parse(err);
    //setErrorMessage(jsonString);
    console.log(err);
  }
  
}




const saveConnectionSettingsHandler=async(e)=>{
    e.preventDefault();
    try{
    
    setErrorMessage('');
    setMessage('');

console.log("testingsave")
const payload = {
    deviceId: 4,
    connection: editedConnection,
    deviceName: editedDeviceName,
    portNo: editedPortNo
    };
  
    const res = await saveConnectionSettings(payload);
    console.log(res);
    const { responseStatus, outputMessage } = res.data.output;
    if (responseStatus === "failed") {
      setErrorMessage(outputMessage)
      return;
    }
  
    setMessage(outputMessage)
    swal("User Updated Successfully", "", "success").then(() => {
        setLoad(!load);
      });
    
  }

  catch(err){
    //const jsonString = JSON.parse(err);
    //setErrorMessage(jsonString);
    console.log(err);
  }
  
}

  const [toggle,setToggle] = useState(1);

  function updateToggle(id){
    setToggle(id);
  }

  return (
    <>
    <Navbar/> 
    <div className='tab d-flex align-items-center justify-content-center'>
        <div className='back2'>
            <ul className='tab-links nav nav-pills' id='v-pills-tab' role='tablist'>
                <li onClick={()=>updateToggle(1)} className='nav-link active' id='v-pills-service-tab' data-bs-toggle='pill' data-bs-targrt="/service">Tarrif </li>
                <li onClick={()=>updateToggle(2)} className='nav-link' id='v-pills-service-tab' data-bs-toggle='pill' data-bs-targrt="/connection">Device </li>
                <li onClick={()=>updateToggle(3)} className='nav-link' id='v-pills-service-tab' data-bs-toggle='pill' data-bs-targrt="/service">Budget</li>
                <li onClick={()=>updateToggle(4)} className='nav-link' id='v-pills-service-tab' data-bs-toggle='pill' data-bs-targrt="/connection">Notification </li>
            </ul>
        </div>
    </div>          

                    <div className={toggle === 1 ? "show-content" : "content"}>
                      <div className='body d-flex align-items-center justify-content-center'>
                        <div className='service'>
                            <h3 className='d-flex align-items-center justify-content-center mb-3'>Tarrif Settings</h3>
                         
                            <form className='needs-valid</div>ation' >
                                <div className='form-group mb-2'>
                                    {/* {JSON.stringify(dropoptionsConsumerSubCatogery)} */}
                                    <label htmlFor='consumerCategoryId' className='form-label'>Consumer Category</label>
                                        <select onChange={(e)=>
                                            // console.log("consumer category",e.target.value)
                                            setConsumerCategoryselectedValue(e.target.value) 
                                        } value={consumerCategoryselectedValue} name="consumerCategoryId" className='form-control'>
                                        {dropoptionsConsumerCatogery.map(d=>(
                                            <option key={d.consumerCategoryId} value={d.consumerCategoryId}>{d.consumerCategoryName}</option>
                                        ))}            
                                        </select>   
                                </div>


                {/* {JSON.stringify(consumerCategoryselectedValue)} */}
                               {dropoptionsConsumerSubCatogery.length>0 &&  <div className='form-group mb-2'>
                                    <label htmlFor='ConsumerSubCategoryId' className='form-label'>Consumer SubCategory</label>
                                        <select onChange={(e)=>
                                            setConsumerSubCategoryselectedValue(e.target.value)
                                        }value={consumerSubCategoryselectedValue} name="ConsumerSubCategoryId" className='form-control'>
                                            {dropoptionsConsumerSubCatogery.length>0 && dropoptionsConsumerSubCatogery.map(s=>(
                                            <option key={s.ConsumerSubCategoryId} value={s.ConsumerSubCategoryId}>{s.ConsumerSubCategoryName}</option>
                                        ))}
                                        </select>
                                </div>}
                

                                <div className='form-group mb-2'>
                                    <label htmlFor='supplierId' className='form-label'>Supplier</label>
                                        <select onChange={(e)=>
                                            setSupplierselectedValue(e.target.value)
                                        }value={supplierSelectedValue} name="supplierId" className='form-control '>
                                            {dropoptionsSupplier.map(r=>(
                                            <option key={r.supplierId} value={r.supplierId}>{r.supplierName}</option>
                                                                                ))}
                                                                                </select>
                                                                        </div>
                                                      

                                                                        <div className='form-group mb-2'>
                                                                            <label htmlFor='supplytype' className='form-label'>Supply Type</label>
                                                                            <select onChange={(e)=>
                                                                                    setSupplyTypeselectedValue(e.target.value)
                                                                                }value={supplyTypeSelectedValue} name="supplyTypeId" className='form-control'>
                                                                                    {dropoptionsSupplyType.map(t=>(
                                                                                    <option key={t.supplyTypeId} value={t.supplyTypeId}>{t.supplyTypeName}</option>
                                                                                ))}
                                                                                </select>
                                                                        </div>
                                                        {/* {JSON.stringify(supplyTypeSelectedValue)} */}
                                                                        
                                                                        <button type='button' className='btn btn-primary w-100 mt-2' onClick={addUpdateDeviceSettings}>Save</button>

                                                                        {/* {message && <p>{message}</p>} */}
                                                                        {errormessage && <p>{errormessage}</p>}
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        

                                                        <div className={toggle === 2 ? "show-content" : "content"}>
                                                             <div className='body d-flex align-items-center justify-content-center '>
                                                                <div className='connection'>
                                                                    <h3 className='d-flex align-items-center justify-content-center mb-3'>Connection Settings</h3>
                                                                    <form className='needs-validation' >
                                                                        <div className='form-group mb-2'>
                                                                            <div className='form-group mb-2'></div>
                                                                            {/* {JSON.stringify(editedDeviceName)} */}
                                                                            <label htmlFor='devicename' className='form-label'>Device Name</label>
                                                                            <input type='text' className='form-control' value={editedDeviceName}
                                                                             onChange={(e) => setEditedDeviceName(e.target.value)} />
                                                                        </div>

                                                                        <div className='form-group mb-2'>
                                                                            <label htmlFor='connection' className='form-label'>Connection</label>
                                                                            <input type='text' className='form-control'value={editedConnection}
                                                                             onChange={(e) => setEditedConnection(e.target.value)}/>
                                                                        </div>

                                                                        <div className='form-group mb-2'>
                                                                            <label htmlFor='port' className='form-label'>Port</label>
                                                                            <input type='text' className='form-control'value={editedPortNo}
                                                                             onChange={(e) => setEditedPortNo(e.target.value)}/>
                                                                        </div>
                                                                        
                                                                        <button type='button' className='btn btn-primary w-100 mt-2' onClick={ saveConnectionSettingsHandler}>Save</button>

                                                                        {/* {message && <p>{message}</p>} */}
                                                                        {errormessage && <p>{errormessage}</p>}
                                                                    </form>
                                                                </div>
                                                               </div>
                                                            </div>

                                                            <div className={toggle === 3 ? "show-content" : "content"}>
                                                                <div className='body d-flex align-items-center justify-content-center w-100'>
                                                                    <Budget/>
                                                                </div>
                                                            </div>             

                                                            <div className={toggle === 4 ? "show-content" : "content"}>
                                                                <div className='body d-flex align-items-center justify-content-center w-100'>
                                                                    <div className='notification'>
                                                                        <h3 className='d-flex align-items-center justify-content-center mb-1'>Device Preferences and Settings</h3>
                                                                        <form className='need-validation'>
                                                                        <h5 className='d-flex align-items-center justify-content-center mb-1'>Operational Preferences</h5>
                                                                        <div className="form-group mb-1">
                                                                                <div className="form-group">
                                                                                    <div className="form-check">
                                                                                         <input type="checkbox"  className="form-check-input" id="check5"/>
                                                                                         <label className="form-check-label" htmlFor="check5">Notify me when Bill reaches</label>
                                                                                         <input type='text' className='form-control' placeholder='Rs'/>
                                                                                         
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="form-group mb-1">
                                                                                <div className="form-group">
                                                                                    <div className="form-check">
                                                                                    <input type="checkbox" className="form-check-input" id="check7"/>
                                                                                    <label className="form-check-label" htmlFor="check7">Notify me when Kwh reaches</label>
                                                                                    <input type='text' className='form-control' placeholder='kWh'/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="form-group mb-1">
                                                                                <div className="form-group">
                                                                                    <div className="form-check">
                                                                                    <input type="checkbox" className="form-check-input" id="check8"/>
                                                                                    <label className="form-check-label" htmlFor="check8">Notify me when Power reaches</label>
                                                                                    <input type='text' className='form-control' placeholder='W'/>
                                                                                </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="form-group mb-1">
                                                                                <div className="form-group">
                                                                                    <div className="form-check">
                                                                                        <input type="checkbox" className="form-check-input" id="check6"/>
                                                                                        <label className="form-check-label" htmlFor="check6">Notify me when Voltage reaches</label>
                                                                                        <div className="form-row">
                                                                                            <div className="form-group col-md-5.5">
                                                                                                <label htmlFor="max">Max</label>
                                                                                                <input type="text" className="form-control" id="max" placeholder="Max Value"/>
                                                                                            </div>
                                                                                            <div className="form-group col-md-5.5">
                                                                                                <label htmlFor="min">Min</label>
                                                                                                <input type="text" className="form-control" id="min" placeholder="Min Value"/>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <button type='submit' className='btn btn-primary w-100 mt-1'>Save</button>                    
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                <BottomNav/>
                                            </>
                                          )
                                        }

export default Service


