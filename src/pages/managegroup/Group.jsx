import React, { useEffect, useState } from 'react';
import './Group.css';
import BottomNav from '../../components/bottommenu/BottomNav';
import swal from 'sweetalert';
import { addDeviceGroup, delteDeviceGroup, getDeviceGroupsByUserId, getDevicesAssingedByGroupId, saveDeviceAssigntoGroup } from '../../action/group.js';
import { getDevicesByUserId } from '../../action/device.js';
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { ThreeDots } from 'react-loader-spinner';

function Group() {
  const [load, setLoad] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [device, setDevice] = useState('');
  const [dropDeviceNamesList, setDropDeviceNamesList] = useState([]);
  const [groupListName, setGroupListName] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [selectedGroupName, setSelectedGroupName] = useState('');
  const [assignedDevices, setAssignedDevices] = useState([]);
  const [message, setMessage] = useState('');
  const [errormessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const deviceNames = useSelector(state => state.device.dropDeviceList);
  const defaultSelectedDevice = deviceNames[0]?.id || '';

  useEffect(() => {
    setDevice(defaultSelectedDevice);
  }, [deviceNames]);

  useEffect(() => {
    loadDeviceGroupsByUserId();
    loadDevicesByUserId();
    setLoading(true);
  }, []);

  const loadDeviceGroupsByUserId = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setLoading(true);
    const result = await getDeviceGroupsByUserId(userData.userId);
    setGroupListName(result.data);
    setLoading(false);
  };

  const loadDevicesByUserId = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setLoading(true);
    const result = await getDevicesByUserId(userData.userId);
    const devices = result.data.map(device => ({ id: device.deviceId, name: device.deviceName }));
    setDropDeviceNamesList(devices);
    setLoading(false);
  };

  const loadDeviceAssingedByGroupId = async (groupId) => {
    try {
      setLoading(true);
      const result = await getDevicesAssingedByGroupId(groupId);
      if (Array.isArray(result.data)) {
        const assignedDeviceIds = result.data.map(device => device.deviceId);
        const assignedDeviceNames = dropDeviceNamesList.filter(device => assignedDeviceIds.includes(device.id));
        setAssignedDevices(assignedDeviceNames);
      } else {
        setAssignedDevices([]);
      }
    } catch (error) {
      console.error("Error loading devices assigned by group ID:", error);
      setAssignedDevices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData.userId;

    setLoading(true);
    const res = await addDeviceGroup({ groupName: groupName, userId });
    const newGroupList = [...groupListName];
    newGroupList.unshift({ groupId: res.data.output.groupId, groupName: groupName, userId });
    setGroupListName(newGroupList);
    setGroupName('');
    setLoading(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      setMessage('');

      if (!selectedGroupId) {
        setErrorMessage("Please select a group.");
        return;
      }

      if (assignedDevices.length === 0) {
        setErrorMessage("You have to add at least one device.");
        return;
      }

      const payload = {
        groupId: selectedGroupId,
        deviceObjArr: assignedDevices.map(device => device.id),
      };

      setLoading(true);
      const result = await saveDeviceAssigntoGroup(payload);
      const { responseStatus, outputMessage } = result.data;

      if (responseStatus === "failed") {
        setErrorMessage(outputMessage);
        return;
      }

      setMessage(outputMessage);
      swal("Updated Successfully", "", "success").then(() => {
        setLoad(!load);
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const onAddDevice = () => {
    const newDevice = dropDeviceNamesList.find(d => d.id === parseInt(device));

    if (!newDevice) {
      setErrorMessage("Selected device is not available.");
      return;
    }

    if (assignedDevices.some(d => d.id === newDevice.id)) {
      setErrorMessage("Device is already added to the selected group.");
      return;
    }

    setAssignedDevices([...assignedDevices, newDevice]);
    setErrorMessage('');
  };

  const onDelete = async (groupId) => {
    try {
      setLoading(true);
      const result = await delteDeviceGroup(groupId);
      if (result.data.responseStatus === 'failed') {
        setErrorMessage(result.data.outputMessage);
        return;
      }

      const updatedGroupList = groupListName.filter(group => group.groupId !== groupId);
      setGroupListName(updatedGroupList);
      if (selectedGroupId === groupId) {
        setSelectedGroupId('');
        setSelectedGroupName('');
        setAssignedDevices([]);
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      setErrorMessage("Error deleting group.");
    } finally {
      setLoading(false);
    }
  };

  const onGroupClick = (groupId, groupName) => {
    setSelectedGroupId(groupId);
    setSelectedGroupName(groupName);
    loadDeviceAssingedByGroupId(groupId);
  };

  const handleDeleteDevice = (deviceId) => {
    setAssignedDevices(assignedDevices.filter(device => device.id !== deviceId));
  };

  return (
    <div className='home'>
      <div className="body">
        {loading ? (
          <div  className="d-flex align-items-center justify-content-center">
            <ThreeDots
              height={100}
              width={100}
              color="#36A2EB"
              ariaLabel="loading"
              secondaryColor="#36A2EB"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        ) : (
          <form onSubmit={onSubmitHandler}>
            <div className="rounded p-2">
              <h2 className='d-flex justify-content-center align-items-center' style={{color:'white'}}>Manage Group</h2>
              <div className='popup-group d-flex justify-content-center align-items-center'>
                <div className='form-group mb-2 '>
                  <label htmlFor="group" className='form-check-label'>Group Name</label>
                  <input
                    type="text"
                    className='form-control mr-2 group-name d-flex'
                    id="group"
                    placeholder='Enter Name'
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)} />
                  <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary btn-sm' style={{ height: '35px', marginTop: '3px' }} onClick={handleCreateGroup}>Create</button>
                  </div>
                </div>
              </div>
              <br />
              <div className='d-flex justify-content-center align-items-center'>
                <div className='group-section'>
                  <div className='group-list'>
                    <h6 className='d-flex justify-content-center align-items-center' style={{ paddingBottom: '32px' }}><u>Group List</u></h6>
                    <ul>
                      {groupListName && groupListName.map((group, index) => (
                        <div key={group.groupId} onClick={() => onGroupClick(group.groupId, group.groupName)}>
                          <li>{group.groupName}</li>
                          <button className="btn btn-sm btn-danger button-delete" onClick={() => onDelete(group.groupId)}><MdDelete/></button>
                        </div>
                      ))}
                    </ul>
                  </div>
                  <div className='device-list'>
                    <h5 className='d-flex justify-content-center align-items-center'>{selectedGroupName}</h5>
                    <select
                      className='form-control group-device-select'
                      onChange={(e) => setDevice(e.target.value)}
                      value={device}>
                      {dropDeviceNamesList.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                    <button type="button" className='btn btn-primary btn-sm add-device-btn' onClick={onAddDevice}>Add</button><br />
                    <h6 className='d-flex justify-content-center align-items-center'><u>Device List</u></h6>
                    <ul>
                      {assignedDevices.map(device => (
                        <li key={device.id}>
                          <button 
                            className="btn btn-sm btn-danger ml-2"
                            onClick={() => handleDeleteDevice(device.id)}
                          ><MdDelete/></button>&nbsp;
                          {device.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <button className='btn btn-primary save-group-btn'>Save</button>
              {errormessage && <p className="error-message">{errormessage}</p>}
              {message && <p className="success-message">{message}</p>}
            </div>
          </form>
        )}
      </div>
      <BottomNav className="bottombar" />
    </div>
  );
}

export default Group;
