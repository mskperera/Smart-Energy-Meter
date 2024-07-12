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