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

