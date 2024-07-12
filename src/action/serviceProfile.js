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

//   "userName":"hhhoooo5",
//       "displayName":"UserHoooo",
//   "password":"2211",
//   "isActive":true,
//   "email":"sswo@gmail.com",
//   "mobileNo":"054434",
//   "profilePic":"1",
  
//       "siteAddress":"siteaa23",
//       "tel":"0227872837",
//       "deviceId":39,
//       "deviceName":"device 39 n",
//       "supplierId":1,
//       "consumerCategoryid":3,
//       "consumerSubCategoryId":7,
//       "billingSessionStart":"2024-06-18",
//       "billingSessionEnd":"2024-07-18",
//       "measuringModeId":1,
//       "budgetedValue":1200,
//       "opertationalMetricId":1

//   }