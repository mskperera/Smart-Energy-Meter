import customAxios from "../utils/axios";


export const  saveBillingSession= async (payload) => {
  try {
    return await customAxios
      .post(`/billingSession/saveBillingSession`,payload, {
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
      .get(`/billingSession/getbillingSessionByDeviceId?deviceId=${deviceId}`, {
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



export const getbillingSessionByDeviceBillingSessionId= async (deviceBillingSessionId) => {
  try {
    return await customAxios
      .get(`/billingSession/getbillingSessionByDeviceBillingSessionId?deviceBillingSessionId=${deviceBillingSessionId}`, {
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
