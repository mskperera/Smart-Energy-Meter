import customAxios from "../utils/axios";


export const getSoftwareVersion= async () => {
  try {
    return await customAxios
      .get(`/system/getVersion`, {
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
