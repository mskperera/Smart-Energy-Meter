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

export const getBugetedLimitByDeviceIdAndOperationalMetricId= async (deviceId,operationalMetricId) => {
  try {
    return await customAxios
      .get(`/deviceSettings/getBugetedLimitByDeviceIdAndOperationalMetricId?deviceId=${deviceId}&operationalMetricId=${operationalMetricId}`, {
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


export const getBudgetedProfile= async (deviceId,operationalMetricId) => {
  try {
    return await customAxios
      .get(
        `/deviceSettings/getBudgetedProfile?deviceId=${deviceId}&operationalMetricId=${operationalMetricId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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

// operationalMetricId
// kwh=1 , billAmount=7


export const addBugetedProfile= async (payload) => {
  try {
    return await customAxios
      .post(`/deviceSettings/addBugetedProfile`,payload, {
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

// sample :
//  const payload={
//   "deviceId":4,
//   "operationalMetricId":7,
//   "value":5000
//  }

//  addBugetedProfile(payload)
 



export const calculateInterdependentValue= async (deviceId,operationalMetricId) => {
  try {
    return await customAxios
      .get(
        `/deviceSettings/calculateInterdependentValue?deviceId=${deviceId}&operationalMetricId=${operationalMetricId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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


export const getBudgetedValues= async (deviceId) => {
  try {
    return await customAxios
      .get(
        `/deviceSettings/getBudgetedValues?deviceId=${deviceId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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

