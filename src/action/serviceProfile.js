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