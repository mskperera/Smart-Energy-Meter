import customAxios from "../utils/axios";


export const  getEngergyUsageNow= async (payload) => {
  try {
    return await customAxios
      .post(`/device/energymeter/getEngergyUsageNow`,payload, {
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

export const getEngergyUsageKwhByDateRange= async (payload) => {
  try {
    return await customAxios
      .post(`/device/energymeter/getEngergyUsageKwhByDateRange`,payload, {
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

export const getEnergyMeterDataKwhPersecsByDateRange= async (payload) => {
  try {
    return await customAxios
      .post(`/device/energymeter/getEnergyMeterDataKwhPersecsByDateRange`,payload, {
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


export const saveDeviceSettings= async (payload) => {
  try {
    return await customAxios
      .post(`/device/energymeter/saveDeviceSettings`,payload, {
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



export const get_DeviceSettingsByDeviceId= async (deviceId) => {
  try {
    return await customAxios
      .get(`/device/energymeter/get_DeviceSettingsByDeviceId/${deviceId}`, {
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





export const getDeviceDetailsByDeviceId= async (deviceId) => {
  try {
    return await customAxios
      .get(`/device/energymeter/getDeviceDetailsByDeviceId/${deviceId}`, {
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



///////////////////////////////


export const  deleteDevice= async (deviceId) => {
  try {
    return await customAxios
      .delete(`/device/deleteDevice/${deviceId}`, {
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

export const getDeviceByDeviceId= async (deviceId) => {
  try {
    return await customAxios
      .get(`/device/getDeviceByDeviceId/${deviceId}`, {
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
//////////
export const getDevices= async () => {
  try {
    return await customAxios
      .get(`/device/getDevices`, {
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
///////////

export const addDevice= async (payload) => {
  try {
    return await customAxios
      .post(`/device/addDevice`,payload, {
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


export const updateDevice= async (payload,deviceId) => {
  try {
    return await customAxios
      .put(`/device/updateDevice/${deviceId}`,payload, {
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
