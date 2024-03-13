import customAxios from "../utils/axios";


//notification settings
export const saveOperationalLimit= async (payload) => {
  try {
    return await customAxios
      .post(`/deviceSettings/saveOperationalLimit`,payload, {
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

export const getOperationalLimitByDeviceId= async (deviceId) => {
  try {
    return await customAxios
      .get(`/deviceSettings/getOperationalLimitByDeviceId/${deviceId}`, {
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

export const saveBudgetedLimit= async (payload) => {
  try {
    return await customAxios
      .post(`/deviceSettings/saveBudgetedLimit`,payload, {
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

export const getBugetedLimitByDeviceId= async (deviceId) => {
  try {
    return await customAxios
      .get(`/deviceSettings/getBugetedLimitByDeviceId/${deviceId}`, {
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

export const saveBugetedLimitDetails= async (payload) => {
  try {
    return await customAxios
      .post(`/deviceSettings/saveBugetedLimitDetails`,payload, {
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

export const getBugetedLimitDetailsByBudgetedLimitId= async (budgetedLimitId) => {
  try {
    return await customAxios
      .get(`/deviceSettings/getBugetedLimitDetailsByBudgetedLimitId/${budgetedLimitId}`, {
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

export const deleteBugetedLimitDetailBybudgetedLimitDetailsId= async (budgetedLimitDetailId) => {
  try {
    return await customAxios
      .delete(`/deviceSettings/deleteBugetedLimitDetailBybudgetedLimitDetailsId/${budgetedLimitDetailId}`, {
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