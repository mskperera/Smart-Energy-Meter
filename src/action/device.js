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

export const getEngergyUsageKwhByDateRangePrediction= async (payload) => {
  try {
    return await customAxios
      .post(`/device/energymeter/getEngergyUsageKwhByDateRangePrediction`,payload, {
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



// getDeviceInfoByUserId
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


// 
export const getDeviceInfoByUserId= async (userId) => {
  try {
    return await customAxios
      .get(`/device/getDeviceInfoByUserId/${userId}`, {
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
// addDevice()
//payload= {
//   "deviceNo":"Dev 444445",
// "hardwareVersion": "h/wdfjl",
// "serialNo": "2447122R",
// "chipId":"999327",
//  "deviceTypeId":1,
// "firmwareVersion": "fw0.1",
// "product": "test@gmail.com"
// }




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
// updateDevice()
//payload= {
//   "deviceNo":"Dev 444445",
// "hardwareVersion": "h/wdfjl",
// "serialNo": "2447122R",
// "chipId":"999327",
//  "deviceTypeId":1,
// "firmwareVersion": "fw0.1",
// "product": "test@gmail.com"
// }


export const getDevicesByUserId= async (userId) => {
  try {
    return await customAxios
      .get(`/device/getDevicesByUserId/${userId}`, {
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

export const getDeviceStatus = async (userId, deviceId = null) => {
  try {
    console.log('getDeviceStatus', userId);

    const queryParams = new URLSearchParams({ userId });
    if (deviceId !== null) {
      queryParams.append('deviceId', deviceId);
    }

    const queryString = queryParams.toString();
    
    return await customAxios
      .get(`/device/getDeviceStatus?${queryString}`, {
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
};

