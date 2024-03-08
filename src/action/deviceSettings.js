import customAxios from "../utils/axios";


//notification settings
export const saveThresholdSettings= async (payload) => {
  try {
    return await customAxios
      .post(`/deviceSettings/saveThresholdSettings`,payload, {
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

export const getThresholdSettingsByDeviceId= async (deviceId) => {
  try {
    return await customAxios
      .get(`/deviceSettings/getThresholdSettingsByDeviceId/${deviceId}`, {
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

export const saveBudgetSettings= async (payload) => {
  try {
    return await customAxios
      .post(`/deviceSettings/saveBudgetSettings`,payload, {
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

export const getBudgetSettingsByDeviceId= async (deviceId) => {
  try {
    return await customAxios
      .get(`/deviceSettings/getBudgetSettingsByDeviceId/${deviceId}`, {
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
      .post(`/deviceSettings/saveDeviceSettings`,payload, {
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
      .get(`/deviceSettings/get_DeviceSettingsByDeviceId/${deviceId}`, {
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

//device setting save
export const saveConnectionSettings= async (payload) => {
  try {
    return await customAxios
      .post(`/deviceSettings/saveConnectionSettings`,payload, {
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
//device setting get
export const getConnectionSettingsByDeviceId= async (deviceId) => {
  try {
    return await customAxios
      .get(`/deviceSettings/getConnectionSettingsByDeviceId/${deviceId}`, {
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