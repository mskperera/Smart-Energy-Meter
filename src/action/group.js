import customAxios from "../utils/axios";


export const getDeviceGroupsByUserId= async (userId) => {
  try {
    return await customAxios
      .get(`/group/getDeviceGroupsByUserId/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
}


export const getDeviceAssingedByGroupId= async (groupId) => {
  try {
    return await customAxios
      .get(`/group/getDeviceAssingedByGroupId/${groupId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
}



export const addDeviceGroup= async (payload) => {
  try {
    return await customAxios
      .post(`/group/addDeviceGroup`,payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
}


export const  delteDeviceGroup= async (groupId) => {
  try {
    return await customAxios
      .delete(`/group/delteDeviceGroup/${groupId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
}


export const saveDeviceAssigntoGroup= async (payload) => {
  try {
    return await customAxios
      .post(`/group/saveDeviceAssigntoGroup`,payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
}
//saveDeviceAssigntoGroup
// payload={
//   "groupId":500000004,
//   "deviceObjArr":[4,26]
//   }


export const getDevicesAssingedByGroupId= async (groupId) => {
  try {
    return await customAxios
      .get(`/group/getDevicesAssingedByGroupId/${groupId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
}
