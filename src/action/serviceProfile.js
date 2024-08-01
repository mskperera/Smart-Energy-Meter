import customAxios from "../utils/axios";


export const getServiceProfileSelectByUserId= async (userId) => {
  try {
    return await customAxios
      .get(`/serviceProfile/getServiceProfileSelectByUserId?userId=${userId}`, {
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


export const serviceProfileSetup= async (payload) => {
  try {
    return await customAxios
      .post(`/serviceProfile/serviceProfileSetup`,payload, {
       // withCredentials: true,
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
// payload={

//   "userName":"hhhoooo5", -1
//       "displayName":"UserHoooo", -2
//   "password":"2211", -3
//   "isActive":true, -4
//   "email":"sswo@gmail.com", -5
//   "mobileNo":"054434", -6
//   "profilePic":"1", -7
  
//       "siteAddress":"siteaa23", -8
//       "tel":"0227872837", -9
//       "deviceId":39,0 -10
//       "deviceName":"device 39 n", -11
//       "supplierId":1, -12
//       "consumerCategoryid":3, -13
//       "consumerSubCategoryId":7, -14
//       "billingSessionStart":"2024-06-18",
//       "billingSessionEnd":"2024-07-18",
//       "measuringModeId":1,
//       "budgetedValue":1200,
//       "opertationalMetricId":1

//   }




export const getServiceProfiles= async () => {
  try {
    return await customAxios
      .get(`/serviceProfile/getServiceProfiles`, {
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