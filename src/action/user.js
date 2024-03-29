import customAxios from "../utils/axios";


export const  deleteUser= async (userId) => {
  try {
    return await customAxios
      .delete(`/user/deleteUser/${userId}`, {
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

export const getUserbyUserId= async (userId) => {
  try {
    return await customAxios
      .get(`/user/getUserbyUserId/${userId}`, {
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
//////////
export const getUsers= async () => {
  try {
    return await customAxios
      .get(`/user/getUsers`, {
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
///////////

export const addUser= async (payload) => {
  try {
    return await customAxios
      .post(`/user/addUser`,payload, {
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

export const updateUser= async (payload,userRegId) => {
  try {
    return await customAxios
      .put(`/user/updateUser/${userRegId}`,payload, {
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
